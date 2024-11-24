import { createTheme, PaletteColor } from '@mui/material';

declare module '@mui/material' {
  interface Palette {
    tertiary: PaletteColor;
  }
  interface PaletteOptions {
    tertiary?: PaletteColor;
  }
}

const theme = createTheme({
  palette: {
    primary: { main: '#C1121F' },
    secondary: { main: '#780000' },
    background: {
      default: '#FDF0D5',
      // paper: '#FDF0BF',
    },
    tertiary: { main: '#669BBC' } as PaletteColor,
  },
  typography: {
    body1: {
      color: '#FFFFFF', // Default color for body1 text
    },
    h1: {
      color: '#FFFFFF', // Default color for h1
    },
    h2: {
      color: '#FFFFFF', // Default color for h2
    },
    h3: {
      color: '#FFFFFF', // Default color for h3
    },
    h4: {
      color: '#FFFFFF', // Default color for h4
    },
    h5: {
      color: '#FFFFFF', // Default color for h5
    },
    h6: {
      color: '#FFFFFF', // Default color for h6
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#780000',
          border: '2px solid #FDF0D5',
          color: '#FDF0D5',
          '&:hover': {
            backgroundColor: '#C1121F',
          },
        },
      },
    },
  },
});

export default theme;
