import React from 'react'
import { Box, CircularProgress, Typography, Link, Grid } from '@mui/material'

import Div100vh from 'components/Div100vh'

const { REACT_APP_SITE_URL } = process.env

const Loading = ({ backgroundColor, color }) => {
  return (
    <Div100vh width="100%">
      <Box
        height="100%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        zIndex="20"
        backgroundColor={backgroundColor || 'black'}
        textAlign="center"
      >
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <CircularProgress sx={{ color: color }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" pt={3}>
              Connecting...
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" pt={3}>
              created at{' '}
              <Link to={REACT_APP_SITE_URL}>
                <b>claimtag.io</b>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Div100vh>
  )
}

export default Loading
