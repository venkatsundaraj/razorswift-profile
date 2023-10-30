import { useTheme } from '@emotion/react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch } from 'react-redux';
import { BootstrapDialog, BootstrapDialogTitle } from './PoupComponents';

function ViewInterPanelPopup({
  isDialogOpened,
  handleCloseDialog,
  isInterViewPanelPopupInfo,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();

  console.log(isInterViewPanelPopupInfo, 'dd');
  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;

    handleCloseDialog(false);
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
          {isInterViewPanelPopupInfo?.name}
        </Typography>
      </BootstrapDialogTitle>

      {isInterViewPanelPopupInfo?.jdInterviewRoundsPanels?.length > 0 ? (
        <>
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
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isInterViewPanelPopupInfo?.jdInterviewRoundsPanels &&
                    isInterViewPanelPopupInfo.jdInterviewRoundsPanels.map(
                      (values, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{values.name}</TableCell>
                          <TableCell>{values.email}</TableCell>
                        </TableRow>
                      )
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
            }}
          ></DialogActions>
        </>
      ) : (
        <Typography variant="body1" color="initial">
          No data
        </Typography>
      )}
    </BootstrapDialog>
  );
}

export default ViewInterPanelPopup;
