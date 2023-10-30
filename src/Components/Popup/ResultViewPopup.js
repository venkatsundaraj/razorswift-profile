import { setAlertPopup } from '@/store/alertSlice';
import { JdInterviewRoundApi } from '@/swagger_api/*';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import { useTheme } from '@emotion/react';
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BootstrapDialog, BootstrapDialogTitle } from './PoupComponents';

function ResultViewPopup({
  isDialogOpened,
  handleCloseDialog,
  popUpInfo,
  passCandidate,
  failCandidate,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [assessmentNames, setAssessmentNames] = useState([]);
  const jdInterviewRoundApi = useMemo(() => new JdInterviewRoundApi(), []);
  const resultValues = popUpInfo?.resultValues;
  const jdId = popUpInfo?.rowValues?.jobDescriptionId || null;
  const [rounds, setRounds] = useState(0);

  console.log(popUpInfo);
  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;

    handleCloseDialog(false);
  };

  const fetchInterviewFromJobDescription = useCallback(
    async jdId => {
      try {
        const response =
          await jdInterviewRoundApi.apiJdInterviewRoundGetInterviewPanelByJobDescriptionIdJobDescriptionIdGet(
            jdId
          );
        console.log(
          'apiJdInterviewRoundGetInterviewPanelByJobDescriptionIdJobDescriptionIdGet',
          response
        );
        if (response.body.result && response.body.result.length > 0) {
          return response.body.result;
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    [jdInterviewRoundApi]
  );

  const handleButtonClick = async status => {
    const result = await fetchInterviewFromJobDescription(
      popUpInfo?.rowValues?.jobDescriptionId
    );
    console.log(status);
    if (result && result.length > 0) {
      console.log(result.length, status);
      if (status === 'pass') {
        passCandidate(popUpInfo);
      } else if (status === 'fail') {
        failCandidate(popUpInfo);
      }
    } else {
      dispatch(
        setAlertPopup({
          message: 'Please add rounds to Jobs before updating the status',
          type: 'warning',
          duration: 3000,
        })
      );
    }
  };

  return (
    <BootstrapDialog
      disableAutoFocus
      disableRestoreFocus
      disableEnforceFocus
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          handleClose(event, reason);
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
          handleClose();
        }}
      >
        <Typography
          variant="menutitle"
          align="center"
          sx={{ fontSize: '16px', textAlign: 'center', color: 'black' }}
        >
          Results
        </Typography>
      </BootstrapDialogTitle>

      {resultValues?.report &&
      Object.keys(resultValues?.report).length !== 0 ? (
        <>
          <DialogContent>
            <Stack direction={'row'}>
              <Typography variant="body1" color="initial">
                Test completed on:
              </Typography>
              <Typography variant="body1" color="initial">
                {formatDate(resultValues?.report?.completed_date, 'datetime')}
              </Typography>
            </Stack>
            <Typography variant="body1" color="initial"></Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Skill</TableCell>
                    <TableCell>Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultValues?.report?.sections &&
                    Object.entries(resultValues.report.sections).map(
                      ([key, value]) => (
                        <TableRow key={key}>
                          <TableCell>{key}</TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      )
                    )}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack direction={'row'} alignItems={'center'} mt={2}>
              <Typography variant="subtitle1" color="initial">
                Overall Percentage:
              </Typography>
              <Typography variant="body1" color="initial">
                {resultValues?.report?.overall_percentage}%
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
            }}
          >
            <Stack alignSelf="flex-end" direction="row" spacing={2}>
              <Button
                sx={{
                  backgroundColor: '#057602',
                  color: 'white',

                  borderRadius: 10,
                  pl: 3,
                  pr: 3,
                  '&:hover': {
                    backgroundColor: '#057602',
                  },
                }}
                variant="contained"
                onClick={() => handleButtonClick('pass')}
              >
                Pass
              </Button>
              <Button
                sx={{
                  backgroundColor: '#ff0000',
                  color: 'white',

                  borderRadius: 10,
                  pl: 3,
                  pr: 3,
                  '&:hover': {
                    backgroundColor: '#ff0000',
                  },
                }}
                variant="contained"
                onClick={() => handleButtonClick('fail')}
              >
                Fail
              </Button>
            </Stack>
          </DialogActions>
        </>
      ) : (
        <Stack alignItems="center" spacing={2}>
          <Typography
            variant="body2"
            color="initial"
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              height: '50px',
            }}
          >
            Test yet to be taken
          </Typography>
        </Stack>
      )}
    </BootstrapDialog>
  );
}

export default ResultViewPopup;
