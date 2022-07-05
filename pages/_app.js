import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Head from 'next/head';
import '../styles/globals.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function sc07Group({ Component, pageProps }) {
  return <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
}

export default sc07Group
