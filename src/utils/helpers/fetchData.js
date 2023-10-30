import { ApiError } from '@/lib/exceptions/ApiError';
import axios from 'axios';
import { useEffect, useState } from 'react';

const fetchData = function (api) {
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async function () {
      setIsLoading(true);
      try {
        const config = {
          headers: {
            'x-rs-key': process.env.X_RS_KEY,
          },
        };

        const response = await axios.post(api, config);

        if (!response.data) {
          setIsLoading(false);
          setError(response);
          throw new Error('Could not get the data');
        }

        return setData(response.data);
      } catch (err) {
        throw new ApiError();
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return {
    isLoading: isLoading,
    data: data,
    error: error,
  };
};

export default fetchData;
