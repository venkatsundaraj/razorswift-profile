import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useNotAuth() {
  const router = useRouter();
  const userDetails = localStorageUtil.getItem('userDetails');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userDetails) {
      setIsLoading(false);
    } else {
      router.replace('/profile');
      setUser(userDetails);
      setIsLoading(false);
    }
  }, []);

  return { user, isLoading };
}
