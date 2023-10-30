import { useEffect, useRef } from 'react';

const useCustomEffect = (callback, dependencies) => {
  const shouldLog = useRef(true);

  useEffect(() => {
    if (shouldLog.current) {
      console.log('Running a custom effect!');
      callback();
      shouldLog.current = false;
    }
  }, dependencies);
};

export default useCustomEffect;
