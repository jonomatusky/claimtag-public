import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Button, Container, Grid, Typography } from '@mui/material'
import usePageTrack from 'hooks/use-page-track'

import { request } from 'util/client'
import Loading from 'components/Loading'
// import ClaimtagForm from './components/ClaimtagForm'
// import logo from 'images/claimtag-logo.svg'

const useForwardTag = useCallback(
  () => {
  const { cid } = useParams()
  const [status, setStatus] = useState('idle')
  const [claimtag, setClaimtag] = useState(null)
  const [redirect, setRedirect] = useState(null)
  const navigate = useNavigate()

  usePageTrack()

  useEffect(() => {
    const getClaimtag = async () => {
      try {
        const res = await request({
          url: `/claimtags/${cid}`,
        })

        const claimtag = res.claimtag

        if (claimtag && !claimtag.url) {
          const project = claimtag.project
          if (project.type === 'profile') {
            if (!!claimtag.profile) {
              navigate(`/profile/${claimtag.profile.id}`)
            } else {
              navigate(`/${cid}/claim/register`)
            }
          } else {
            navigate(`/${cid}/claim/form`)
          }
        } else {
          // setClaimtag(res.claimtag)
          setRedirect(claimtag.url)
          // setStatus('succeeded')
        }
      } catch (err) {
        setStatus('failed')
      }
    }

    if (!!cid) {
      if (status === 'idle') {
        getClaimtag()
      }
    } else {
      setStatus('unclaimed')
    }

    return
  }, [cid, status, navigate])

  return {status, claimtag}
}

export default Claimtag
