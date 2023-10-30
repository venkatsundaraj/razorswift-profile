import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import Title from '@/headingComponents/Title';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import InterviewPanelsPopup from '@/src/Components/Popup/InterviewPanelsPopup';
import ViewInterPanelPopup from '@/src/Components/Popup/ViewInterPanelPopup';
import { UrlPaths } from '@/src/data/UrlPaths';
import { setAlertPopup } from '@/store/alertSlice';
import { JdInterviewRoundApi, JobDescriptionApi } from '@/swagger_api/*';
import { getFormTypes } from '@/utils/CommonFunctions/EnumFunctions';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMasters } from '@/view/dgrid';
import { useTheme } from '@emotion/react';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Grid, IconButton, Stack, Tooltip } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  name: '',
};
const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(1)
    .max(50, 'Only 50 are characters allowed')
    .required('Name is required'),
});

const InterviewRoundsComponent = ({ role }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const UrlBase =
    role === 'Admin' ? `${UrlPaths.adminJd}` : `${UrlPaths.clientJd}`;
  const [jdList, setJdList] = useState([]);
  const [interviewEdit, setInterviewEdit] = useState('2');
  const [jdData, setJdData] = useState(null);
  const [interviewInfoInitialValues, setInterviewInfoInitialValues] =
    useState(INITIAL_FORM_STATE);
  const isEditing = getFormTypes('Edit_Form') === interviewEdit;
  const isAdding = getFormTypes('Add_Form') === interviewEdit;
  const [isInterviewPopupOpen, setIsInterviewPopupOpen] = useState(false);
  const [isInterviewPopupInfo, setIsInterviewPopupInfo] = useState({});
  const jobDescriptionApi = useMemo(() => new JobDescriptionApi(), []);
  const jdInterviewRoundApi = useMemo(() => new JdInterviewRoundApi(), []);
  const [isInterviewPanelPopupOpen, setIsInterviewPanelPopupOpen] =
    useState(false);
  const [isInterViewPanelPopupInfo, setInterViewPanelPopupInfo] = useState({});
  const { setLoading } = useContext(LoadingContext);
  const fetchJobDescription = useCallback(
    async guid => {
      try {
        const response =
          await jobDescriptionApi.apiJobDescriptionGetByGuidGuidGet(guid);
        if (response.body.message === 'Record Fetched Successfully.') {
          return response.body.result;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    [jobDescriptionApi]
  );
  const fetchInterviewRounds = useCallback(
    async jdInfo => {
      console.log('jdInfo', jdInfo?.id);
      if (jdInfo?.id) {
        try {
          const response =
            await jdInterviewRoundApi.apiJdInterviewRoundGetInterviewPanelByJobDescriptionIdJobDescriptionIdGet(
              jdInfo?.id
            );
          console.log(response);
          if (response.body.result.length > 0) {
            const trim = response.body.result?.map((res, index) => ({
              slno: index + 1,
              ...res,
              title: res.name,
            }));

            setJdList(trim);
          }

          if (response.body.message === 'No Records Found.') {
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
      }
    },
    [jdInterviewRoundApi]
  );

  const EditData = useCallback(async () => {
    const result = await fetchJobDescription(router.query.guId);
    console.log('result', result);
    setJdData(result);
    fetchInterviewRounds(result);
  }, [fetchJobDescription, fetchInterviewRounds, router.query.guId]);

  useEffect(() => {
    if (router.query.guId) EditData();
  }, [router.query.guId, jobDescriptionApi, EditData]);

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
      headerName: ' Name',
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
          <Tooltip title="View round" arrow placement="right">
            <IconButton
              color="primary"
              size="small"
              onClick={() => {
                setIsInterviewPanelPopupOpen(true);
                setInterViewPanelPopupInfo(params.row);
              }}
            >
              <VisibilityIcon
                stroke={1.0}
                size="1.3rem"
                sx={{ fontSize: '1.3rem' }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit round" arrow placement="right">
            <IconButton
              color="primary"
              size="small"
              onClick={() => {
                setInterviewInfoInitialValues({
                  name: params.row.title,
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

          <Tooltip title="Delete round" arrow placement="right">
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

          <Tooltip
            title={
              params.row.jdInterviewRoundsPanels.length > 0
                ? 'Edit panels'
                : 'Add panels'
            }
            arrow
            placement="right"
          >
            <IconButton
              color="primary"
              onClick={() => {
                setIsInterviewPopupOpen(true);
                console.log(params.row.jdInterviewRoundsPanels);
                setIsInterviewPopupInfo(
                  params.row.jdInterviewRoundsPanels.length > 0
                    ? params.row
                    : params.row
                );
              }}
              size="small"
            >
              {params.row.jdInterviewRoundsPanels.length < 1 ? (
                <AddCircleOutlineRoundedIcon
                  stroke={1.5}
                  size="1.3rem"
                  sx={{ fontSize: '2rem' }}
                />
              ) : (
                <EditIcon
                  stroke={1.0}
                  size="1.3rem"
                  sx={{ fontSize: '1.3rem' }}
                />
              )}
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
      body: { ...post, jobDescriptionId: jdData?.id },
    };
    console.log('round', opts);
    try {
      const response = await jdInterviewRoundApi.apiJdInterviewRoundPost(opts);
      setLoading(false);
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Jobs Interview Round created successfully',
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
      body: { ...post, jobDescriptionId: jdData?.id },
    };
    try {
      const response = await jdInterviewRoundApi.apiJdInterviewRoundPut(opts);
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
        const response = await jdInterviewRoundApi.apiJdInterviewRoundIdDelete(
          post
        );
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
      'You want to delete this round!',
      confirmDelete,
      revertDelete
    );
  };

  return (
    <MainCard
      title={
        <TitleBackButton
          title={'Interview Rounds List'}
          onClick={() => router.back()}
        />
      }
      // secondary={
      //   <Tooltip title="Add Rounds" arrow placement="right">
      //     <IconButton color="primary">
      //       <MuiLink
      //         sx={{ textDecoration: 'none' }}
      //         component={NextLink}
      //         prefetch={false}
      //         href={{
      //           pathname: `${UrlBase}add`,
      //         }}
      //         legacyBehavior
      //       >
      //         <AddCircleOutlineRoundedIcon
      //           stroke={1.5}
      //           size="1.3rem"
      //           sx={{ fontSize: '2rem' }}
      //         />
      //       </MuiLink>
      //     </IconButton>
      //   </Tooltip>
      // }
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
                <Grid item xs={12} md={8}>
                  <FormHeaderComponents
                    title={isAdding ? 'Create Round' : 'Edit Round'}
                    isButtonNotRequired={true}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextfieldWrapper
                    name="name"
                    textLabel="Name"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
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
        <InterviewPanelsPopup
          title="Manage Interview Round panel"
          placeholder="Enter reason for rejection"
          isDialogOpened={isInterviewPopupOpen}
          handleCloseDialog={() => {
            setIsInterviewPopupOpen(false);
            setIsInterviewPopupInfo({});
            EditData();
          }}
          isInterviewPopupInfo={isInterviewPopupInfo}
          setIsInterviewPopupInfo={setIsInterviewPopupInfo}
          dataReload={() => {
            EditData();
          }}
        />
        <ViewInterPanelPopup
          isDialogOpened={isInterviewPanelPopupOpen}
          handleCloseDialog={() => setIsInterviewPanelPopupOpen(false)}
          isInterViewPanelPopupInfo={isInterViewPanelPopupInfo}
        />
      </Stack>
    </MainCard>
  );
};

export default InterviewRoundsComponent;
