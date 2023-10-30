import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import Title from '@/headingComponents/Title';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import TaggedStatusComponent from '@/reUsableComponents/Status/TaggedStatusComponent';
import { UrlPaths } from '@/src/data/UrlPaths';
import { setAlertPopup } from '@/store/alertSlice';
import { JdAndTaggedCandidateApi, JobDescriptionApi } from '@/swagger_api/*';
import { formatContactNumber } from '@/utils/CommonFunctions/Functions';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { callApi } from '@/utils/apirequest';
import { taggedOrUntaggedEnum } from '@/utils/enum';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMastersSelction } from '@/view/Datagrid';
import { Link as MuiLink, Stack, useTheme } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';

const AutoMatchingProfileComponent = ({ role }) => {
  const theme = useTheme();
  const gridRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, setLoading } = useContext(LoadingContext);
  const UrlBase =
    role === 'Admin' ? `${UrlPaths.adminJd}` : `${UrlPaths.clientJd}`;
  const [selectionModel, setSelectionModel] = useState([]);
  const [candidateList, setCandidateList] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState([]);
  var selectedRows = useMemo(
    () =>
      candidateList.filter(row => selectionModel.includes(row.candidate_id)),
    [candidateList, selectionModel]
  );
  const [jdData, setJdData] = useState(null);

  const jobDescriptionApi = useMemo(() => new JobDescriptionApi(), []);
  const jdAndTaggedCandidateApi = useMemo(
    () => new JdAndTaggedCandidateApi(),
    []
  );

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
      // renderCell: params => (
      //   <>
      //     {[params.row?.firstName, params.row?.middleName, params.row?.lastName]
      //       .filter(Boolean)
      //       .join(' ') || params.row?.name}
      //   </>
      // ),
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
  ];

  const getCandidateAutoSearch = useCallback(
    async dataSearch => {
      setLoading(true);
      try {
        const response =
          await jobDescriptionApi.apiJobDescriptionJdCandidatesAutoSearchPost(
            dataSearch
          );
        setLoading(false);
        if (response?.body?.result && response?.body?.result?.length > 0) {
          const trim =
            response?.body?.result?.map((res, index) => ({
              slno: index + 1,
              id: index + 1,
              ...res,
              contactNumber: res?.contact,
              phone: res?.contact,
              name: res?.name,
            })) || [];
          console.log('values', trim);

          setCandidateList(trim);
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
        setCandidateList([]);
      }
    },
    [jobDescriptionApi, setLoading]
  );
  const CandidateList = useCallback(
    async values => {
      console.log(values);
      setLoading(true);
      try {
        setLoading(true);
        const data = {
          ...values,
          isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
          // isprod: true,
        };
        const response = await callApi('SearchApi', data);
        console.log(response, 'response');
        setLoading(false);
        if (response.data.status === 'success') {
          console.log(response.data.CandidateSearchResults);
          setCandidateList(
            response.data.CandidateSearchResults.all_candidates || []
          );
        } else {
          dispatch(
            setAlertPopup({
              message: 'Something went wrong. Please try again!',
              type: 'error',
              duration: 3000,
            })
          );
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong. Please try again!',
            type: 'error',
            duration: 3000,
          })
        );
      } finally {
        setLoading(false);
      }
    },
    [dispatch, setLoading]
  );

  const getJdData = useCallback(
    async guid => {
      setLoading(true);
      try {
        const response =
          await jobDescriptionApi.apiJobDescriptionGetByGuidGuidGet(guid);
        if (response?.body?.result) {
          const trim = response?.body?.result || {};
          setJdData(trim);
          console.log(trim, 'jdData');
          const Skills = trim?.jdSkills?.flatMap(skill =>
            skill.jdSkillPlatforms
              // Filter must_have platforms
              .map(platform => ({
                name: platform.name,
                expertise: platform.skillLevel,
                must_have: platform.skillType === 1,
              }))
          );
          const locations = trim?.jobLocation.map(location => {
            const cityName = location.cityName.split(',')[0];
            return cityName;
          });
          const concatenatedLocations = locations.join(', ');
          const dataForSearch = {
            skills: Skills,
            all_match: false,
            isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
            years_from_to: [
              trim?.maximumExperienceInYears || 0,
              trim?.minimumExperienceInYears || 1000,
            ],
            location: concatenatedLocations,
          };
          // const match = {
          //   search_string: '918123859520',
          //   all_match: false,
          //   isprod: true,
          // };

          const cleanedPayload = Object.fromEntries(
            Object.entries(dataForSearch).filter(([key, value]) =>
              Array.isArray(value)
                ? value.some(item => item !== '' && item !== null)
                : value !== '' && value !== null && value !== undefined
            )
          );

          CandidateList(cleanedPayload);
        }
      } catch (err) {
        console.log(err);
        setJdData([]);
      } finally {
        setLoading(false); // Stop loading
      }
    },
    [jobDescriptionApi, CandidateList, setLoading]
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
    const selectedData = candidateList.filter(row =>
      selectionModel.includes(row.candidate_id)
    );
    setSelectedCandidate(selectedData);
    const candidateObj = {
      userId: jdData?.clientId, // client id should be there
      jobDescriptionId: jdData?.id,
      candidateIds: selectedData.map(({ candidate_id }) => candidate_id),
    };
    console.log(candidateObj);
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
          title={`Auto Suggested Candidates for ${jdData?.title}`}
          onClick={() => router.back()}
        />
      }
    >
      <Title>{jdData?.title}</Title>
      <Stack spacing={2}>
        <CustomDataGridMastersSelction
          componentsProps={{
            NoRowsOverlay: () => (
              <CustomNoRowsOverlay title={`There are no Candidates found`} />
            ),
          }}
          isRowSelectable={params => !params.row.isAttachedtoJD}
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

export default AutoMatchingProfileComponent;
