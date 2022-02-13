import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import posthog from 'posthog-js'
import ReactGA from 'react-ga'

import Claimtag from './pages/Claimtag'

const { REACT_APP_POSTHOG_KEY } = process.env

const App = () => {
  posthog.init(REACT_APP_POSTHOG_KEY, {
    api_host: 'https://app.posthog.com',
  })

  ReactGA.initialize('UA-136166229-3')

  let routes

  routes = (
    <Switch>
      <Route path="/:cid">
        <Claimtag />
      </Route>
    </Switch>
  )

  return <Router>{routes}</Router>
}

export default App
