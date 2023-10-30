import MainCard from '@/cardComponents/MainCard';
import DashboardLayout from '@/layouts/DashboardLayout';
import RejectAssessmentPopup from '@/src/Components/Popup/RejectAssessmentPopup';
import ScheduleAssessmentPopup from '@/src/Components/Popup/ScheduleAssessmentPopup';
import { CustomDataGrid } from '@/src/Components/View/Datagrid';
import { setAlertPopup } from '@/store/alertSlice';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import { callApi } from '@/utils/apirequest';
import renderCellExpand from '@/view/CellExpand';
import { Button, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const StatusValues = {
  0: 'Request pending',
  1: 'Invite sent',
  2: 'Reject',
};

function mapSkillLevels(skillLevel) {
  switch (skillLevel) {
    case 1:
      return 'Beginner';
    case 2:
      return 'Intermediate';
    case 3:
      return 'Expert';
    default:
      return '';
  }
}
function AssessmentRequest() {
  const dispatch = useDispatch();
  const [candidateAssessmentList, setCandidateAssessmentList] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [popUpInfo, setPopUpInfo] = useState({});
  const [rejectPopUpInfo, setRejectPopUpInfo] = useState({});
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 20,
  });
  const columns = [
    {
      field: 'slno',
      headerName: 'Sl no',
      maxWidth: 10,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: params => params.row.id,
      sortable: false,
      filterable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'candidate_skill_platform_name',
      headerName: 'Skill name',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'skill_level',
      headerName: 'Level',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'request_date_time',
      headerName: 'Date',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'statusName',
      headerName: 'Status',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      renderCell: params => (
        <>
          <Typography variant="body1">{params.row.statusName}</Typography>
        </>
      ),
    },

    {
      field: 'report',
      headerName: 'Actions',
      headerClassName: 'super-app-theme--header',
      sortable: false,
      filterable: false,
      flex: 1,
      minWidth: 50,
      renderCell: params => (
        <>
          {params?.row?.status === 0 && (
            <>
              <Button
                onClick={() => {
                  setIsPopupOpen(true);
                  setPopUpInfo(params.row);
                }}
              >
                Schedule
              </Button>
              <Button
                onClick={() => {
                  setIsRejectPopupOpen(true);
                  setRejectPopUpInfo(params.row);
                }}
              >
                Reject
              </Button>
            </>
          )}
        </>
      ),
      editable: false,
    },
  ];

  const CandidateAssessmentRequestListApi = () => {
    console.log('hi');
    const data = {
      isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
      data: {},
    };
    callApi('ListCandidateRequest', data)
      .then(response => {
        console.log(response, 'response');
        if (response?.data?.status === 200) {
          setCandidateAssessmentList(response?.data?.data);
          const trim =
            response.data.data &&
            response.data.data?.map((res, index) => ({
              id: index + 1,
              ...res,
              request_date_time: formatDate(res?.request_date_time),
              skill_level: mapSkillLevels(res?.skill_level),
              statusName: StatusValues[res?.status],
            }));
          console.log('trim', trim);
          setPageState(prevState => ({
            ...prevState,
            data: trim,
          }));
        } else {
          //   dispatch(
          //     setAlertPopup({ message: 'Something went wrong Please try Again !', type: 'error', duration: 3000 })
          //   );
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
      });
  };

  useEffect(() => {
    CandidateAssessmentRequestListApi();
  }, []);
  return (
    <>
      <DashboardLayout />
      <Container maxWidth="xxl">
        <MainCard title="Assessment Request">
          <ScheduleAssessmentPopup
            CandidateAssessmentRequestListApi={
              CandidateAssessmentRequestListApi
            }
            isDialogOpened={isPopupOpen}
            handleCloseDialog={() => setIsPopupOpen(false)}
            popUpInfo={popUpInfo}
            setPopUpInfo={setPopUpInfo}
          />
          <RejectAssessmentPopup
            CandidateAssessmentRequestListApi={
              CandidateAssessmentRequestListApi
            }
            isDialogOpened={isRejectPopupOpen}
            handleCloseDialog={() => setIsRejectPopupOpen(false)}
            popUpInfo={rejectPopUpInfo}
            setPopUpInfo={setRejectPopUpInfo}
          />
          <CustomDataGrid
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            rows={pageState.data}
            rowCount={pageState.total}
            loading={pageState.isLoading}
            rowsPerPageOptions={[10, 20, 30, 50, 70, 100]}
            pagination
            page={pageState.page - 1}
            pageSize={pageState.pageSize}
            paginationMode="server"
            onPageChange={newPage => {
              setPageState(old => ({ ...old, page: newPage + 1 }));
            }}
            onPageSizeChange={newPageSize =>
              setPageState(old => ({ ...old, pageSize: newPageSize }))
            }
            columns={columns}
          />
        </MainCard>
      </Container>
    </>
  );
}
export default AssessmentRequest;
function CustomNoRowsOverlay() {
  return (
    <Typography variant="h6" align="center" sx={{ fontSize: '15px' }} mt={18}>
      No Records Found
    </Typography>
  );
}
