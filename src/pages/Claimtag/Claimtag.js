import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import {
  Button,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import usePageTrack from 'hooks/use-page-track'
import { Link as LinkIcon, QrCode, ThumbUp } from '@mui/icons-material'

import { request } from 'util/client'
import Loading from 'components/Loading'
import ClaimtagForm from './components/ClaimtagForm'

const Claimtag = () => {
  const { cid } = useParams()
  const [status, setStatus] = useState('idle')
  const [claimtag, setClaimtag] = useState(null)

  usePageTrack()

  useEffect(() => {
    const getClaimtag = async () => {
      console.log('getting claimtag')
      try {
        const res = await request({
          url: `/claimtags/${cid}`,
        })

        console.log(res)

        if (res.claimtag && !res.claimtag.url) {
          setStatus('unclaimed')
        } else {
          setClaimtag(res.claimtag)
          setStatus('succeeded')
        }
      } catch (err) {
        console.log(err)
        setStatus('failed')
      }
    }

    if (!!cid && status === 'idle') {
      getClaimtag()
    }

    return
  }, [cid, status])

  if (!!(claimtag || {}).url) {
    window.location.href = claimtag.url

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
  } else if (status === 'unclaimed') {
    return (
      <Container maxWidth="xs">
        <Grid container justifyContent="center" spacing={1} pt={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Claim Your Tag</Typography>
          </Grid>
          <Grid item xs={12}>
            <List dense>
              <ListItem>
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <LinkIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Enter a link to share, like your Linktree, LinkedIn, Instagram
                    or Spotify."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <QrCode />
                </ListItemIcon>
                <ListItemText
                  primary="The next time someone scans your name tag, they'll be redirected
                    to that link."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <ThumbUp />
                </ListItemIcon>
                <ListItemText primary="Make sure to test it out once you submit your link by re-scanning the QR code!" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <ClaimtagForm status={status} setStatus={setStatus} />
          </Grid>
        </Grid>
      </Container>
    )
  } else if (status === 'success') {
    return (
      <Container>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" pt={7} textAlign="center">
              Success!
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography>
              You claimed your card. Scan the QR code again to test it out.
            </Typography>
          </Grid>
        </Grid>
        <div
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            top: 'auto',
            textAlign: 'center',
            // color: 'white',
            paddingTop: '5px',
            paddingBottom: '5px',
            position: 'absolute',
            zIndex: 2000,
            // backgroundColor: 'black',
            fontSize: '12px',
          }}
        >
          <Typography color="inherit" variant="body2">
            <Link href="https://plynth.com" target="_blank" color="inherit">
              Powered by Plynth
            </Link>
          </Typography>
        </div>
      </Container>
    )
  } else {
    return <Loading />
  }
}

export default Claimtag
