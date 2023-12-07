import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { AuthProvider } from 'react-auth-kit';

import App from './app/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <AuthProvider
      authType={'cookie'}
      authName={'jwt'}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === 'https:'}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
