import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import Title from '@/headingComponents/Title';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import { UrlPaths } from '@/src/data/UrlPaths';
import { setAlertPopup } from '@/store/alertSlice';
import {
  AssessmentApi,
  JdAndAssessmentApi,
  JdAndTaggedCandidateApi,
  JobDescriptionApi,
} from '@/swagger_api/*';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMastersSelction } from '@/view/Datagrid';
import { Stack, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

const TagJdAssessmentComponent = ({ role }) => {
  const theme = useTheme();
  const gridRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  const UrlBase =
    role === 'Admin' ? `${UrlPaths.adminJd}` : `${UrlPaths.clientJd}`;
  const [selectionModel, setSelectionModel] = useState([]);
  const [jdAssessmentList, setJdAssessmentList] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState([]);
  // var selectedRows = useMemo(
  //   () => jdAssessmentList.filter(row => selectionModel.includes(row.id)),
  //   [jdAssessmentList, selectionModel]
  // );
  var selectedRows = useMemo(
    () =>
      jdAssessmentList && selectionModel
        ? jdAssessmentList.filter(row => selectionModel.includes(row.id))
        : [],
    [jdAssessmentList, selectionModel]
  );
  const [jdData, setJdData] = useState(null);
  const jobDescriptionApi = useMemo(() => new JobDescriptionApi(), []);
  const jdAndTaggedCandidateApi = useMemo(
    () => new JdAndTaggedCandidateApi(),
    []
  );
  const jdAndAssessmentApi = useMemo(() => new JdAndAssessmentApi(), []);
  const assessmentApi = useMemo(() => new AssessmentApi(), []);
  const columns = useMemo(
    () => [
      {
        field: 'slno',
        headerName: 'Sl no',
        maxWidth: 10,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: renderCellExpand,
        sortable: false,
        filterable: false,
      },
      {
        field: 'title',
        headerName: ' Title',
        minWidth: 10,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: renderCellExpand,
      },
      {
        field: 'companyName',
        headerName: 'Assessment Company',
        minWidth: 100,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: renderCellExpand,
      },
      {
        field: 'note',
        headerName: 'Remarks',
        minWidth: 100,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: renderCellExpand,
      },
    ],
    []
  );

  const getAssessments = useCallback(
    async jdId => {
      try {
        let response = await assessmentApi.apiAssessmentGetAllAssessmentJdIdGet(
          jdId
        );

        if (response?.body?.result && response?.body?.result.length > 0) {
          const trim =
            response.body.result.map((res, index) => ({
              slno: index + 1,
              id: res.id,
              title: res?.title,
              note: res?.note,
              integrationId: res?.integrationId,
              companyName: res?.integration?.companyName,
              ...res,
            })) || [];

          console.log('values', trim);
          return trim;
        }
      } catch (err) {
        console.log(err);
      }
      return [];
    },
    [assessmentApi]
  );

  const getJdData = useCallback(
    async guid => {
      console.log(guid, 'guid');
      try {
        const response =
          await jobDescriptionApi.apiJobDescriptionGetByGuidGuidGet(guid);
        if (response?.body?.result) {
          setJdData(response.body.result);
          const getJdAssessmentsDetails = await getAssessments(
            response.body.result.id
          );
          setJdAssessmentList(getJdAssessmentsDetails);
        }
      } catch (err) {
        console.log(err);
        setJdData([]);
      }
    },
    [jobDescriptionApi, getAssessments]
  );

  useEffect(() => {
    if (router.query.guId) getJdData(router.query.guId);
  }, [router.query.guId, getJdData]);

  useEffect(() => {
    setSelectedCandidate(selectedRows);
  }, [selectedRows]);

  const handleSelectionModelChange = newSelectionModel => {
    setSelectionModel(newSelectionModel);
  };

  const handleButtonClick = () => {
    const selectedData = jdAssessmentList.filter(row =>
      selectionModel.includes(row.id)
    );
    setSelectedCandidate(selectedData);
    const jdAssessmentObj = {
      jobDescriptionId: jdData?.id,
      assessmentIds: selectedData.map(({ id }) => id),
    };
    console.log(jdAssessmentObj);
    tagJdAssessments(jdAssessmentObj);
  };

  const tagJdAssessments = async post => {
    const opts = {
      body: post,
    };
    const confirmDelete = async () => {
      try {
        const response = await jdAndAssessmentApi.apiJdAndAssessmentPost(opts);
        if (response.body.result) {
          dispatch(
            setAlertPopup({
              message: 'Jobs Assessment tagged successfully',
              type: 'success',
              duration: 3000,
            })
          );
          router.push({
            pathname: `${UrlBase}view`,
            query: { guId: router?.query?.guId },
          });
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
          message: 'You have reverted the tag action',
          type: 'info',
          duration: 3000,
        })
      );
    };

    showConfirmationDialog(
      'Are you sure?',
      'You want to tag this assessments to Jobs!',
      confirmDelete,
      revertDelete
    );
  };
  return (
    <MainCard
      title={
        <TitleBackButton
          title={`Tag Jobs Assessment for ${jdData?.title}`}
          onClick={() => router.back()}
        />
      }
    >
      <Title>{jdData?.title}</Title>
      <Stack spacing={2}>
        <CustomDataGridMastersSelction
          componentsProps={{
            NoRowsOverlay: () => (
              <CustomNoRowsOverlay title="There are no Assessment to display" />
            ),
          }}
          isRowSelectable={params => !params.row.isTagged}
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
            rows: jdAssessmentList,
          }}
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={handleSelectionModelChange}
          pageSizeOptions={[5, 10]}
          rowsPerPageOptions={[5, 10, 20, 40, 60, 80, 100]}
          ref={gridRef}
        />
        <Stack
          justifyContent={'flex-end'}
          sx={{ width: '100%' }}
          alignItems={'flex-end'}
        >
          {selectedCandidate?.length > 0 && (
            <ShadowButtonSubmit
              height="50px"
              width="100%"
              minwidth="250px"
              maxwidth="350px"
              backgroundcolor={theme.palette.primary.main}
              type="submit"
              onClick={() => handleButtonClick()}
            >
              <ButtonText color="#fff">Tag Jobs Assessments</ButtonText>
            </ShadowButtonSubmit>
          )}
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default TagJdAssessmentComponent;
