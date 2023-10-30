import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import Title from '@/headingComponents/Title';
import AdvancedCandidateSearchForm from '@/reUsableComponents/CandidateSearch/AdvancedCandidateSearchForm';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import TaggedStatusComponent from '@/reUsableComponents/Status/TaggedStatusComponent';
import { UrlPaths } from '@/src/data/UrlPaths';
import { setAlertPopup } from '@/store/alertSlice';
import { JdAndTaggedCandidateApi, JobDescriptionApi } from '@/swagger_api/*';
import { formatContactNumber } from '@/utils/CommonFunctions/Functions';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { taggedOrUntaggedEnum } from '@/utils/enum';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMastersSelction } from '@/view/Datagrid';
import { Box, Link as MuiLink, Stack, useTheme } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

const MatchingProfileComponent = ({ role }) => {
  const theme = useTheme();
  const gridRef = useRef();
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const UrlBase =
    role === 'Admin' ? `${UrlPaths.adminJd}` : `${UrlPaths.clientJd}`;
  const [selectionModel, setSelectionModel] = useState([]);
  const [candidateList, setCandidateList] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState([]);

  var selectedRows = useMemo(
    () =>
      candidateList.filter(
        row =>
          selectionModel.includes(row.candidate_id) ||
          row.tagged_status?.is_tagged
      ),
    [candidateList, selectionModel]
  );
  console.log(selectedRows);

  const [jdData, setJdData] = useState(null);

  const jobDescriptionApi = useMemo(() => new JobDescriptionApi(), []);
  const jdAndTaggedCandidateApi = useMemo(
    () => new JdAndTaggedCandidateApi(),
    []
  );

  useEffect(() => {
    async function EditData(g) {
      setLoading(true);
      await jobDescriptionApi
        .apiJobDescriptionGetByGuidGuidGet(g)
        .then(async response => {
          setLoading(false);
          console.log(response?.body?.result);
          if (response?.body?.result) {
            setJdData(response?.body?.result);
          } else {
            setJdData(null);
          }
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
        });
    }
    if (router.query.guId) EditData(router.query.guId);
  }, [router.query.guId, jobDescriptionApi, setLoading]);

  useEffect(() => {
    setSelectedCandidate(selectedRows);
  }, [selectedRows]);

  const handleSelectionModelChange = newSelectionModel => {
    setSelectionModel(newSelectionModel);
  };
  const columns = [
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
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
      renderCell: renderCellExpand,
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
      field: 'phone',
      headerName: 'Contact Number',
      flex: 1,
      renderCell: params => <span>{formatContactNumber(params.value)}</span>,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
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
      field: 'slug',
      headerName: 'Slug',
      flex: 1,
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
    // {
    //   field: 'date',
    //   headerName: 'Date',
    //   flex: 1,
    // },
  ];

  const handleButtonClick = () => {
    console.log(candidateList, 'candidateList', selectionModel);
    const selectedData = candidateList.filter(row =>
      selectionModel.includes(row.candidate_id)
    );
    setSelectedCandidate(selectedData);
    console.log(selectedData, 'selectedData', jdData);
    const candidateObj = {
      userId: jdData?.clientId,
      jobDescriptionId: jdData?.id,
      candidateIds: selectedData.map(({ candidate_id }) => candidate_id),
    };
    console.log(candidateObj, 'candidateObj');
    tagCandidates(candidateObj);
  };

  const tagCandidates = async post => {
    const opts = {
      body: post,
    };
    const confirmDelete = async () => {
      try {
        const response =
          await jdAndTaggedCandidateApi.apiJdAndTaggedCandidatePost(opts);
        if (response.body.result) {
          dispatch(
            setAlertPopup({
              message: 'Candidates tagged successfully',
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
    const isPlural = post.candidateIds.length > 1;
    const message = `Would you like to send job tag request${
      isPlural ? `'s` : ''
    } to the selected candidate${isPlural ? 's' : ''}!`;

    showConfirmationDialog(
      'Are you sure?',
      message,
      confirmDelete,
      revertDelete
    );
  };

  return (
    <MainCard
      title={
        <TitleBackButton
          title={`Suggested Candidates for ${jdData?.title}`}
          onClick={() => router.back()}
        />
      }
    >
      <Title>{jdData?.title}</Title>
      <Box marginBottom={2}>
        <AdvancedCandidateSearchForm setCandidatesList={setCandidateList} />
      </Box>
      <Stack spacing={2}>
        <CustomDataGridMastersSelction
          componentsProps={{
            NoRowsOverlay: () => (
              <CustomNoRowsOverlay title={`There are no Candidates found`} />
            ),
          }}
          isRowSelectable={params => !params.row.tagged_status?.is_tagged}
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
            rows: candidateList,
            getRowId: row => row?.candidate_id,
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
              <ButtonText color="#fff">Tag Candidates</ButtonText>
            </ShadowButtonSubmit>
          )}
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default MatchingProfileComponent;
