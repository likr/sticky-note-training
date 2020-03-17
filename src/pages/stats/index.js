import React, { useState } from 'react'
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
  IonPage,
  useIonViewWillEnter
} from '@ionic/react'
import { Pie } from '@nivo/pie'
import { listStickyNotes } from '../../db'

const Stats = () => {
  const [pieData, setPieData] = useState(null)

  useIonViewWillEnter(() => {
    listStickyNotes().then((items) => {
      const colors = [
        { name: 'red', color: '#eb445a' },
        { name: 'yellow', color: '#ffc409' },
        { name: 'green', color: '#2dd36f' }
      ]
      setPieData(
        colors.map((color) => {
          return {
            id: color.name,
            label: color.name,
            value: items.filter((item) => item.color === color.name).length,
            color: color.color
          }
        })
      )
    })
  }, [])

  console.log(pieData)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle>Stats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {pieData != null && (
            <IonItem>
              <Pie
                data={pieData}
                width={350}
                height={400}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ datum: 'color' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor='#333333'
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor='#333333'
                animate
                motionStiffness={90}
                motionDamping={15}
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000'
                        }
                      }
                    ]
                  }
                ]}
              />
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Stats
