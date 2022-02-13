import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Container, Grid, Link, TextField, Typography } from '@mui/material'
import usePageTrack from 'hooks/use-page-track'

import { request } from 'util/client'
import { LoadingButton } from '@mui/lab'
import Loading from 'components/Loading'

const QrScan = () => {
  const { cid } = useParams()
  const [status, setStatus] = useState('idle')
  const [claimtag, setClaimtag] = useState(null)

  usePageTrack()

  useEffect(() => {
    const getClaimtag = async () => {
      try {
        const res = await request({
          url: `/${cid}`,
        })

        if (res.claimtag && !res.claimtag.url) {
          setStatus('unclaimed')
        } else {
          setClaimtag(res.claimtag)
          setStatus('succeeded')
        }
      } catch (err) {
        setStatus('failed')
      }
    }

    if (!!cid && status === 'idle') {
      getClaimtag()
    }

    return
  }, [cid, status])

  const handleSubmit = async url => {
    setStatus('pending')
    try {
      await request({
        url: `/claimtags/${cid}`,
        data: { url },
        method: 'PATCH',
      })
    } catch (err) {
      setStatus('failed')
    }

    setStatus('succeeded')
  }

  const validationSchema = yup.object({
    url: yup
      .string('Enter a URL')
      .url('Enter a valid URL including http:// or https://')
      .required('URL is required'),
  })

  const formik = useFormik({
    initialValues: {
      url: 'https://',
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  if (!!(claimtag || {}).url) {
    setTimeout(() => {
      window.location.href = claimtag.url
    }, 1000)

    return <Loading />
  } else if (status === 'failed') {
    return (
      <Container>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" pt={7} textAlign="center">
              Something Went Wrong
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography>Please refresh the page and try again.</Typography>
          </Grid>
        </Grid>
      </Container>
    )
  } else if (status === 'unclaimed') {
    return (
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <Grid container justifyContent="flex-start" spacing={2} pt={3}>
            <Grid item xs={12}>
              <Typography variant="h4">Claim Your Card</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Enter a link to share. Next time someone scans this QR code,
                they'll be redirected there:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                // size="small"
                label="URL"
                autoComplete="off"
                type="url"
                {...formik.getFieldProps('url')}
                error={formik.touched.url && Boolean(formik.errors.url)}
                helperText={formik.touched.url && formik.errors.url}
              />
            </Grid>

            <Grid item xs={12}>
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                loading={formik.isSubmitting === true || status === 'submitted'}
              >
                <Typography
                  letterSpacing={1}
                  style={{ fontWeight: 900, textTransform: 'none' }}
                >
                  Claim
                </Typography>
              </LoadingButton>
            </Grid>
            <Grid item xs={12} pb={3}>
              <Typography color="inherit" variant="body2" textAlign="center">
                Create your own at{' '}
                <Link
                  href="https://claimtag.io"
                  target="_blank"
                  color="inherit"
                >
                  claimtag.io
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  } else if (status === 'succeeded') {
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
              You claimed your card. Scan the QR code again to test it out!
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
    return <Loading backgroundColor="white" />
  }
}

export default QrScan
