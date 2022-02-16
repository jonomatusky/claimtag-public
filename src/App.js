import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import posthog from 'posthog-js'
import ReactGA from 'react-ga'

import Claimtag from 'pages/Claimtag/Claimtag'
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage'

const { REACT_APP_POSTHOG_KEY, REACT_APP_GA_KEY, REACT_APP_SITE_URL } =
  process.env

const App = () => {
  if (REACT_APP_POSTHOG_KEY) {
    posthog.init(REACT_APP_POSTHOG_KEY, {
      api_host: 'https://app.posthog.com',
    })
  }

  ReactGA.initialize(REACT_APP_GA_KEY)

  let routes

  const Redirect = ({ url }) => {
    console.log(url)
    window.location = url
    return <></>
  }

  routes = (
    <Routes>
      <Route path="/:cid" element={<Claimtag />} />
      <Route element={<NotFoundPage />} />
      <Route path="/" element={<Redirect url={REACT_APP_SITE_URL} />} />
    </Routes>
  )

  return <Router>{routes}</Router>
}

export default App
