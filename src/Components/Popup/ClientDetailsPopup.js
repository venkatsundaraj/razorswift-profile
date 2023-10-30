import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import textLabel from '@/src/Components/LabelComponents/TextLabel';

import SelectWrapper from '@/formComponents/FormsUI/Select';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { status } from '@/src/data/DropDownValues';
import { setAlertPopup } from '@/store/alertSlice';
import { ClientApi, ContactApi } from '@/swagger_api/*';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { Grid, Typography, useTheme } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { Form, Formik } from 'formik';
import { useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { BootstrapDialog, BootstrapDialogTitle } from './PoupComponents';
const INITIAL_FORM_STATE = {};

const FORM_VALIDATION = Yup.object().shape({});

const ClientContactPopup = ({
  isDialogOpened,
  handleCloseDialog,
  popUpInfo,
  clientGet,
  editContactInfo,
}) => {
  const { loading, setLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const theme = useTheme();
  const clientDetails = useMemo(
    () => localStorageUtil.getItem('clientDetails'),
    []
  );
  const contactApi = useMemo(() => new ContactApi(), []);
  const clientApi = useMemo(() => new ClientApi(), []);

  const handleSubmit = async values => {
    setLoading(true);
    console.log(values);

    const guid = values?.uniqueGuid;
    const clientStatus = values?.status;

    try {
      const response =
        await clientApi.apiClientUpdateClientStatusGuidClientStatusPost(
          guid,
          clientStatus
        );
      setLoading(false);
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Client Status updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        clientGet();
        handleCloseDialog();
      } else {
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
      console.log('post', response);
    } catch (error) {
      setLoading(false);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
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
          {popUpInfo?.id ? 'Edit' : 'Add'} Contact
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
        <Formik
          enableReinitialize
          initialValues={{
            ...INITIAL_FORM_STATE,
            ...editContactInfo,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { resetForm }) => handleSubmit(values)}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            touched,
            values,
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={3}
                justifyContent="space-between"
                alignItems={'flex-start'}
              >
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="name"
                    textLabel="Client Name"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
                    readOnly={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SelectWrapper
                    name="status"
                    textLabel="Status"
                    textLabelStyle={textLabel}
                    options={status}
                    placeholder="Select status"
                    inputProps={otherPropsRequired}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ShadowButtonSubmit
                    height="40px"
                    width="100%"
                    minwidth="250px"
                    maxwidth="250px"
                    backgroundcolor={theme.palette.primary.main}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <ButtonText color="#fff">Submit</ButtonText>
                  </ShadowButtonSubmit>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </BootstrapDialog>
  );
};
export default ClientContactPopup;
