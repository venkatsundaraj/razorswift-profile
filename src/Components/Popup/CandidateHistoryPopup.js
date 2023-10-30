import CandidateHistoryTimeLine from '@/reUsableComponents/TimeLine/CandidateHistoryTimeLine';
import { JdAndCandidateStatusApi } from '@/swagger_api/*';
import { Stack, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BootstrapDialog, BootstrapDialogTitle } from './PoupComponents';

const CandidateHistoryPopup = ({
  isDialogOpened,
  handleCloseDialog,
  popUpInfo,
}) => {
  const [timeLineData, setTimeLineData] = useState([]);
  const jdAndCandidateStatusApi = useMemo(
    () => new JdAndCandidateStatusApi(),
    []
  );

  const fetchJobDescription = useCallback(
    async popUpInfo => {
      try {
        const response =
          await jdAndCandidateStatusApi.apiJdAndCandidateStatusGetCandidateStatusByIdJobDescriptionIdCandidateIdGet(
            popUpInfo.jobDescriptionId,
            popUpInfo?.id || popUpInfo?.candidateId
          );
        // console.log('response', response);
        if (response.body.result) {
          return response.body.result;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    [jdAndCandidateStatusApi]
  );

  const EditData = useCallback(async () => {
    console.log(popUpInfo, 'popUpInfo');
    const result = await fetchJobDescription(popUpInfo);
    console.log(result, 'results');
    if (result) {
      setTimeLineData(result);
      console.log('timelinedata', result);
    }
    console.log('id', result);
  }, [fetchJobDescription, popUpInfo]);

  useEffect(() => {
    console.log(popUpInfo, 'jjsjs');
    if (popUpInfo?.id) EditData();
  }, [popUpInfo, EditData]);

  return (
    <BootstrapDialog
      disableAutoFocus
      disableRestoreFocus
      disableEnforceFocus
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          handleCloseDialog();
        }
      }}
      aria-labelledby="leave-popup"
      open={isDialogOpened}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          borderRadius: 0,
        },
      }}
    >
      <BootstrapDialogTitle
        id="leave-popup"
        sx={{ p: '13px 17px', color: 'black' }}
        onClose={() => {
          handleCloseDialog();
        }}
      >
        <Typography
          variant="menutitle"
          align="center"
          sx={{ fontSize: '16px', textAlign: 'center', color: 'black' }}
        >
          Candidate History
        </Typography>
      </BootstrapDialogTitle>

      <DialogContent
        sx={{
          width: '100%',
          maxHeight: '400px',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: 5,
            height: 5,
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        <Stack direction="column" spacing={1.5}>
          <Typography variant="h3">{timeLineData?.name}</Typography>
          <CandidateHistoryTimeLine data={timeLineData} type="admin" />
        </Stack>
      </DialogContent>
    </BootstrapDialog>
  );
};
export default CandidateHistoryPopup;
