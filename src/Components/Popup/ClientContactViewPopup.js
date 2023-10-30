import { formatContactNumber } from '@/utils/CommonFunctions/Functions';
import { Grid, Stack, Typography, styled } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { BootstrapDialog, BootstrapDialogTitle } from './PoupComponents';

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

const ClientContactViewPopup = ({
  isDialogOpened,
  handleCloseDialog,
  popUpInfo,
}) => {
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
          {`${popUpInfo?.firstName || ''} ${popUpInfo?.middleName || ''} ${
            popUpInfo?.lastName || ''
          }`}
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
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1.5}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={3}>
              <Values
                title="Designation"
                name={popUpInfo?.designation || '-'}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Values title="Department" name={popUpInfo?.department || '-'} />
            </Grid>

            {/* <Grid item xs={12} sm={4} md={3}>
              <Values title='Note' name={popUpInfo?.note || '-'} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Values title='Source type' name={popUpInfo?.sourceType || '-'} />
            </Grid> */}
            <Grid item xs={12} sm={4} md={3}>
              <Values
                title="Contact Number"
                name={formatContactNumber(popUpInfo?.contactNumber) || '-'}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Values title="Email" name={popUpInfo?.email || '-'} />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
    </BootstrapDialog>
  );
};
export default ClientContactViewPopup;
const Values = ({ title, name }) => {
  return (
    <Stack spacing={2}>
      <Title>{title}</Title>
      <SubTitle>{name}</SubTitle>
    </Stack>
  );
};
