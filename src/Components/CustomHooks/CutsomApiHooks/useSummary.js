import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { callApi } from '@/utils/apirequest';
import { modeType } from '@/utils/enum';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

const useSummary = incomingProps => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const shouldLog = useRef(true);
  const fullURL = `${window.location.origin}${router.asPath}`;

  const postVisitorSummary = useCallback(async () => {
    try {
      setLoading(true);
      const userDetails = localStorageUtil.getItem('userDetails');
      const clientDetails = localStorageUtil.getItem('clientDetails');
      const id = userDetails?.candidateId || clientDetails?.contact?.clientId;
      const role = userDetails?.candidateId
        ? 'Candidate'
        : clientDetails?.contact?.clientId
        ? 'Client'
        : 'None';

      const data = {
        data: {
          type: '',
          slug: '',
          candidateid: '',
          jd_id: '',
          viewer_id: id || '',
          viewer_role: role || '',
          event_date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
          path_url: fullURL,
          mode: modeType['view'],
          ...incomingProps,
        },
        isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
        topic: 'visitor_summary',
        action: 'addvisitor',
      };
      console.log(data);
      const response = await callApi('pubSub', data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [incomingProps, fullURL]);

  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      postVisitorSummary();
    }
  }, []);

  return { loading };
};

export default useSummary;
