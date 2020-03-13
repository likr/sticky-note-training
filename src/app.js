import React from 'react'
import { render } from 'react-dom'
import { Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import ListStickyNote from './pages/list-sticky-note'
import AddStickyNote from './pages/add-sticky-note'

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path='/' component={ListStickyNote} exact />
          <Route path='/add' component={AddStickyNote} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

render(<App />, document.querySelector('#content'))
