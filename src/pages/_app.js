import AlertSnackbar from '@/reUsableComponents/Alert/AlertSnackBar';
import LoadingBackdrop from '@/reUsableComponents/LoadingComponents/LoadingBackdrop';
import { LoadingProvider } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import LogoLoader from '@/reUsableComponents/LogoLoader';
import { wrapper } from '@/store/store';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Suspense, useEffect, useMemo } from 'react';
import TagManager from 'react-gtm-module';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import config from '../../config';
import '../../styles/globals.css';
import createEmotionCache from '../utils/createEmotionCache';
import themes from '../utils/themes';

import Analytics from '@/src/components_fbl/Analytics/Analytics';
import { encryptData } from '@/utils/encryption';
import * as swagger_api from '../swagger_api';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);

  const { emotionCache = clientSideEmotionCache, pageProps } = props;

  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

  const tagManagerArgs = useMemo(() => {
    return {
      gtmId: GTM_ID,
      // dataLayer: {
      //   userId: 'G-NH0YL8HNPX',
      //   userProject: 'G-NH0YL8HNPX',
      // },
    };
  }, [GTM_ID]);

  useEffect(() => {
    // Set up the X-RS-Key when the application starts
    const defaultClient = swagger_api.ApiClient.instance;
    var XRSKeyAuth = defaultClient.authentications['X-RS-Key'];
    XRSKeyAuth.apiKey = encryptData();
    var XRSKeyBearer = defaultClient.authentications['Bearer'];
    XRSKeyBearer.apiKey =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjI3IiwibmJmIjoxNjkyODgyNzU3LCJleHAiOjE2OTI5MjU5NTUsImlhdCI6MTY5Mjg4Mjc1N30.m_sHzQiVNI7eZV36n70vrHABG7wNDyuqVj9J7JVyXQY';
  }, []);

  // useEffect(() => {
  //   // Configure the Bearer token
  //   const apiClient = new swagger_api.ApiClient();
  //   apiClient.setBearerToken(
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjI3IiwibmJmIjoxNjkyODgyNzU3LCJleHAiOjE2OTI5MjU5NTUsImlhdCI6MTY5Mjg4Mjc1N30.m_sHzQiVNI7eZV36n70vrHABG7wNDyuqVj9J7JVyXQY'
  //   );
  //   apiClient.setXRSKey(encryptData());
  // }, []);

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, [tagManagerArgs]);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <ThemeProvider theme={themes(config.customization)}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <PersistGate persistor={store.__persistor} loading={<LogoLoader />}>
            <LoadingProvider>
              <AlertSnackbar />
              <Suspense>
                <Analytics />
              </Suspense>
              <Component {...pageProps} />
              <LoadingBackdrop />
            </LoadingProvider>
          </PersistGate>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
