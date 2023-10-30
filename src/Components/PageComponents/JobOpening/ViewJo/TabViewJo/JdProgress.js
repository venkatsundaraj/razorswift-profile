import ProfileCard from '@/cardComponents/ProfileCard';

import { MyJoViewer } from '@/pageComponents/JobOpening/ViewJo';
import { Container } from '@mui/material';
import { useCallback, useContext, useMemo } from 'react';

import CandidateHistoryTimeLine from '@/reUsableComponents/TimeLine/CandidateHistoryTimeLine';
import { JdAndCandidateStatusApi } from '@/swagger_api/*';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const SubTitle = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#1D1D1D',
  fontWeight: weight || '500',
  fontSize: '16px',
  lineHeight: lineHeight || '19px',
  textAlign: 'inherit',
  wordWrap: 'break-word',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '12px',
    lineHeight: lineHeight || '14.4px',
  },
}));

const Title = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#434343',
  fontWeight: weight || '500',
  fontSize: '13px',
  lineHeight: lineHeight || '18px',
  textAlign: 'inherit',
  wordWrap: 'break-word',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '11px',
    lineHeight: lineHeight || '14.4px',
  },
}));
const CardSectionHeader = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '700',
  fontSize: '18px',
  lineHeight: '15.4px',
  textAlign: 'inherit',
  padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '12.23px',
  },
}));

const JdProgress = () => {
  const jdData = useContext(MyJoViewer).jdData;
  const userDetails = useMemo(
    () => localStorageUtil.getItem('userDetails'),
    []
  );

  const jdAndCandidateStatusApi = useMemo(
    () => new JdAndCandidateStatusApi(),
    []
  );

  const [timeLineData, setTimeLineData] = useState([]);

  const fetchJobDescription = useCallback(async () => {
    try {
      const response =
        await jdAndCandidateStatusApi.apiJdAndCandidateStatusGetCandidateStatusByIdJobDescriptionIdCandidateIdGet(
          jdData.id,
          userDetails.candidateId
        );
      if (response.body.result) {
        return response.body.result;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }, [jdAndCandidateStatusApi, jdData, userDetails]);

  useEffect(() => {
    const fetchData = async () => {
      if (userDetails) {
        const result = await fetchJobDescription();
        setTimeLineData(result);
      }
    };
    fetchData();
  }, [userDetails, fetchJobDescription]);

  return (
    <Container maxWidth="lg">
      <ProfileCard styleProps={{ minHeight: '50px', width: '100%' }}>
        <CardSectionHeader>Jobs Progress</CardSectionHeader>
        <Typography variant="h3">{timeLineData?.name}</Typography>
        <CandidateHistoryTimeLine data={timeLineData} />
      </ProfileCard>
    </Container>
  );
};
export default JdProgress;
