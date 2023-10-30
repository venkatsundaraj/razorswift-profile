import { callApi } from '@/utils/apirequest';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

export const SlugContext = createContext();

export function SlugProvider(props) {
  const [data, setData] = useState({});

  const router = useRouter();

  const [messages, setMessages] = useState();

  const GetErrorMessages = () => {
    callApi('ErrorMessages', data)
      .then(response => {
        console.log(response, 'errors messgaes');
        if (response.status === 200) {
          setMessages(response.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetErrorMessages();
  }, []);

  return (
    <SlugContext.Provider value={{ data, setData, messages, setMessages }}>
      {props.children}
    </SlugContext.Provider>
  );
}
