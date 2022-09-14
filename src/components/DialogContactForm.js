import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material'
import { Check, Close, Email } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import * as Yup from 'yup'

import useFormHelper from 'hooks/use-form-helper'
import Form from './Form/Form'
import { request } from 'util/client'
import ButtonDownloadVCard from './ButtonDownloadVCard'

const DialogContactForm = ({
  open,
  onClose,
  profile,
  // setStatus,
  userEmail,
}) => {
  // const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('idle')
  const [isChecked, setIsChecked] = useState(true)

  const email = localStorage.getItem('email')

  const formFields = [
    {
      name: 'email',
      label: 'Your Email*',
      type: 'email',
      validation: Yup.string()
        .required('Email is required')
        .email('Must be a valid email address'),
    },
  ]

  const sendEmail = async userEmail => {
    try {
      await request({
        url: `/emails`,
        method: 'POST',
        data: {
          userEmail,
          eventName: 'Meet Montco Showcase',
          ...profile,
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async values => {
    setStatus('loading')

    if (isChecked) {
      try {
        localStorage.setItem('email', values.email)
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        localStorage.removeItem('email')
      } catch (err) {
        console.log(err)
      }
    }

    try {
      await sendEmail(email)
      setStatus('succeeded')
      // onClose()
    } catch (err) {
      // onClose()
    }
  }

  const { control, submit } = useFormHelper({
    formFields,
    onSubmit: handleSubmit,
    initialValues: { email },
  })

  const handleClose = () => {
    onClose()
    setStatus('idle')
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      transitionDuration={{ appear: 250, exit: 0 }}
    >
      {/* <DialogTitle textAlign="center">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          width="100%"
        ></Box>
        <Box position="relative" maxHeight="100%">
          <Box position="absolute" zIndex="50" top="-3px" right="-10px"></Box>
        </Box>
      </DialogTitle> */}
      {/* <Divider /> */}
      <DialogContent>
        <Grid container>
          <Grid item xs={12} container justifyContent="flex-end">
            <IconButton onClick={handleClose} edge="end">
              <Close fontSize="medium" />
            </IconButton>
          </Grid>
          <Grid item xs={12} pb={2}>
            <Typography variant="h6">
              Email {profile.firstName}'s card to yourself:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Form
              formFields={formFields}
              submit={submit}
              control={control}
              spacing={2}
            />
          </Grid>
          <Grid item xs={12} pb={2}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                }
                label="Save my email address"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} pb={1.5}>
            <LoadingButton
              fullWidth
              variant="contained"
              onClick={submit}
              size="large"
              loading={status === 'loading'}
              endIcon={status === 'succeeded' ? <Check /> : <Email />}
              disabled={status === 'succeeded'}
            >
              <Typography letterSpacing={1} style={{ fontWeight: 900 }}>
                {status === 'succeeded' ? 'Sent' : 'Send'}
              </Typography>
            </LoadingButton>
          </Grid>
          <Grid item xs={12} pb={1.5}>
            <Divider>or</Divider>
          </Grid>
          <Grid item xs={12} pb={2}>
            <ButtonDownloadVCard profile={profile} />
          </Grid>
        </Grid>
      </DialogContent>
      {/* <Divider />
      <DialogActions>
        <Grid container spacing={1}>

        </Grid>
      </DialogActions> */}
    </Dialog>
  )
}

export default DialogContactForm
