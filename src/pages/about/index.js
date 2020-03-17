import React from 'react'
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage
} from '@ionic/react'

const About = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='ion-padding'>
          <p>センスはジャッジの連続から生まれます。</p>
          <p>
            ふせんトレーニングは、デザインに対する良い・悪いのジャッジを日頃から繰り返すことでセンスを磨くトレーニング方法です。
          </p>
          <p>
            ふせんトレーナーは、あなたのふせんトレーニングの継続を助けるアプリです。
          </p>
          <p>
            目についたデザインを写真に撮り、良い（緑）・悪い（赤）・わからない（黄）のふせんを選びましょう。できれば、何故そう判断したのか、理由を言語化してメモしておきましょう。
          </p>
          <p>
            トレーニングを重ねて、センスが磨かれてくると黄色のふせんが減っていき、判断の理由が詳細に説明できるようになるでしょう。
          </p>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default About
