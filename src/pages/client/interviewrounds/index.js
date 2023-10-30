import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import Title from '@/headingComponents/Title';
import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import { otherProps } from '@/pageComponents/Profile/Common/Properties/Properties';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { setAlertPopup } from '@/store/alertSlice';
import {
  ClientInterviewRoundApi,
  JdInterviewRoundApi,
  JobDescriptionApi,
} from '@/swagger_api/*';
import { getFormTypes } from '@/utils/CommonFunctions/EnumFunctions';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMasters } from '@/view/dgrid';
import { useTheme } from '@emotion/react';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Stack, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const ButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'center',
  lineHeight: '19.2px',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    lineHeight: '16.8px',
  },
}));

const INITIAL_FORM_STATE = {
  roundName: '',
};

const FORM_VALIDATION = Yup.object().shape({
  roundName: Yup.string()
    .min(1)
    .max(50, 'Only 50 characters allowed')
    .required('Name is required'),
});

const UrlBase = `/client/jobs`;

const Interviewrounds = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();

  const [jdList, setJdList] = useState([]);
  const [interviewEdit, setInterviewEdit] = useState('2');
  const [jdData, setJdData] = useState(null);
  const [interviewInfoInitialValues, setInterviewInfoInitialValues] =
    useState(INITIAL_FORM_STATE);
  const isAdding = getFormTypes('Add_Form') === interviewEdit;
  const jobDescriptionApi = useMemo(() => new JobDescriptionApi(), []);
  const jdInterviewRoundApi = useMemo(() => new JdInterviewRoundApi(), []);
  const clientInterviewRoundApi = useMemo(
    () => new ClientInterviewRoundApi(),
    []
  );
  const { setLoading } = useContext(LoadingContext);
  const clientDetails = localStorageUtil.getItem('clientDetails');
  const clientId = clientDetails?.contact?.clientId;

  const fetchInterviewRounds = useCallback(async () => {
    try {
      const response =
        await clientInterviewRoundApi.apiClientInterviewRoundGetAllRoundByClientIdClientIdGet(
          clientId
        );
      console.log(response);
      if (response.body.result?.length && response.body.result?.length > 0) {
        const trim = response.body.result?.map((res, index) => ({
          slno: index + 1,
          ...res,
          title: res.roundName,
        }));

        setJdList(trim);
      } else {
        setJdList(prevState => ({
          ...prevState,
          rows: [],
        }));
      }
    } catch (err) {
      console.log(err);
      console.log('id');
      setJdList(prevState => ({
        ...prevState,
        rows: [],
      }));
    }
  }, [clientInterviewRoundApi, clientId]);

  useEffect(() => {
    if (clientId) fetchInterviewRounds();
  }, [clientId, fetchInterviewRounds]);

  const columns = [
    {
      field: 'slno',
      headerName: 'Sl no',
      maxWidth: 10,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: params => params.row.slno,
      sortable: false,
      filterable: false,
    },
    {
      field: 'title',
      headerName: 'Name',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },

    {
      field: 'view  ',
      headerName: 'Actions',
      headerClassName: 'super-app-theme--header',
      sortable: false,
      filterable: false,
      flex: 1,
      minWidth: 50,
      renderCell: params => (
        <>
          <Tooltip title="Edit Round" arrow placement="right">
            <IconButton
              color="primary"
              size="small"
              onClick={() => {
                setInterviewInfoInitialValues({
                  roundName: params.row.title,
                  id: params.row.id,
                });
                setInterviewEdit('3');
              }}
            >
              <EditIcon
                stroke={1.0}
                size="1.3rem"
                sx={{ fontSize: '1.3rem' }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Round" arrow placement="right">
            <IconButton
              color="primary"
              onClick={() => {
                deleteRound(params.row.id);
              }}
              size="small"
            >
              <DeleteIcon
                stroke={1.0}
                size="1.0rem"
                sx={{ fontSize: '1.3rem' }}
              />
            </IconButton>
          </Tooltip>
        </>
      ),
      editable: false,
    },
  ];

  const addRound = async (post, { resetForm }) => {
    console.log(post);
    setLoading(true);
    const opts = {
      body: { ...post, clientId: clientId },
    };
    console.log('round', opts);
    try {
      const response =
        await clientInterviewRoundApi.apiClientInterviewRoundPost(opts);
      setLoading(false);
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Jobs Interview Round  created successfully',
            type: 'success',
            duration: 3000,
          })
        );
        console.log(response.body.message);
        resetForm();
        fetchInterviewRounds(jdData);
      } else {
        fetchInterviewRounds(jdData);
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
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
  const updateRound = async (post, { resetForm }) => {
    console.log(post);
    setLoading(true);
    const opts = {
      body: { ...post, clientId: clientId },
    };
    try {
      const response = await clientInterviewRoundApi.apiClientInterviewRoundPut(
        opts
      );
      setLoading(false);

      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Jobs Interview Round updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        console.log(response.body.message);
        setInterviewInfoInitialValues(INITIAL_FORM_STATE);
        setInterviewEdit('2');
        fetchInterviewRounds(jdData);
      } else {
        fetchInterviewRounds(jdData);
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
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

  const deleteRound = async post => {
    const confirmDelete = async () => {
      try {
        const response =
          await clientInterviewRoundApi.apiClientInterviewRoundIdDelete(post);
        if (response.body.result) {
          dispatch(
            setAlertPopup({
              message: 'Jobs Interview Round deleted successfully',
              type: 'success',
              duration: 3000,
            })
          );
          fetchInterviewRounds(jdData);
        } else {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
        }
      } catch (error) {
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try again!',
            type: 'error',
            duration: 3000,
          })
        );
      }
    };

    const revertDelete = () => {
      dispatch(
        setAlertPopup({
          message: 'You have reverted the delete action',
          type: 'info',
          duration: 3000,
        })
      );
    };

    showConfirmationDialog(
      'Are you sure?',
      'You want to delete this Round!',
      confirmDelete,
      revertDelete
    );
  };

  return (
    <ClientLayout>
      <MainCard
        title={
          <TitleBackButton
            title={'Interview Rounds List'}
            onClick={() => router.back()}
          />
        }
        secondary={<></>}
      >
        <Title>{jdData?.title}</Title>
        <Stack alignItems={'flex-end'}>
          <Formik
            enableReinitialize
            initialValues={{
              ...interviewInfoInitialValues,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={async (values, { resetForm }) => {
              if (isAdding) {
                addRound(values, { resetForm });
              } else {
                updateRound(values, { resetForm });
              }
            }}
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
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={2}
                  justifyContent="flex-start"
                  alignItems="flex-end"
                  mb={3}
                  sx={{ maxWidth: 300 }}
                >
                  <Grid item xs={12} md={12}>
                    <Stack
                      spacing={2}
                      direction="row"
                      justifyContent={'space-between'}
                    >
                      <FormHeaderComponents
                        title={isAdding ? 'Create Round' : 'Edit Round'}
                        isButtonNotRequired={true}
                      />
                      {!isAdding && (
                        <IconButton
                          size="small"
                          disableRipple
                          onClick={() => {
                            setInterviewEdit('2');
                            setInterviewInfoInitialValues(INITIAL_FORM_STATE);
                          }}
                        >
                          <ClearIcon color="primary" />
                        </IconButton>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextfieldWrapper
                      name="roundName"
                      textLabel="Name"
                      textLabelStyle={textLabel}
                      otherProps={otherProps}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <ShadowButtonSubmit
                      height="40px"
                      width="100%"
                      minwidth="250px"
                      maxwidth="275px"
                      backgroundcolor={theme.palette.primary.main}
                      type="submit"
                      onClick={handleSubmit}
                    >
                      <ButtonText color="#fff">
                        {isAdding ? 'Create' : 'Edit'}
                      </ButtonText>
                    </ShadowButtonSubmit>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          <CustomDataGridMasters
            componentsProps={{
              NoRowsOverlay: () => (
                <CustomNoRowsOverlay title="There are no Interview Rounds to show" />
              ),
            }}
            data={{
              columns: columns,
              initialState: {
                columns: {
                  columnVisibilityModel: {
                    id: true,
                  },
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                },
              },
              rows: jdList,
            }}
            loading={false}
          />
        </Stack>
      </MainCard>
    </ClientLayout>
  );
};

export default withAuth(Interviewrounds, 'client');
