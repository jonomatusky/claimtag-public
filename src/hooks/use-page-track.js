// import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// import posthog from 'posthog-js'
import ReactGA from 'react-ga'

// const { REACT_APP_POSTHOG_KEY } = process.env

export default function usePageTrack() {
  const { pathname, search } = useLocation()

  // useEffect(() => {
  //   if (REACT_APP_POSTHOG_KEY) {
  //     posthog.capture('$pageview')
  //   }
  // }, [pathname, hash])

  ReactGA.pageview(pathname + search)
}
