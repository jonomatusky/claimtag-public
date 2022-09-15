import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  IconButton,
  Grid,
  Typography,
} from '@mui/material'
import { Check, Close, Email } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

import { request } from 'util/client'

const DialogSendUpdateEmail = ({ open, onClose, profile, cid }) => {
  // const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('idle')

  const email = localStorage.getItem('email')

  const sendEmail = async userEmail => {
    try {
      await request({
        url: `/emails/${cid}/update`,
        method: 'POST',
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async values => {
    setStatus('loading')

    try {
      await sendEmail(email)
      setStatus('succeeded')
      // onClose()
    } catch (err) {
      // onClose()
    }
  }

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
            <Typography>
              Send an update email to the owner of this profile:
            </Typography>
          </Grid>

          <Grid item xs={12} pb={1.5}>
            <LoadingButton
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              size="large"
              loading={status === 'loading'}
              endIcon={status === 'succeeded' ? <Check /> : <Email />}
              disabled={status === 'succeeded'}
            >
              <Typography letterSpacing={1} style={{ fontWeight: 900 }}>
                {status === 'succeeded' ? 'Sent' : 'Send Email'}
              </Typography>
            </LoadingButton>
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

export default DialogSendUpdateEmail
