import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, Link, Typography } from '@mui/material'
import usePageTrack from 'hooks/use-page-track'

import Loading from 'components/Loading'
import FormRegister from './components/FormRegister'
import logo from 'images/claimtag-logo.svg'
import { request } from 'util/client'
import { useNavigate, useParams } from 'react-router'

const UpdateClaimtagProfile = () => {
  const [status, setStatus] = useState('loading')
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()

  const { cid } = useParams()

  useEffect(() => {
    const getClaimtag = async () => {
      try {
        const res = await request({
          url: `/claimtags/${cid}`,
        })

        if (!!res.claimtag) {
          setStatus('failed')
        } else if (res.claimtag.status === 'unclaimed') {
          navigate(`/${cid}`)
        } else {
          setStatus('succeeded')
          setProfile(res.claimtag.profile || {})
        }
      } catch (err) {
        console.log(err)
        setStatus('failed')
      }
    }

    if (!!cid) {
      if (status === 'loading') {
        getClaimtag()
      }
    } else {
      setStatus('failed')
    }

    return
  }, [cid, status, navigate])

  usePageTrack()

  if (status === 'failed') {
    return (
      <Container maxWidth="xs">
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" pt={7} textAlign="center">
              Something Went Wrong{' '}
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography>
              Sorry, something went wrong. Please refresh the page and try
              again.
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
  } else if (status === 'loading' || !profile) {
    return <Loading />
  } else {
    return (
      <Container maxWidth="xs">
        <Grid container justifyContent="center" spacing={3} pt={4} pb={10}>
          <Grid item xs={11}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              pr="25px"
            >
              <img
                src={logo}
                alt="Claimtag Logo"
                style={{ width: '25px', marginRight: '7px' }}
              />
              <Typography variant="h5" textAlign="center">
                Claim this Claimtag
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={11}>
            <Typography mb={1}>
              <b>Create a profile</b> you'd like to share with this QR code.
            </Typography>
            <Typography>
              The next time someone <b>scans this QR code</b>, they'll be{' '}
              <b>taken to that profile</b>.
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <FormRegister
              status={status}
              setStatus={setStatus}
              cid={cid}
              profile={profile}
            />
          </Grid>
        </Grid>
      </Container>
    )
    // } else if (status === 'submitted') {
    //   return (
    //     <Container>
    //       <Grid container justifyContent="center" spacing={3} pt={3}>
    //         <Grid item xs={11}>
    //           <Typography variant="h4" pt={7} textAlign="center">
    //             You claimed your tag!
    //           </Typography>
    //         </Grid>
    //         <Grid item xs={11} textAlign="center" variant="h5">
    //           <Typography>
    //             Now test it out by refreshing the page or re-scanning the QR code.
    //           </Typography>
    //         </Grid>
    //         <Grid item xs={11} textAlign="center" variant="h5">
    //           <Button onClick={() => window.location.reload()}>
    //             Refesh Page
    //           </Button>
    //         </Grid>
    //         <Grid item xs={11}>
    //           <div
    //             style={{
    //               bottom: 0,
    //               left: 0,
    //               right: 0,
    //               top: 'auto',
    //               textAlign: 'center',
    //               borderTop: '1px solid #e0e0e0',
    //               paddingTop: '5px',
    //               paddingBottom: '10px',
    //               paddingRight: '5px',
    //               paddingLeft: '5px',
    //               position: 'fixed',
    //               zIndex: 2000,
    //               backgroundColor: 'white',
    //               fontSize: '12px',
    //             }}
    //           >
    //             <Typography color="inherit" variant="body2" textAlign="center">
    //               Create Claimtags for your next event at{' '}
    //             </Typography>
    //             <Typography color="inherit" variant="body2" textAlign="center">
    //               <Link href="https://claimtag.io" target="_blank">
    //                 <b>www.claimtag.io</b>
    //               </Link>
    //             </Typography>
    //           </div>
    //         </Grid>
    //       </Grid>
    //     </Container>
    //   )
  }
}

export default UpdateClaimtagProfile
