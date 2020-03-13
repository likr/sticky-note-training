import React, { useRef, useState } from 'react'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonPage
} from '@ionic/react'
import { colors } from '../../colors'
import { addStickyNote } from '../../db'

const AddStickyNote = ({ history }) => {
  const pictureRef = useRef()
  const noteRef = useRef()
  const tagRef = useRef()
  const [color, setColor] = useState(null)
  const [image, setImage] = useState(null)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle>New Sticky Note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            const note = noteRef.current.value
            const tags = Array.from(new Set(tagRef.current.value.split()))
            if (image && color) {
              addStickyNote({
                image,
                color,
                note,
                tags
              }).then(() => {
                history.push('/')
              })
            }
          }}
        >
          <IonList>
            <IonItem>
              <IonLabel position='stacked'>Picture</IonLabel>
              <IonInput
                ref={pictureRef}
                type='file'
                required
                onIonChange={(event) => {
                  event.target
                    .getInputElement()
                    .then((e) => e.files[0])
                    .then((file) => {
                      const reader = new window.FileReader()
                      reader.onload = (event) => {
                        setImage(event.target.result)
                      }
                      reader.readAsDataURL(file)
                    })
                }}
              />
            </IonItem>
            {image && (
              <IonCard color={colors[color] || ''}>
                <IonImg className='ion-padding' src={image} />
              </IonCard>
            )}
            <IonItem>
              <IonLabel position='stacked'>Color</IonLabel>
              <IonSelect
                required
                onIonChange={(event) => {
                  setColor(event.target.value)
                }}
              >
                <IonSelectOption value='green'>Green</IonSelectOption>
                <IonSelectOption value='yellow'>Yellow</IonSelectOption>
                <IonSelectOption value='red'>Red</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position='stacked'>Note</IonLabel>
              <IonTextarea ref={noteRef} />
            </IonItem>
            <IonItem>
              <IonLabel position='stacked'>Tags</IonLabel>
              <IonInput ref={tagRef} />
            </IonItem>
            <div className='ion-padding'>
              <IonButton className='ion-no-margin' type='submit' expand='block'>
                Save
              </IonButton>
            </div>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  )
}

export default AddStickyNote
