import { useEffect, useRef } from 'react';

const useFocusOnMount = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.focus();
    }
  }, []);

  return ref.current ? ref : null;
};

export default useFocusOnMount;
