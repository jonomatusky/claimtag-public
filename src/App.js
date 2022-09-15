import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ReactGA from 'react-ga'

import Claimtag from 'pages/Claimtag/Claimtag'
import ClaimtagForm from 'pages/ClaimtagForm/ClaimtagForm'
import ClaimtagRegister from 'pages/ClaimtagRegister/ClaimtagRegister'
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage'
import ViewProfile from 'pages/ViewProfile/ViewProfile'
import UpdateClaimtagProfile from 'pages/UpdateClaimtagProfile/UpdateClaimtagProfile'
import SendUpdateEmail from 'pages/SendUpdateEmail/SendUpdateEmail'

const { REACT_APP_GA_KEY, REACT_APP_SITE_URL } = process.env

const App = () => {
  ReactGA.initialize(REACT_APP_GA_KEY)

  const Redirect = ({ url }) => {
    console.log(url)
    window.location = url
    return <></>
  }

  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Claimtag />} />
        <Route path="/:cid/claim/form" element={<ClaimtagForm />} />
        <Route path="/:cid/claim/register" element={<ClaimtagRegister />} />
        <Route
          path="/profile/:cid/update"
          element={<UpdateClaimtagProfile />}
        />
        <Route path="/update/:cid" element={<UpdateClaimtagProfile />} />
        <Route path="/profile/:cid" element={<ViewProfile />} />
        <Route path="/profile/:cid/send" element={<SendUpdateEmail />} />
        <Route path="/:cid" element={<Claimtag />} />
        <Route path="/" element={<Redirect url={REACT_APP_SITE_URL} />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
