import MainCard from '@/cardComponents/MainCard';
import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import RejectAssessmentPopup from '@/src/Components/Popup/RejectAssessmentPopup';
import ScheduleAssessmentPopup from '@/src/Components/Popup/ScheduleAssessmentPopup';
import { setAlertPopup } from '@/store/alertSlice';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import { callApi } from '@/utils/apirequest';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMasters } from '@/view/dgrid';
import { Button, Container, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const StatusValues = {
  0: 'Request pending',
  1: 'Invite sent',
  2: 'Rejected',
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
  const { loading, setLoading } = useContext(LoadingContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [popUpInfo, setPopUpInfo] = useState({});
  const [rejectPopUpInfo, setRejectPopUpInfo] = useState({});

  const [candidateAssessmentrequest, setCandidateAssessmentRequest] = useState({
    columns: [],
    initialState: {
      columns: {
        columnVisibilityModel: {
          id: true,
        },
      },
    },
    rows: [],
  });
  const CandidateAssessmentRequestListApi = () => {
    setLoading(true);
    console.log('request');
    const data = {
      isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
      data: {},
    };
    callApi('ListCandidateRequest', data)
      .then(response => {
        setLoading(false);
        console.log(response, 'response');
        if (response?.data?.status === 200 && response?.data?.data?.length) {
          const trim =
            response?.data?.data &&
            response?.data?.data?.map((res, index) => ({
              id: index + 1,
              ...res,
              request_date_time: formatDate(res?.request_date_time, 'datetime'),
              skill_level: mapSkillLevels(res?.skill_level),
              statusName: StatusValues[res?.status],
            }));
          console.log('trim', trim);
          setCandidateAssessmentRequest(prevState => ({
            ...prevState,
            rows: trim,
          }));
        } else if (response?.body?.message === 'No Records Found.') {
          setCandidateAssessmentRequest(prevState => ({
            ...prevState,
            rows: [],
          }));
        }
        // else {
        //   dispatch(
        //     setAlertPopup({
        //       message: response?.data?.message || 'Something went wrong Please try Again !',
        //       type: 'error',
        //       duration: 3000,
        //     })
        //   );
        // }
      })
      .catch(err => {
        setLoading(false);
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
    setCandidateAssessmentRequest({
      columns: [
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
          headerName: 'Skill Platform',
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
      ],

      initialState: {
        columns: {
          columnVisibilityModel: {
            id: true,
          },
        },
      },
      rows: [],
    });
    CandidateAssessmentRequestListApi();
  }, []);

  return (
    <>
      <AdminLayout>
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
            <CustomDataGridMasters
              data={candidateAssessmentrequest}
              loading={false}
            />
          </MainCard>
        </Container>
      </AdminLayout>
    </>
  );
}
export default AssessmentRequest;
