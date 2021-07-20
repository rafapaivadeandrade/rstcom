import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { UserContextProvider } from '../context/UserContext';

const GlobalStyles = createGlobalStyle`
 html, body{
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

a {
  color: inherit;
  cursor: pointer;
}

* {
  box-sizing: border-box;
}
`;

const theme = {
  colors: {
    white: '#fff',
    black: '#000',
    background: '#f2f3f5',
    grayline: '#dcdde0',
    text: '##757575',
    texthighlight: '#b3b9ff',
    title: '#2e384d',
    red: '#e83f5b',
    green: '#4cd62b',
    blue: '#071ac8',
    bluedark: '#4953b8',
    bluetwitter: '#2aa9e0',
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
