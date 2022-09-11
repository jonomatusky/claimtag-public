import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

import { request } from 'util/client'
import { LoadingButton } from '@mui/lab'
import { ArrowForward } from '@mui/icons-material'

const ClaimtagForm = ({ status, setStatus }) => {
  const platformList = [
    {
      name: 'Website',
      link: '',
      displayLink: '',
    },
    {
      name: 'Instagram',
      link: 'https://instagram.com/',
      displayLink: 'instagram.com/',
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
      name: 'Twitter',
      link: 'https://twitter.com/',
      displayLink: 'twitter.com/',
    },
  ]

  const { cid } = useParams()
  const [platform, setPlatform] = useState(0)
  const [username, setUsername] = useState('')

  const handleSubmit = async ({ url }) => {
    console.log('submitting')
    if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
      url = `http://${url}`
    }

    if (status === 'unclaimed' && !!cid) {
      setStatus('pending')
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
      .transform(value => {
        if (value.indexOf('http://') !== 0 && value.indexOf('https://') !== 0) {
          return `http://${value}`
        }
        return value
      })
      .url('Must be a valid URL')
      .required('URL is required')
      .notOneOf(
        [platformList.map(platformItem => platformItem.link)],
        'Looks like you forgot to add a username'
      ),
  })

  const formik = useFormik({
    initialValues: {
      url: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent="flex-start" spacing={2}>
        <Grid item xs={12} hidden>
          <TextField
            variant="outlined"
            fullWidth
            label="URL"
            inputProps={{ autoCapitalize: 'none' }}
            autoComplete="off"
            placeholder="https://"
            {...formik.getFieldProps('url')}
            error={formik.touched.url && Boolean(formik.errors.url)}
            helperText={formik.touched.url && formik.errors.url}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Enter your link</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="platform-label">Link Type</InputLabel>
            <Select
              labelId="platform-label"
              id="platform-select"
              value={platform}
              label="Link Type"
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
            label={platform === 0 ? 'URL' : 'Username'}
            placeholder={platform === 0 ? 'https://' : null}
            value={username}
            autoComplete="off"
            onChange={event => {
              setUsername(event.target.value)
              formik.setFieldValue(
                'url',
                platformList[platform].link + event.target.value
              )
            }}
            InputProps={{
              startAdornment: platformList[platform].displayLink,
            }}
            inputProps={{ autoCapitalize: 'none' }}
            error={formik.touched.url && Boolean(formik.errors.url)}
            helperText={formik.touched.url && formik.errors.url}
          />
        </Grid>

        <Grid item xs={12} mt={2}>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            loading={formik.isSubmitting === true || status === 'submitted'}
            endIcon={<ArrowForward />}
          >
            <Typography letterSpacing={1} style={{ fontWeight: 900 }}>
              Claim
            </Typography>
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  )
}

export default ClaimtagForm
