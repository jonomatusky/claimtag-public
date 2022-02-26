import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: { main: '#DE1919' },
    secondary: { main: '#000000' },
    website: { main: '#ffffff' },
    // error: { main: '#FF9516' },
    background: {
      card: '#212421',
    },
  },
  typography: {
    fontFamily: ['degular-text', 'sans-serif'].join(','),
    fontSize: 15,
    h1: {
      fontFamily: ['degular-display', 'sans-serif'].join(','),
      fontWeight: '900',
      fontSize: '4rem',
    },
    h2: {
      fontFamily: ['degular-display', 'sans-serif'].join(','),
      fontWeight: '900',
      fontSize: '3rem',
    },
    h3: {
      fontFamily: ['degular-display', 'sans-serif'].join(','),
      fontWeight: '900',
      fontSize: '2.5rem',
    },
    h4: {
      fontFamily: ['degular', 'sans-serif'].join(','),
      fontWeight: '700',
      fontSize: '2rem',
    },
    h5: {
      fontFamily: ['degular', 'sans-serif'].join(','),
      fontWeight: '700',
    },
    h6: {
      fontFamily: ['degular', 'sans-serif'].join(','),
      fontWeight: '700',
    },
  },
  // overrides: {
  //   MuiBottomNavigation: {
  //     root: {
  //       backgroundColor: 'black',
  //     },
  //   },
  //   MuiBottomNavigationAction: {
  //     root: {
  //       color: 'white',
  //     },
  //   },
  // },
})

export default theme
