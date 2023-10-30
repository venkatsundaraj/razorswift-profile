import { callApi } from '@/utils/apirequest';
import { useCallback, useEffect, useState } from 'react';

const usePathways = () => {
  const [loading, setLoading] = useState(true);
  const [titleNames, setTitleNames] = useState([]);

  const getTitlePathways = useCallback(async () => {
    try {
      setLoading(true);
      const response = await callApi('GetPathwayTitle', {});
      if (response?.status === 200) {
        setTitleNames(response?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTitlePathways();
  }, [getTitlePathways]);

  return { loading, titleNames };
};

export default usePathways;
