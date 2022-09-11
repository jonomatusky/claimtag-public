import React from 'react'
import { Grid, Box, Typography, Paper, Link, Button } from '@mui/material'

import { Email, LinkedIn, OpenInNew, Phone } from '@mui/icons-material'

const PanelBasic = ({
  firstName,
  lastName,
  title,
  company,
  companyUrl,
  phone,
  email,
  linkedinUrl,
}) => {
  console.log(companyUrl)
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2 }}>
      <Box p={2} pt={3}>
        <Grid container>
          {/* <Grid item xs={12} textAlign="center" pb={1}>
            <Box width="100%">
              <Box maxWidth="200px" margin="auto" position="relative">
                <ResponsiveAvatar avatarUrl={avatarUrl} />
                <Box position="absolute" bottom={0} right={0}>
                  <Fab color="primary" onClick={handleContact}>
                    <Email />
                  </Fab>
                </Box>
              </Box>
            </Box>
          </Grid> */}

          <Grid item xs={12}>
            {firstName && lastName && (
              <Typography variant="h5">
                <b>
                  {firstName} {lastName}
                </b>
              </Typography>
            )}
            {title && (
              <Typography fontSize="20px" pt={0.5}>
                <b>{title}</b>
              </Typography>
            )}
            {company && (
              <Box display="flex" alignItems="center" pt={0.5}>
                <Typography fontSize="20px">
                  {!!companyUrl ? (
                    <>
                      <Link
                        href={companyUrl}
                        target="_blank"
                        underline="none"
                        color="inherit"
                      >
                        {company}
                      </Link>
                    </>
                  ) : (
                    company
                  )}
                </Typography>

                {!!companyUrl && (
                  <Link
                    href={companyUrl}
                    target="_blank"
                    underline="none"
                    color="inherit"
                  >
                    <Box pl={0.5} display="flex" alignItems="center">
                      <OpenInNew fontSize="10" />
                    </Box>
                  </Link>
                )}
              </Box>
            )}
          </Grid>
          {/* <Grid item xs={12}>
            {companyUrl && (
              <Box display="flex" alignItems="center" pt={3}>
                <Box pr={0.5} display="flex" alignItems="center">
                  <Button
                    color="primary"
                    size="small"
                    variant="contained"
                    sx={{
                      borderRadius: '100px',
                      minWidth: '0px',
                      padding: '10px',
                    }}
                    disableElevation
                    href={companyUrl}
                    target="_blank"
                    underline="none"
                  >
                    <Business fontSize="small" />
                  </Button>
                </Box>
                <Typography fontSize="20px" pl={1}>
                  <Link
                    href={companyUrl}
                    target="_blank"
                    underline="none"
                    color="inherit"
                  >
                    Website
                  </Link>
                </Typography>
                {/* {!!companyUrl && (
                  <Box pl={0.5} display="flex" alignItems="center">
                    <OpenInNew fontSize="10" />
                  </Box>
                )}
              </Box>
            )}
          </Grid>  */}
          {email && (
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" pt={2}>
                <Box pr={0.5} display="flex" alignItems="center">
                  <Button
                    color="primary"
                    size="small"
                    variant="contained"
                    sx={{
                      borderRadius: '100px',
                      minWidth: '0px',
                      padding: '10px',
                    }}
                    disableElevation
                    href={'mailto:' + email}
                    target="_blank"
                    underline="none"
                  >
                    <Phone fontSize="small" />
                  </Button>
                </Box>
                <Typography fontSize="20px" pl={1}>
                  <Link
                    href={'mailto:' + email}
                    target="_blank"
                    underline="none"
                    color="inherit"
                  >
                    {email}
                  </Link>
                </Typography>
              </Box>
            </Grid>
          )}
          {phone && (
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" pt={2}>
                <Box pr={0.5} display="flex" alignItems="center">
                  <Button
                    color="primary"
                    size="small"
                    variant="contained"
                    sx={{
                      borderRadius: '100px',
                      minWidth: '0px',
                      padding: '10px',
                    }}
                    disableElevation
                    href={'tel:' + phone}
                    target="_blank"
                    underline="none"
                  >
                    <Email fontSize="small" />
                  </Button>
                </Box>
                <Typography fontSize="20px" pl={1}>
                  <Link
                    href={'tel:' + phone}
                    target="_blank"
                    underline="none"
                    color="inherit"
                  >
                    {phone}
                  </Link>
                </Typography>
              </Box>
            </Grid>
          )}
          {linkedinUrl && (
            <Grid item xs={12}>
              <Box
                display="flex"
                alignItems="center"
                pt={2}
                overflow="hidden"
                textOverflow="ellipsis"
              >
                <Box pr={0.5} display="flex" alignItems="center">
                  <Button
                    color="primary"
                    size="small"
                    variant="contained"
                    sx={{
                      borderRadius: '100px',
                      minWidth: '0px',
                      padding: '10px',
                    }}
                    disableElevation
                    href={'tel:' + phone}
                    target="_blank"
                    underline="none"
                  >
                    <LinkedIn fontSize="small" />
                  </Button>
                </Box>
                <Link
                  href={linkedinUrl}
                  target="_blank"
                  underline="none"
                  color="inherit"
                >
                  <Box display="flex" alignItems="center" pt={0.5}>
                    <Typography fontSize="20px" pl={1}>
                      LinkedIn
                    </Typography>
                    <Box pl={0.5} display="flex" alignItems="center">
                      <OpenInNew fontSize="10" />
                    </Box>
                  </Box>
                </Link>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  )
}
export default PanelBasic
