import React, { useEffect, useState } from 'react'
import {
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonItemSliding,
  IonList,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  IonPage
} from '@ionic/react'
import { add } from 'ionicons/icons'
import { colors } from '../../colors'
import { deleteStickyNote, listStickyNotes } from '../../db'

const ListPage = ({ history }) => {
  const [stickyNotes, setStickyNotes] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    listStickyNotes().then((items) => {
      setStickyNotes(items)
    })
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sticky Notes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          onIonChange={(event) => {
            setSearch(event.target.value)
          }}
        />
        <IonList>
          {stickyNotes
            .filter(({ tags }) => tags.some((tag) => tag.includes(search)))
            .map(({ id, color, image, note, tags }) => {
              return (
                <IonItemSliding key={id}>
                  <IonItem>
                    <IonCard color={colors[color]}>
                      <IonImg className='ion-padding' src={image} />
                      <IonCardContent>{note}</IonCardContent>
                      <IonCardContent>
                        {tags.map((tag) => {
                          return (
                            <IonChip key={tag} outline>
                              {tag}
                            </IonChip>
                          )
                        })}
                      </IonCardContent>
                    </IonCard>
                  </IonItem>
                  <IonItemOptions side='start'>
                    <IonItemOption color='primary' expandable>
                      Edit
                    </IonItemOption>
                  </IonItemOptions>
                  <IonItemOptions side='end'>
                    <IonItemOption
                      color='danger'
                      expandable
                      onClick={() => {
                        deleteStickyNote(id)
                          .then(() => listStickyNotes())
                          .then((items) => {
                            setStickyNotes(items)
                          })
                      }}
                    >
                      Delete
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              )
            })}
        </IonList>
        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton
            onClick={() => {
              history.push('/add')
            }}
          >
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default ListPage