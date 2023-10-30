import ProfileLayout from '@/layouts/ProfileLayout';
import Navbar from '@/navigationComponents/Navbar';
import AssessmentForm from '@/pageComponents/Assessment/AssessmentForm';
import CandidateAssessmentList from '@/pageComponents/Assessment/CandidateAssessmentList';
import ProfileBackground from '@/pageComponents/Profile/Common/ProfileBackground';
import RightBar from '@/pageComponents/Profile/RightBar';
import { DataProvider } from '@/reUsableComponents/DataContext/DataContext';
import { setAlertPopup } from '@/store/alertSlice';
import { callApi } from '@/utils/apirequest';
import { Container, Stack } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import CandidateAssessmentAllList from '@/pageComponents/Assessment/CandidateAssessmentAllList';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { Typography, styled } from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const toggleSolutionsButtonArray = [
  { id: 1, value: 'Self Assessment', type: 'AL' },
  { id: 2, value: 'Request', type: 'RL' },
  { id: 3, value: 'Jobs Assessment', type: 'JdAL' },
];

const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  '&.MuiToggleButton-root , &.MuiToggleButton-root:hover': {
    color: '#000000',
    height: '43.6px',
    borderColor: '#DDDDDD',
    border: '3px solid #DDDDDD',
    borderRadius: '100px !important',
    backgroundColor: 'white',
    mx: 2,
    border: '2px solid #DDDDDD !important',
    justifyContent: 'center',
    alignItems: 'center',

    maxWidth: '240px',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '21.6px',
    [theme.breakpoints.down('sm')]: {
      height: '34.84px',
      fontWeight: '500',
      fontSize: '11px',
      lineHeight: '15px',
      maxWidth: '124px',
    },
  },
  '&.Mui-selected, &.Mui-selected:hover': {
    color: '#ffffff',
    backgroundColor: '#1D1D1D',
    borderRadius: '100px !important',
    mx: 2,
    border: `2px solid ${'black'} !important`,
    maxWidth: '240px',
    fontWeight: '600',
    [theme.breakpoints.down('sm')]: {
      height: '34.84px',
      maxWidth: '103px',
      fontWeight: '600',
      fontSize: '12px',
      lineHeight: '15px',
    },
  },
}));

const ToggleButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: 'inherit',
  fontSize: '16px',
  fontWeight: '700',
  textAlign: 'center',
  lineHeight: '18.96px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: '14.01px',
  },
}));

const Assessment = () => {
  const dispatch = useDispatch();
  const userDetails = useMemo(
    () => localStorageUtil.getItem('userDetails'),
    []
  );
  const [type, setType] = useState('AL');
  const [candidateAssessmentList, setCandidateAssessmentList] = useState([]);
  const [candidateAssessmentRequestList, setCandidateAssessmentRequestList] =
    useState([]);
  const [alignment, setAlignment] = useState(
    toggleSolutionsButtonArray[0].value
  );
  const [component, setComponent] = useState(null);

  useEffect(() => {
    getAssessmentList();
  }, []);
  const getAssessmentList = () => {
    CandidateAssessmentListApi();
    CandidateAssessmentRequestListApi();
  };

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      console.log(alignment, newAlignment);
      // setAlignment(newAlignment.value);
      setType(newAlignment.type);
    }
  };

  useEffect(() => {
    const alignmentObj = toggleSolutionsButtonArray.find(
      obj => obj.type === type
    );
    if (alignmentObj) {
      setAlignment(alignmentObj.value);
    }
  }, [type]);

  const CandidateAssessmentListApi = () => {
    const data = {
      isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
      data: { cid: userDetails?.candidateId },
    };
    callApi('ListCandidateAssessment', data)
      .then(response => {
        console.log(response.data.data, 'ListCandidateAssessment');
        if (response.data.status === 200) {
          setCandidateAssessmentList(response.data.data);
          setComponent(
            <CandidateAssessmentList
              candidateAssessmentList={response.data.data}
            />
          );
        } else {
          setComponent(
            <CandidateAssessmentList
              candidateAssessmentList={candidateAssessmentList}
            />
          );
          dispatch(
            setAlertPopup({
              message: 'Something went wrong Please try Again !',
              type: 'error',
              duration: 3000,
            })
          );
        }
      })
      .catch(err => {
        setComponent(
          <CandidateAssessmentList
            candidateAssessmentList={candidateAssessmentList}
          />
        );
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
  const CandidateAssessmentRequestListApi = () => {
    const data = {
      isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
      data: { cid: [userDetails?.candidateId] },
    };
    callApi('ListCandidateRequest', data)
      .then(response => {
        console.log(response, 'ListCandidateRequest');
        if (response?.data?.status === 200) {
          setCandidateAssessmentRequestList(response?.data?.data);
        } else {
          dispatch(
            setAlertPopup({
              message: 'Something went wrong Please try Again !',
              type: 'error',
              duration: 3000,
            })
          );
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

  useEffect(() => {}, []);
  return (
    <DataProvider>
      <Container maxWidth="xl" disableGutters>
        <Navbar />
        <ProfileLayout
          viewBar={true}
          rightComponent={
            <RightBar>
              <ProfileBackground />
              <Container>
                <Stack spacing={3}>
                  {/* <ProfileInfo /> */}

                  <AssessmentForm setType={setType} />
                  <Typography variant="h3" mb={2} align="left">
                    List
                  </Typography>

                  <Stack
                    alignItems={'center'}
                    direction="row"
                    justifyContent={'center'}
                    spacing={2}
                  >
                    {toggleSolutionsButtonArray.map((values, index) => (
                      <ToggleButton
                        fullWidth
                        key={values.id}
                        selected={values.value === alignment}
                        value={values.value}
                        onClick={(e, value) => handleChange(e, values)}
                        // onChange={(e, value) => handleChangeSwiper(e, values)}
                      >
                        <ToggleButtonText>{values.value}</ToggleButtonText>
                      </ToggleButton>
                    ))}
                  </Stack>
                  <CandidateAssessmentAllList type={type} />
                </Stack>
              </Container>
            </RightBar>
          }
        />
      </Container>
    </DataProvider>
  );
};

export default Assessment;
