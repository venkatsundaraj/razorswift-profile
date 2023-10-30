import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import MainCard from '@/cardComponents/MainCard';
import Title from '@/headingComponents/Title';
import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import { setAlertPopup } from '@/store/alertSlice';
import {
  CandidateApi,
  JdAndTaggedCandidateApi,
  JobDescriptionApi,
} from '@/swagger_api/*';
import { CustomDataGridMastersSelction } from '@/view/Datagrid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

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

const MatchingProfile = () => {
  const theme = useTheme();
  const gridRef = useRef();
  const router = useRouter();

  const dispatch = useDispatch();
  const colors = theme.palette;
  const [selectionModel, setSelectionModel] = useState([]);
  const [candidateList, setCandidateList] = useState([]);
  const candidateApi = useMemo(() => new CandidateApi(), []);
  const [selectedCandidate, setSelectedCandidate] = useState([]);
  var selectedRows = useMemo(
    () => candidateList.filter(row => selectionModel.includes(row.id)),
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
      await jobDescriptionApi
        .apiJobDescriptionGetByGuidGuidGet(g)
        .then(async response => {
          console.log(response?.body?.result);
          if (response.body.message === 'Record Fetched Successfully.') {
            setJdData(response?.body?.result);
          } else {
            setJdData(null);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (router.query.guId) EditData(router.query.guId);
  }, [router.query.guId, jobDescriptionApi]);

  useEffect(() => {
    setSelectedCandidate(selectedRows);
  }, [selectedRows]);

  const getCandidateList = useCallback(async () => {
    try {
      const response = await candidateApi.apiCandidateGet();
      if (response.body.message === 'Records Fetched Successfully.') {
        const trim = response?.body?.result?.map((res, index) => ({
          slno: index + 1,
          id: index + 1,
          ...res,
        }));
        console.log('trim', trim);
        // setCandidateList(prevState => ({
        //   ...prevState,
        //   rows: trim,
        // }));
        setCandidateList(trim);
      } else if (response.body.message === 'No Records Found.') {
        setCandidateList([]);
      }
    } catch (err) {
      console.log(err);
      setCandidateList([]);
    }
  }, [candidateApi]);

  useEffect(() => {
    getCandidateList();
  }, [getCandidateList]);

  const handleSelectionModelChange = newSelectionModel => {
    setSelectionModel(newSelectionModel);
  };
  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
      renderCell: params => (
        <>
          {/* {[params.row?.firstName, params.row?.middleName, params.row?.lastName]
            .filter(Boolean)
            .join(' ')} */}
          {params.row?.fullName}
        </>
      ),
    },
    {
      field: 'contactNumber',
      headerName: 'Contact Number',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
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
    const selectedData = candidateList.filter(row =>
      selectionModel.includes(row.id)
    );
    setSelectedCandidate(selectedData);
    const candidateObj = {
      userId: jdData?.clientId,
      jobDescriptionId: jdData?.id,
      candidateIds: selectedData.map(({ id }) => id),
    };
    console.log(candidateObj);
    tagCandidates(candidateObj);

    // router.push({
    //   pathname: `/client/jobs/view`,
    //   query: { guId: router.query.guId },
    // });
  };

  const tagCandidates = async post => {
    const opts = {
      body: post,
    };
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Would you like to send a job tag request to potential candidates!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'blue',
        cancelButtonColor: 'grey',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
        allowOutsideClick: false,
      });

      if (result.isConfirmed) {
        const response =
          await jdAndTaggedCandidateApi.apiJdAndTaggedCandidatePost(opts);
        if (response.body.message === 'Created Successfully.') {
          dispatch(
            setAlertPopup({
              message: 'Candidates tagged successfully',
              type: 'success',
              duration: 3000,
            })
          );
          router.push({
            pathname: `/admin/jobs/view`,
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        dispatch(
          setAlertPopup({
            message: 'You have reverted the tag action',
            type: 'info',
            duration: 3000,
          })
        );
      }
    } catch (error) {
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
    <ClientLayout>
      <Box m="20px">
        ${jdData?.title}
        <MainCard title={`Suggested Candidates for ${jdData?.title}`}>
          <Stack direction="row" spacing={1}>
            <IconButton
              disableRipple
              sx={{
                padding: 0,
                paddingLeft: 0.1,

                color: '#121212',
                margin: 0,
              }}
              size="large"
              aria-label="back"
              onClick={() => router.back()}
            >
              <ArrowBackIcon />
            </IconButton>
            <Title>{jdData?.title}</Title>
          </Stack>
          <Stack spacing={2}>
            <CustomDataGridMastersSelction
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
      </Box>
    </ClientLayout>
  );
};

export default MatchingProfile;
