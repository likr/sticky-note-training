import React from 'react'
import { render } from 'react-dom'
import { Route } from 'react-router-dom'
import {
  IonApp,
  IonContent,
  IonHeader,
  IonItem,
  IonRouterOutlet,
  IonMenu,
  IonList,
  IonSplitPane,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import About from './pages/about'
import AddStickyNote from './pages/add-sticky-note'
import ListStickyNote from './pages/list-sticky-note'
import Stats from './pages/stats'

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId='main'>
          <IonMenu type='overlay' side='start' menuId='menu' contentId='main'>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                <IonItem href='/about'>About</IonItem>
                <IonItem href='/stats'>Stats</IonItem>
              </IonList>
            </IonContent>
          </IonMenu>
          <IonRouterOutlet id='main'>
            <Route path='/' component={ListStickyNote} exact />
            <Route path='/add' component={AddStickyNote} />
            <Route path='/about' component={About} />
            <Route path='/stats' component={Stats} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  )
}

render(<App />, document.querySelector('#content'))
