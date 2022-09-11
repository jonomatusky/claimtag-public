import React from 'react'
import * as Yup from 'yup'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'

import { request } from 'util/client'
import { LoadingButton } from '@mui/lab'
import { Container, Grid, Typography } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'

const ClaimtagForm = ({ status, setStatus, cid }) => {
  const handleSubmit = async values => {
    setStatus('pending')
    try {
      await request({
        url: `/claimtags/${cid}`,
        data: { profile: values },
        method: 'PATCH',
      })
      setStatus('submitted')
    } catch (err) {
      setStatus('failed')
    }
  }

  const formFields = [
    {
      name: 'firstName',
      label: 'First Name*',
      placeholder: 'Joe',
      type: 'text',
      validation: Yup.string()
        .required('First name is required')
        .max(50, 'Must be under 50 characters'),
      category: 'basic',
    },
    {
      name: 'lastName',
      label: 'Last Name*',
      placeholder: 'Shmoe',
      type: 'text',
      validation: Yup.string()
        .required('Last name is required')
        .max(50, 'Must be under 50 characters'),
      category: 'basic',
    },
    {
      name: 'company',
      label: 'Company*',
      placeholder: 'Acme',
      type: 'text',
      validation: Yup.string()
        .required('Name is required')
        .max(50, 'Must be under 50 characters'),
      category: 'basic',
    },
    {
      name: 'companyUrl',
      label: 'Company Website',
      placeholder: 'https://acme.com',
      type: 'url',
      validation: Yup.string()
        .url(`Must be a valid URL, including http:// or https://`)
        .max(100, 'Must be under 100 characters'),
      category: 'basic',
    },
    {
      name: 'title',
      label: 'Title',
      placeholder: 'CEO',
      type: 'text',
      validation: Yup.string().max(100, 'Must be under 100 characters'),
      category: 'basic',
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
      type: 'email',
      validation: Yup.string().email('Must be a valid email address'),
      category: 'settings',
    },
    {
      name: 'phone',
      label: 'Phone',
      placeholder: '555-555-5555',
      type: 'tel',
      // validation: Yup.string().phone('Must be a valid phone number'),
      category: 'settings',
    },
    {
      name: 'linkedinUrl',
      label: 'LinkedIn Profile URL',
      placeholder: 'https://linkedin.com/in/username',
      type: 'url',
      validation: Yup.string()
        .url(`Must be a valid URL, including http:// or https://`)
        .max(100, 'Must be under 100 characters'),
      // validation: Yup.string().phone('Must be a valid phone number'),
      category: 'settings',
    },
  ]

  const { control, submit } = useFormHelper({
    formFields,
    onSubmit: handleSubmit,
  })

  return (
    <>
      <Form formFields={formFields} control={control} submit={submit} />
      <div
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          top: 'auto',
          textAlign: 'center',
          borderTop: '1px solid #e0e0e0',
          paddingTop: '5px',
          paddingBottom: '10px',
          paddingRight: '5px',
          paddingLeft: '5px',
          position: 'fixed',
          zIndex: 2000,
          backgroundColor: 'white',
          fontSize: '12px',
        }}
      >
        <Container maxWidth="xs">
          <Grid container justifyContent="center">
            <Grid item xs={11}>
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                onClick={submit}
                endIcon={<ArrowForward />}
              >
                <Typography letterSpacing={1} style={{ fontWeight: 900 }}>
                  Submit
                </Typography>
              </LoadingButton>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  )
}

export default ClaimtagForm
