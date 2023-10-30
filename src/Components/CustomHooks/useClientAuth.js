import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useClientAuth() {
  const router = useRouter();
  const userDetails = localStorageUtil.getItem('userDetails');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userDetails) {
      setUser(userDetails);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      router.replace('/login');
    }
  }, []);

  return { user, isLoading };
}
