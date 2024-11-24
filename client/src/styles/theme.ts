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
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#680000',
          },
        },
      },
    },
  },
});

export default theme;
