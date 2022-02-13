import React from 'react-hook-form'
import { Box, CircularProgress, Typography, Link } from '@mui/material'

import Div100vh from 'components/Div100vh'
import { Link as RouterLink } from 'react-router'

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
        <CircularProgress sx={{ color: color }} />
        <Typography variant="h4" pt={3}>
          Connecting...
        </Typography>
        <Typography variant="body1" pt={3}>
          created at
          <Link component={RouterLink} to="/">
            <b>claimtag.io</b>
          </Link>
        </Typography>
      </Box>
    </Div100vh>
  )
}

export default Loading
