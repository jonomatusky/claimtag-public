import { Check, Email } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { request } from 'util/client'
import DialogContactForm from './DialogContactForm'

const ButtonEmailContact = ({ profile }) => {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('idle')

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

  const handleClick = () => {
    const userEmail = localStorage.getItem('email')

    console.log('userEmail', userEmail)

    if (userEmail) {
      sendEmail(userEmail)
      setStatus('succeeded')
    } else {
      setOpen(true)
    }
  }

  return (
    <>
      <DialogContactForm
        open={open}
        onClose={() => setOpen(false)}
        profile={profile}
        onSubmit={sendEmail}
        setStatus={setStatus}
      />
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        endIcon={status === 'succeeded' ? <Check /> : <Email />}
        onClick={handleClick}
        loading={status === 'loading'}
      >
        <Typography letterSpacing={1} style={{ fontWeight: 900 }}>
          {status === 'succeeded' ? 'Sent' : 'Save to Email'}
        </Typography>
      </LoadingButton>
    </>
  )
}

export default ButtonEmailContact
