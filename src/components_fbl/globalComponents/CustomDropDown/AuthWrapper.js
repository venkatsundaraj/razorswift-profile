import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { CircularProgress, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const withAuth = (WrappedComponent, allowedRoles) => {
  const AuthWrapper = props => {
    const router = useRouter();

    const shouldLog = useRef(true);
    const [isLoading, setIsLoading] = useState(true);
    const clientDetails = useMemo(
      () => localStorageUtil.getItem('clientDetails'),
      []
    );
    const userDetails = useMemo(
      () => localStorageUtil.getItem('userDetails'),
      []
    );

    const navigateToPath = path => {
      setIsLoading(true);
      router.push(path, undefined, { shallow: true });
      setIsLoading(false);
    };

    const checkAuth = useCallback(async () => {
      if (
        allowedRoles === 'client' &&
        clientDetails &&
        router.pathname === '/client/login'
      ) {
        navigateToPath('/client/dashboard');
        setIsLoading(false);
      } else if (allowedRoles === 'client' && clientDetails) {
        setIsLoading(false);
      } else if (allowedRoles === 'client' && !clientDetails) {
        navigateToPath('/client/login');
      } else if (
        allowedRoles === 'user' &&
        userDetails &&
        ['/login', '/signup', '/otp'].includes(router.pathname)
      ) {
        navigateToPath('/profile');
      } else if (
        allowedRoles === 'user' &&
        !userDetails &&
        !['/login', '/signup', '/otp'].includes(router.pathname)
      ) {
        setIsLoading(false);
        navigateToPath('/login');
      } else if (allowedRoles === 'user' && userDetails) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }, [allowedRoles, clientDetails, router.pathname, userDetails]);

    useEffect(() => {
      if (shouldLog.current) {
        checkAuth();
      }
    }, [checkAuth]);

    return (
      <LogoLoader isLoading={isLoading} checkAuth={checkAuth}>
        <WrappedComponent {...props} />
      </LogoLoader>
    );
  };

  return AuthWrapper;
};

export default withAuth;

const LogoLoader = ({ isLoading, checkAuth, children }) => {
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <Container
        maxWidth={false}
        sx={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return children;
};
