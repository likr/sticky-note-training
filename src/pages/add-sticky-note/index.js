import React, { useEffect, useRef, useState } from 'react'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
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
  const colorRef = useRef()
  const noteRef = useRef()
  const tagRef = useRef()
  const [color, setColor] = useState(null)
  const [image, setImage] = useState(null)

  const loadPicture = () => {
    pictureRef.current
      .getInputElement()
      .then((e) => e.files[0])
      .then((file) => {
        const reader = new window.FileReader()
        reader.onload = (event) => {
          setImage(event.target.result)
        }
        reader.readAsDataURL(file)
      })
  }

  useEffect(() => {
    // XXX hack for funckin' safari
    let prev = ''
    const intervalId = setInterval(() => {
      if (pictureRef.current && pictureRef.current.getInputElement) {
        pictureRef.current.getInputElement().then(({ value }) => {
          if (value && value !== prev) {
            loadPicture()
          }
          prev = value
        })
      }
    }, 100)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

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
            const tags = Array.from(
              new Set(tagRef.current.value.split())
            ).filter((v) => !!v)
            if (image && color) {
              addStickyNote({
                image,
                color,
                note,
                tags
              }).then(() => {
                // pictureRef.current.value = ''
                colorRef.current.value = ''
                noteRef.current.value = ''
                tagRef.current.value = ''
                pictureRef.current.getInputElement().then((e) => {
                  e.value = ''
                })
                setImage(null)
                setColor(null)
                history.push('/', 'root')
              })
            }
          }}
        >
          <IonList>
            <IonItem>
              <IonLabel position='stacked'>Picture</IonLabel>
              <IonInput ref={pictureRef} type='file' required />
            </IonItem>
            {image && (
              <IonCard color={colors[color] || ''}>
                <img className='ion-padding' src={image} alt='TODO' />
              </IonCard>
            )}
            <IonItem>
              <IonLabel position='stacked'>Judge</IonLabel>
              <IonSelect
                ref={colorRef}
                required
                interface='popover'
                onIonChange={(event) => {
                  setColor(event.target.value)
                }}
              >
                <IonSelectOption value='green'>
                  Good
                  <span role='img' aria-label='+1'>
                    👍
                  </span>
                </IonSelectOption>
                <IonSelectOption value='yellow'>
                  Neutral
                  <span role='img' aria-label='thinking-face'>
                    🤔
                  </span>
                </IonSelectOption>
                <IonSelectOption value='red'>
                  Bad
                  <span role='img' aria-label='-1'>
                    👎
                  </span>
                </IonSelectOption>
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
