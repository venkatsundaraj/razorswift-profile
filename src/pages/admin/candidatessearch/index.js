import MainCard from '@/cardComponents/MainCard';
import useAlert from '@/customHooks/useAlert';
import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import AdvancedCandidateSearchForm from '@/reUsableComponents/CandidateSearch/AdvancedCandidateSearchForm';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import TaggedStatusComponent from '@/reUsableComponents/Status/TaggedStatusComponent';
import AddCandidatePopup from '@/src/Components/Popup/AddCandidatePopup';
import CommonRejectPopup from '@/src/Components/Popup/CommonRejectPopup';
import { setAlertPopup } from '@/store/alertSlice';
import {
  CandidateApi,
  JdAndTaggedCandidateApi,
} from '@/swagger_api/api/CityApi';
import { formatContactNumber } from '@/utils/CommonFunctions/Functions';
import { convertToSentenceCase } from '@/utils/CommonFunctions/StringConversion';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { callApi } from '@/utils/apirequest';
import { taggedOrUntaggedEnum } from '@/utils/enum';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMasters } from '@/view/dgrid';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import {
  Box,
  Button,
  IconButton,
  Link,
  Link as MuiLink,
  Stack,
  Tooltip,
} from '@mui/material';
import NextLink from 'next/link';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

const CandidateSearch = () => {
  const dispatch = useDispatch();
  const showAlert = useAlert();

  const jdAndTaggedCandidateApi = useMemo(
    () => new JdAndTaggedCandidateApi(),
    []
  );
  const [rowsStatus, setRowsStatus] = useState({});
  const { loading, setLoading } = useContext(LoadingContext);
  const candidateApi = useMemo(() => new CandidateApi(), []);
  const [isUnTagPopupOpen, setIsUnTagPopupOpen] = useState(false);
  const [UnTagPopupInfo, setUnTagPopupInfo] = useState({});
  const [popupConfig, setPopupConfig] = useState({
    isOpen: false,
    id: null,
    jdId: null,
    // ... any other default props
  });

  const [isAddCandidatePopupOpen, setIsAddCandidatePopupOpen] = useState(false);

  const [addCandidatePopupInfo, setAddCandidatePopupInfo] = useState({});
  const candidatesGet = useCallback(async () => {
    try {
      const response = await candidateApi.apiCandidateGet();
      if (response.body.result) {
        const trim = response?.body?.result?.map((res, index) => ({
          slno: index + 1,
          ...res,
          title: res.title,
        }));
        console.log('trim', trim);
        setCandidatesList(trim);
      } else {
        setCandidatesList([]);
      }
    } catch (err) {
      console.log(err);
      setCandidatesList([]);
    }
  }, [candidateApi]);
  const unTagCandidates = useCallback(async values => {
    console.log(values);
    setPopupConfig({
      isOpen: true,
      id: values.candidate_id,
      jdId: values.tagged_status.tagged_metadata.jd_id,
    });
  }, []);

  const UntagReason = useCallback(
    async values => {
      console.log(values);
      let opts = {
        remarks: values.reason,
      };

      setLoading(true);
      try {
        const response =
          await jdAndTaggedCandidateApi.apiJdAndTaggedCandidateUnTagByJdIdAndCandidateIdJobDescriptionIdCandidateIdPost(
            values.jdId,
            values.id,
            opts
          );
        console.log(response);
        if (response.body.result) {
          showAlert('Candidate untagged successfully', 'success', 3000);
          setCandidatesList([]);
        } else {
          showAlert(response.body.message, 'error', 3000);
        }
      } catch (error) {
        showAlert('Something went wrong. Please try again!', 'error', 3000);
        showAlert('Candidate untagged successfully', 'success', 3000);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, jdAndTaggedCandidateApi, setLoading]
  );
  const downloadResume = useCallback(
    async id => {
      const confirmDownload = async () => {
        try {
          setLoading(true);
          setRowsStatus(prevStatus => ({
            ...prevStatus,
            [id]: { ...prevStatus[id], loading: true },
          }));
          const data = {
            candidate_id: id,
            isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
          };
          const response = await callApi('resumeDownload', data);
          if (response.status === 200) {
            if (response.data && response.data.status === 'success') {
              setRowsStatus(prevStatus => ({
                ...prevStatus,
                [id]: { loading: false, urls: response.data.urls },
              }));
            } else {
              dispatch(
                setAlertPopup({
                  message: convertToSentenceCase(response.data.message),
                  type: 'info',
                  duration: 3000,
                })
              );
            }
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
          setRowsStatus(prevStatus => ({
            ...prevStatus,
            [id]: { ...prevStatus[id], loading: false },
          }));
        }
      };

      const revertDownload = () => {
        dispatch(
          setAlertPopup({
            message: 'You have reverted the download action',
            type: 'info',
            duration: 3000,
          })
        );
      };

      showConfirmationDialog(
        'Are you sure?',
        'Do you want to generate the candidate resume',
        confirmDownload,
        revertDownload
      );
    },
    [setLoading, dispatch]
  );
  const columns = useMemo(
    () => [
      {
        field: 'slno',
        headerName: 'Sl no',
        maxWidth: 10,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: params => {
          return params.api.getRowIndex(params.row.candidate_id) + 1;
        },
        sortable: false,
        filterable: false,
      },
      {
        field: 'candidate_id',
        headerName: 'C Id',
        maxWidth: 30,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: renderCellExpand,
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
        minWidth: 200,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: renderCellExpand,
      },
      {
        field: 'phone',
        headerName: 'Contact number',
        minWidth: 100,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',

        renderCell: params => <span>{formatContactNumber(params?.value)}</span>,
      },
      {
        field: 'slug',
        headerName: 'Slug',
        minWidth: 80,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
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
              href={params.row.slug ? `/aspirant/${params.row.slug}` : ''}
              target="_blank"
              rel="noopener noreferrer"
            >
              {params.row.slug}
            </MuiLink>
          </>
        ),
      },
      {
        field: 'values',
        headerName: 'Status',
        headerClassName: 'super-app-theme--header',
        flex: 1,
        renderCell: params => (
          <>
            <TaggedStatusComponent
              value={taggedOrUntaggedEnum.get(
                params.row.tagged_status?.is_tagged
              )}
            />
          </>
        ),
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
            {params.row.tagged_status?.is_tagged && (
              <Tooltip title="Untag candidate" arrow placement="right">
                <IconButton
                  color="primary"
                  onClick={() => {
                    unTagCandidates(params.row);
                  }}
                  size="small"
                >
                  <CancelPresentationIcon
                    stroke={1.0}
                    size="1.0rem"
                    sx={{ fontSize: '1.3rem' }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </>
        ),
        editable: false,
      },
      {
        field: 'downloadAction',
        headerName: 'Download',
        minWidth: 150,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: params => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => downloadResume(params.row.candidate_id)}
            disabled={rowsStatus[params.row.candidate_id]?.loading}
          >
            Download Resume
          </Button>
        ),
      },
      {
        field: 'resumeLink',
        headerName: 'Resume Link',
        minWidth: 100,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: params => {
          const resumeUrls = rowsStatus[params.row.candidate_id]?.urls;
          const summaryUrl = resumeUrls?.summary;
          const resumeUrl = resumeUrls?.resume;

          return (
            <Stack direction={'column'} alignItems={'flex-start'}>
              {summaryUrl && (
                <Stack
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Link href={summaryUrl} target="_blank" rel="noopener">
                    {/* <LightbulbIcon style={{ marginRight: '8px' }} />  */}
                    AI Summary
                  </Link>
                </Stack>
              )}
              {resumeUrl && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Link href={resumeUrl} target="_blank" rel="noopener">
                    {/* <PersonIcon style={{ marginRight: '8px' }} /> */}
                    Candidate Resume
                  </Link>
                </div>
              )}
            </Stack>
          );
        },
      },
    ],
    [unTagCandidates, downloadResume, rowsStatus]
  );

  const [candidatesList, setCandidatesList] = useState({});

  return (
    <AdminLayout>
      <MainCard
        title="Candidate List"
        secondary={
          <Tooltip title="Add Candidate" arrow placement="right">
            <IconButton
              color="primary"
              onClick={() => {
                setIsAddCandidatePopupOpen(true);
                setAddCandidatePopupInfo();
              }}
            >
              <AddCircleOutlineRoundedIcon
                stroke={1.5}
                size="1.3rem"
                sx={{ fontSize: '2rem' }}
              />
            </IconButton>
          </Tooltip>
        }
      >
        <Box marginBottom={2}>
          <AdvancedCandidateSearchForm setCandidatesList={setCandidatesList} />
        </Box>
        <CustomDataGridMasters
          componentsProps={{
            NoRowsOverlay: () => (
              <CustomNoRowsOverlay title="No Candidates found" />
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
            rows: candidatesList,
            getRowId: row => row.candidate_id,
          }}
          loading={false}
        />
        <AddCandidatePopup
          isDialogOpened={isAddCandidatePopupOpen}
          handleCloseDialog={() => {
            setIsAddCandidatePopupOpen(false);
            setAddCandidatePopupInfo({});
          }}
          popUpInfo={addCandidatePopupInfo}
          candidatesGet={candidatesGet}
        />
        <CommonRejectPopup
          title="Reason for Un tagging a candidate"
          placeholder="Enter reason for untag"
          isDialogOpened={popupConfig.isOpen}
          handleCloseDialog={() =>
            setPopupConfig({ ...popupConfig, isOpen: false })
          }
          rejectReason={UntagReason}
          popupConfig={popupConfig}
        />
      </MainCard>
    </AdminLayout>
  );
};

export default CandidateSearch;
