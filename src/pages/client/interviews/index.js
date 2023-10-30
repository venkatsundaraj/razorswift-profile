import MainCard from '@/cardComponents/MainCard';
import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import CandidateStatus from '@/reUsableComponents/Status/CandidateStatus';
import Status from '@/reUsableComponents/Status/Status';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import ClientInterviewViewPopup from '@/src/Components/Popup/ClientInterviewViewPopup';
import { JdClientInterviewApi } from '@/swagger_api/api/CityApi';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMasters } from '@/view/dgrid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Link as MuiLink, Tooltip } from '@mui/material';
import NextLink from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

// import { alpha, styled } from '@mui/material/styles';

const Interviews = () => {
  const dispatch = useDispatch();

  const [interviewsList, setInterviewsList] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [
    isCandidateInterviewPanelPopupOpen,
    setCandidateIsInterviewPanelPopupOpen,
  ] = useState(false);
  const [
    candidateInterViewPanelPopupInfo,
    setCandidateInterViewPanelPopupInfo,
  ] = useState({});
  const [isInterviewUpdatePopupOpen, setIsInterviewUpdatePopupOpen] =
    useState(false);
  const [interviewUpdatePopupInfo, setInterviewUpdatePopupInfo] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);
  const [popUpResultInfo, setPopUpResultInfo] = useState({});
  const [rejectValues, setRejectValues] = useState({});
  const [popUpInfo, setPopUpInfo] = useState({});
  const clientDetails = localStorageUtil.getItem('clientDetails');
  const clientId = clientDetails?.contact?.clientId;
  console.log(clientId, 'hssh');

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
      field: 'createdDate',
      headerName: 'Interview Created Date',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: params => formatDate(params.row.createdDate, 'datetime'),
      //   renderCell: renderCellExpand,
    },
    {
      field: 'fullNames',
      headerName: 'Candidate Name',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
      //   renderCell: renderCellExpand,
    },
    {
      field: 'jobDescription?.code',
      headerName: 'Jobs Code',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      // renderCell: params => params.row.jobDescription?.code,
      renderCell: params => (
        <>
          <MuiLink
            sx={{
              maxWidth: '500px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textDecoration: 'none',
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
            style={{ textDecoration: 'none' }}
            component={NextLink}
            prefetch={false}
            href={
              params.row.jobDescription?.code
                ? `/jobs/${encodeURIComponent(params.row.jobDescription?.code)}`
                : ''
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {params.row.jobDescription?.code}
          </MuiLink>
        </>
      ),
      //   renderCell: renderCellExpand,
    },

    {
      field: 'status',
      headerName: 'Candidate Status',
      minWidth: 150,
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: params => (
        <>
          <CandidateStatus value={params.row.status} />
        </>
      ),
    },

    {
      field: 'progressiveStatus',
      headerName: 'Status',
      minWidth: 150,
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: params => (
        <>
          <Status value={params.row.progressiveStatus} />
        </>
      ),
    },

    {
      field: 'action',
      headerName: 'Actions',
      minWidth: 150,
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: params => (
        <>
          <Tooltip title="View Interview List" arrow placement="right">
            <IconButton
              onClick={() => {
                setIsInterviewUpdatePopupOpen(true);
                setInterviewUpdatePopupInfo(params.row);
              }}
            >
              <VisibilityIcon
                color="primary"
                stroke={1.0}
                size="1.3rem"
                sx={{ fontSize: '1.3rem' }}
              />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const JdClientinterviewApi = useMemo(() => new JdClientInterviewApi(), []);

  const ClientInterviewGet = useCallback(async () => {
    try {
      const response =
        await JdClientinterviewApi.apiJdClientInterviewGetAllInterviewsByClientIdClientIdGet(
          clientId
        );
      if (response.body.result) {
        const trim = response?.body?.result?.map((res, index) => ({
          slno: index + 1,
          ...res,
          fullNames: `${
            [res?.candidate?.firstName, res?.candidate?.lastName]
              .filter(Boolean)
              .join(' ') || '-'
          }`,
        }));

        setInterviewsList(trim);
        console.log(trim, 'trimm');
      } else if (response.body.message === 'No Records Found.') {
        setInterviewsList(prevState => ({
          ...prevState,
          rows: [],
        }));
      }
    } catch (err) {
      console.log(err);
      setInterviewsList(prevState => ({
        ...prevState,
        rows: [],
      }));
    }
  }, [clientId, JdClientinterviewApi]);

  useEffect(() => {
    ClientInterviewGet();
  }, [ClientInterviewGet]);

  return (
    <ClientLayout>
      <MainCard title="Interview List">
        <CustomDataGridMasters
          componentsProps={{
            NoRowsOverlay: () => (
              <CustomNoRowsOverlay title="There are no Interviews to show" />
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
            rows: interviewsList,
          }}
          loading={false}
        />
        <ClientInterviewViewPopup
          isDialogOpened={isInterviewUpdatePopupOpen}
          handleCloseDialog={() => {
            setIsInterviewUpdatePopupOpen(false);
            setInterviewUpdatePopupInfo({});
          }}
          popUpInfo={interviewUpdatePopupInfo}
          k={'jjj'}
        />
      </MainCard>
    </ClientLayout>
  );
};

export default withAuth(Interviews, 'client');
