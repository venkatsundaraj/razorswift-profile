import useSummary from '@/customHooks/CutsomApiHooks/useSummary';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { modeType, roleOfViewer, typeOfViewer } from '@/utils/enum';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const useUserSummary = () => {
  const candidateId = useMemo(() => {
    const userDetails = localStorageUtil.getItem('userDetails') || {};
    return userDetails.candidateId;
  }, []);

  const router = useRouter();

  const summaryProps = useMemo(
    () => ({
      type: typeOfViewer['aspirant'],
      role: roleOfViewer['candidate'],
      mode: modeType['edit'],
      candidateid: `${candidateId}`,
    }),
    [candidateId]
  );

  const summary = useSummary(summaryProps);

  return {
    candidateId,
    router,
    summary,
  };
};

export default useUserSummary;
