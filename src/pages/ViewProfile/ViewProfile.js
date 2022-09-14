import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Grid, Button, Typography, Link } from '@mui/material'

import { request } from 'util/client'
import BasicInfo from './components/PanelBasicsIndividual'
import usePageTitle from 'hooks/use-page-title'
import usePageTrack from 'hooks/use-page-track'
// import { LoadingButton } from '@mui/lab'
import { ContactMail } from '@mui/icons-material'
import Loading from 'components/Loading'
// import createVCard from 'util/createVCard'
// import ButtonDownloadVCard from 'components/ButtonDownloadVCard'
// import ButtonEmailContact from 'components/ButtonEmailContact'
import { LoadingButton } from '@mui/lab'
import DialogContactForm from 'components/DialogContactForm'
// import useCreateVCard from 'hooks/use-create-v-card'

const { REACT_APP_PUBLIC_URL } = process.env

const ViewProfile = () => {
  const { cid } = useParams()
  const [profile, setProfile] = useState({})
  const [status, setStatus] = useState('loading')
  const [open, setOpen] = useState(false)

  usePageTrack()

  const navigate = useNavigate()

  useEffect(() => {
    const getClaimtag = async () => {
      try {
        const res = await request({
          url: `/claimtags/${cid}`,
        })

        const claimtag = res.claimtag

        if (claimtag && !claimtag.profile) {
          navigate(`/${cid}/claim/register`)
        } else if (!claimtag) {
          setStatus('failed')
        } else {
          setStatus('succeeded')
          setProfile({
            ...claimtag.profile,
            path: REACT_APP_PUBLIC_URL + '/' + claimtag.path,
          })
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

  let { firstName, lastName } = profile || {}

  usePageTitle(
    !!firstName && !!lastName
      ? firstName + ' ' + lastName + ' | Claimtags'
      : 'Contact | Claimtags'
  )

  // const { createVCard } = useCreateVCard()
  // const handleDownloadVCard = () => {
  //   createVCard(profile)
  // }

  const handleClick = () => {
    setOpen(true)
  }

  if (status === 'loading') {
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
    return (
      <>
        <DialogContactForm
          open={open}
          onClose={() => setOpen(false)}
          profile={profile}
          // onSubmit={sendEmail}
          setStatus={setStatus}
        />
        <Container maxWidth="xs">
          <Grid container spacing={2} justifyContent="center" pt={2} pb={2}>
            <Grid item xs={12} container spacing={2} alignContent="start">
              <Grid item xs={12}>
                <BasicInfo {...profile} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <div
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            top: 'auto',
            textAlign: 'center',
            borderTop: '1px solid #e0e0e0',
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingRight: '5px',
            paddingLeft: '5px',
            position: 'fixed',
            zIndex: 10,
            backgroundColor: 'white',
          }}
        >
          <Container maxWidth="xs">
            <Grid container justifyContent="center">
              {/* <Grid item xs={11}>
                <ButtonEmailContact profile={profile} />
              </Grid> */}
              <Grid item xs={11}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<ContactMail />}
                  onClick={handleClick}
                >
                  <Typography letterSpacing={1} style={{ fontWeight: 900 }}>
                    Save Contact
                  </Typography>
                </LoadingButton>
                {/* <ButtonDownloadVCard profile={profile} /> */}
              </Grid>
              <Grid item xs={11}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  fontSize="9pt"
                >
                  <Link
                    href="https://plynth.com"
                    underline="none"
                    color="inherit"
                  >
                    Created with Claimtags, powered by Plynth
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </div>
      </>
    )
  }
}
export default ViewProfile
