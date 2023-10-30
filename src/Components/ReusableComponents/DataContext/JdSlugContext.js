import { useRouter } from 'next/router';
import { createContext, useState } from 'react';

export const JdSlugContext = createContext();

export function JDSlugProvider(props) {
  const [data, setData] = useState({});

  const router = useRouter();

  return (
    <JdSlugContext.Provider value={{ data, setData }}>
      {props.children}
    </JdSlugContext.Provider>
  );
}
