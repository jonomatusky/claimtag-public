import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  Grid,
  Link,
  TextField,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

import { request } from 'util/client'
import { LoadingButton } from '@mui/lab'

const ClaimtagForm = ({ status, setStatus }) => {
  const platformList = [
    {
      name: '',
      link: 'https://',
      displayLink: '',
    },
    {
      name: 'LinkedIn',
      link: 'https://linkedin.com/in/',
      displayLink: 'linkedin.com/in/',
    },
    {
      name: 'Linktree',
      link: 'https://linktr.ee/',
      displayLink: 'linktr.ee/',
    },
    {
      name: 'Instagram',
      link: 'https://instagram.com/',
      displayLink: 'instagram.com/',
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/',
      displayLink: 'twitter.com/',
    },
  ]

  const { cid } = useParams()
  const [platform, setPlatform] = useState(0)
  const [username, setUsername] = useState('')

  const handleSubmit = async ({ url }) => {
    setStatus('pending')
    if (status === 'unclaimed') {
      try {
        await request({
          url: `/claimtags/${cid}`,
          data: { url },
          method: 'PATCH',
        })
        setStatus('success')
      } catch (err) {
        setStatus('failed')
      }
    }
  }

  const validationSchema = yup.object({
    url: yup
      .string('Enter a URL')
      .url('Enter a valid URL including http:// or https://')
      .required('URL is required')
      .notOneOf(
        [platformList.map(platformItem => platformItem.link)],
        'Looks like you forgot a username'
      ),
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent="flex-start" spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6">Enter your link</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="URL"
            autoComplete="off"
            {...formik.getFieldProps('url')}
            error={formik.touched.url && Boolean(formik.errors.url)}
            helperText={formik.touched.url && formik.errors.url}
          />
        </Grid>
        <Grid item xs={12} container alignItems="center" spacing={1}>
          <Grid item xs>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant="body1">or</Typography>
          </Grid>
          <Grid item xs>
            <Divider />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Choose a platform and enter your username
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="platform-label">Platform</InputLabel>
            <Select
              labelId="platform-label"
              id="platform-select"
              value={platform}
              label="Platform"
              onChange={event => {
                setPlatform(event.target.value)
                formik.setFieldValue(
                  'url',
                  platformList[event.target.value].link + username
                )
              }}
            >
              {platformList.map((platformItem, index) => (
                <MenuItem key={platformList[index].name} value={index}>
                  {platformList[index].name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="username"
            value={username}
            onChange={event => {
              setUsername(event.target.value)
              formik.setFieldValue(
                'url',
                platformList[platform].link + event.target.value
              )
            }}
            autoComplete="off"
            InputProps={{
              startAdornment: platformList[platform].displayLink,
            }}
          />
        </Grid>

        <Grid item xs={12} mt={2}>
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
            <Link href="https://claimtag.io" target="_blank" color="inherit">
              claimtag.io
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  )
}

export default ClaimtagForm
