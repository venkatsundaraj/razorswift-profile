import { JdClientInterviewApi } from '@/swagger_api/*';
import { useTheme } from '@emotion/react';
import { Box, Collapse, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BootstrapDialog, BootstrapDialogTitle } from './PoupComponents';

const SubTitle = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#1D1D1D',
  fontWeight: weight || '500',
  fontSize: '16px',
  lineHeight: lineHeight || '19px',
  textAlign: 'inherit',
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
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '11px',
    lineHeight: lineHeight || '14.4px',
  },
}));

const ClientInterviewViewPopup = ({
  isDialogOpened,
  handleCloseDialog,
  popUpInfo,
  k,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  console.log('sks', popUpInfo, k);
  const resultValues = popUpInfo?.resultValues;
  const [list, setList] = useState([]);
  const jdClientInterviewApi = useMemo(() => new JdClientInterviewApi(), []);
  const clientInterviewPanel = useCallback(
    async info => {
      try {
        const response = await jdClientInterviewApi.apiJdClientInterviewIdGet(
          info.id
        );
        // console.log('response', response);

        if (response?.body?.result) {
          return response?.body?.result;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    [jdClientInterviewApi]
  );
  const EditData = useCallback(async () => {
    if (popUpInfo?.id) {
      const result = await clientInterviewPanel(popUpInfo);
      console.log(result);
      setList(result);
    }
  }, [clientInterviewPanel, popUpInfo]);

  useEffect(() => {
    if (popUpInfo) EditData();
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
          View Interview
        </Typography>
      </BootstrapDialogTitle>

      <DialogContent
        sx={{
          width: '100%',
          maxHeight: '400px',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: 5,
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
        <Typography variant="body1" color="initial"></Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sl no</TableCell>
                <TableCell>Round Name</TableCell>
                <TableCell>Date of Completion</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list?.jdClientInterviewRounds?.length > 0 &&
                list?.jdClientInterviewRounds?.map((values, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{values.roundName}</TableCell>

                      <TableCell>
                        {formatDate(values.date, 'datetime')}
                      </TableCell>
                      <TableCell>{values.remarks}</TableCell>
                      <TableCell>
                        {values.status === 1 && (
                          <DoneIcon sx={{ color: '#057602' }} />
                        )}
                        {values.status === 2 && (
                          <ClearIcon sx={{ color: '#ff0000' }} />
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {values.jdClientInterviewRoundPanels.length > 0 && (
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={4}
                        >
                          <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                              >
                                Panel Details
                              </Typography>
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Sl no</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {values.jdClientInterviewRoundPanels?.map(
                                    (panel, i) => (
                                      <TableRow key={panel.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{panel.name}</TableCell>
                                        <TableCell>{panel.email}</TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      )}
                    </TableRow>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default ClientInterviewViewPopup;
const Values = ({ title, subtitle }) => {
  return (
    <Stack>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </Stack>
  );
};
