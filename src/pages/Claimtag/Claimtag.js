import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Button, Container, Grid, Typography } from '@mui/material'
import usePageTrack from 'hooks/use-page-track'

import { request } from 'util/client'
import Loading from 'components/Loading'
// import ClaimtagForm from './components/ClaimtagForm'
// import logo from 'images/claimtag-logo.svg'

const Claimtag = () => {
  const { cid } = useParams()
  const [status, setStatus] = useState('idle')
  // const [claimtag, setClaimtag] = useState(null)
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

        if (!!claimtag && !claimtag.url) {
          const project = claimtag.project
          // setStatus('unclaimed')
          if (!!project && project.type === 'profile') {
            if (!!claimtag.profile) {
              navigate(`/profile/${cid}`)
            } else {
              navigate(`/${cid}/claim/register`)
            }
          } else {
            navigate(`/${cid}/claim/form`)
          }
        } else if (!!claimtag && !!claimtag.url) {
          // setClaimtag(res.claimtag)
          setRedirect(claimtag.url)
          // setStatus('succeeded')
        } else {
          setStatus('failed')
        }
      } catch (err) {
        console.log(err)
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

  if (!!redirect) {
    window.location.href = redirect

    return <Loading />
  } else if (status === 'failed') {
    return (
      <Container maxWidth="xs">
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" pt={7} textAlign="center">
              Not Found
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography>
              Sorry, this claimtag doesn't exist or has been deleted. Please
              refresh the page and try again.
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button size="small" onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
  } else {
    return <Loading />
  }
}

export default Claimtag
