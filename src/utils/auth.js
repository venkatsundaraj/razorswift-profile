import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { useState } from 'react';

export const useAuth = () => {
  const [userInfo, setUserInfo] = useState(null);

  if (typeof window !== 'undefined') {
    // This code runs only on the client

    const userDetails = localStorageUtil.getItem('userDetails');
    if (!userDetails) {
      return null;
    } else {
      setUserInfo(userDetails);
    }
  }

  return userInfo;
};
