import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#030C3B',
          color: 'white',
        },
      },
    },
  },
})
