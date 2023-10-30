import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import ToggleButton from '@/buttonComponents/ToggleButton';
import Textfield from '@/formComponents/FormsUI/Textfield';
import { CommonImage } from '@/imageComponents/CommonImages';
import IMAGES from '@/imageComponents/ImagePaths';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { employmentStatusEnum } from '@/src/data/Enum';
import { setAlertPopup } from '@/store/alertSlice';
import {
  CandidateApi,
  CandidateHeadLineDto,
} from '@/swagger_api/api/CandidateApi';
import { convertDecimalToYearsAndMonths } from '@/utils/CommonFunctions/DateRelatedFunction';
import { formatUrl } from '@/utils/CommonFunctions/Functions';
import { convertToSentenceCase } from '@/utils/CommonFunctions/StringConversion';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { callApi } from '@/utils/apirequest';
import { nameValidationwithNoRegex } from '@/utils/validationSchema';
import { AddAPhotoRounded } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const FORM_VALIDATION = Yup.object().shape({
  profileHeadLine: nameValidationwithNoRegex('Profile Headline', true),
});

const ImageType = {
  1: IMAGES.Linkdin,
  2: IMAGES.TwitterIcon,
  3: IMAGES.Instagram,
  4: IMAGES.git,
  5: IMAGES.socialMedia,
};

const getImagePathById = id => {
  return ImageType[id] ? ImageType[id] : null;
};

const Header = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1A1A1A',
  fontWeight: '700',
  fontSize: '24px',
  wordBreak: 'break-word',
  lineHeight: '36.25px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '29px',
  },
}));

const HeaderLine = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#434343',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '31.91px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: '25.3px',
  },
}));

const DesignationLocation = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#6A6A6A',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '16.8px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
    lineHeight: '12px',
  },
}));

const IconText = ({ icon, text }) => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {icon}
      <DesignationLocation>{text}</DesignationLocation>
    </Stack>
  );
};

const ProfileInfo = ({ profileDetails, edit, publicView }) => {
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);
  const dispatch = useDispatch();
  const data = context2 ? context2?.data : context1?.data;
  const router = useRouter();
  const [urlData, setUrlData] = useState(null);
  const userDetails = localStorageUtil.getItem('userDetails');
  const [candidatePersonalData, setCandidatePersonalData] = useState(
    data?.candidatePersonalData
  );
  const [normalization, setNormalization] = useState(data?.normalizationStatus);
  const [initialValues, setInitialValues] = useState({
    profileHeadLine: '',
  });
  const theme = useTheme();
  const [readOnly, setReadOnly] = useState(true);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // adjust breakpoint as needed
  const imageSize = isSmallScreen ? '20px' : '30px';
  const { loading, setLoading } = useContext(LoadingContext);
  useEffect(() => {
    setCandidatePersonalData(data?.candidatePersonalData);
    setNormalization(data?.normalizationStatus);
    setInitialValues({
      profileHeadLine: data?.profileHeadLine?.profileHeadLine,
    });
  }, [data]);

  const SubmitDetails = async values => {
    console.log(values);
    setReadOnly(true);
    updateProfileHeader({
      candidateId: userDetails?.candidateId,
      profileHeadLine: values.profileHeadLine,
    });
  };
  var profile = new CandidateHeadLineDto();
  async function updateProfileHeader(n) {
    setLoading(true);
    const k = new CandidateApi();
    const opts = {};
    profile = {
      candidateId: n.candidateId,
      profileHeadLine: n.profileHeadLine,
    };
    opts.body = profile;
    await k
      .apiCandidateUpdateProfileHeadLinePost(opts)
      .then(async response => {
        setLoading(false);
        setInitialValues(prevState => ({
          ...prevState,
          profileHeadLine: response.body.result.profileHeadLine,
        }));

        if (response.body.message === 'Updated Successfully.') {
          dispatch(
            setAlertPopup({
              message: 'Profile head line updated successfully',
              type: 'success',
              duration: 3000,
            })
          );
        } else if (response.body.message === 'Already Exists.') {
          dispatch(
            setAlertPopup({
              message: 'Profile head line already exists!',
              type: 'error',
              duration: 3000,
            })
          );
        } else if (response.body.message === 'Updation Failed.') {
          dispatch(
            setAlertPopup({
              message: 'Profile headline updation failed!',
              type: 'error',
              duration: 3000,
            })
          );
        }
      })
      .catch(function (error) {
        setLoading(false);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }
  const downloadResume = useCallback(async () => {
    const confirmDownload = async () => {
      try {
        setLoading(true);
        const data = {
          candidate_id: userDetails?.candidateId,
          isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
        };
        const response = await callApi('resumeDownload', data);
        if (response.status === 200) {
          if (response.data && response.data.status === 'success') {
            setUrlData(response.data.urls);
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
      'Action Required',
      'Ensure all data is filled before downloading, or the resume might be incomplete.',
      confirmDownload,
      revertDownload
    );
  }, [setLoading, dispatch, userDetails]);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems={'center'}>
      <Stack spacing={2}>
        <Header>
          {/* {`${
            [
              candidatePersonalData?.firstName,
              candidatePersonalData?.middleName,
              candidatePersonalData?.lastName,
            ]
              .filter(Boolean)
              .join(' ') || '-'
          }`} */}
          {candidatePersonalData?.fullName}
        </Header>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          {readOnly && (
            <HeaderLine>
              <span style={{ fontWeight: '700' }}>
                {initialValues.profileHeadLine
                  ? initialValues.profileHeadLine
                  : '-'}
              </span>
            </HeaderLine>
          )}
          {edit && readOnly && (
            <IconButton
              color="primary"
              disableRipple
              size="small"
              aria-label="back"
              sx={{ p: 0 }}
              onClick={() => {
                setReadOnly(false);
              }}
            >
              <EditIcon fontSize="12px" />
            </IconButton>
          )}
        </Stack>

        {!readOnly && (
          <Formik
            enableReinitialize
            initialValues={{
              ...initialValues,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values, { resetForm }) =>
              SubmitDetails(values, { resetForm })
            }
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
              formik,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <Grid
                    sx={{ maxWidth: '550px' }}
                    container
                    spacing={{ xs: 2, sm: 2, md: 2 }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <Textfield
                        readOnly={readOnly}
                        name="profileHeadLine"
                        textLabelStyle={textLabel}
                        textLabel="Profile Headline"
                        otherProps={otherPropsRequired}
                      />
                    </Grid>
                  </Grid>

                  <ShadowButtonSubmit
                    height="50px"
                    width="100%"
                    minwidth="250px"
                    maxwidth="250px"
                    backgroundcolor="#A62973"
                    onClick={handleSubmit}
                  >
                    <ButtonText color="#fff">Update</ButtonText>
                  </ShadowButtonSubmit>
                </Stack>
              </Form>
            )}
          </Formik>
        )}

        <Stack spacing={1} direction={'column'} minWidth={230}>
          <Grid
            container
            justifyContent={'center'}
            alignItems={'center'}
            spacing={{ xs: 1 }}
          >
            <Grid item xs={6} md={6}>
              <IconText
                icon={<PersonIcon fontSize="20px" />}
                text={
                  employmentStatusEnum[
                    candidatePersonalData?.employmentStatus
                      ? candidatePersonalData?.employmentStatus
                      : 0
                  ]
                }
              />
            </Grid>

            <Grid item xs={6} md={6}>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <DesignationLocation>Exp :</DesignationLocation>
                <DesignationLocation>
                  {`${convertDecimalToYearsAndMonths(
                    candidatePersonalData?.totalExperienceInYears || ''
                  )}` || '-'}
                </DesignationLocation>
              </Stack>
            </Grid>
          </Grid>

          <IconText
            icon={<LocationOnIcon fontSize="20px" />}
            text={`${data?.candidateAddress?.city ?? ''},${
              data?.candidateAddress?.state ?? ''
            },${data?.candidateAddress?.country ?? ''} `}
          />
        </Stack>
      </Stack>
      {edit && (
        <Stack
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          spacing={2}
        >
          <Link
            style={{ textDecoration: 'none' }}
            target={'_blank'}
            href={`/aspirant/${
              userDetails?.candidate?.slug ? userDetails?.candidate?.slug : ''
            }`}
          >
            View Public Profile
          </Link>
          <Stack
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={downloadResume}
              disabled={loading}
            >
              Download Your Resume
            </Button>

            {urlData && (
              <Stack direction={'column'} spacing={1}>
                <Link href={urlData.summary} target="_blank" rel="noopener">
                  View AI Summary
                </Link>
                <Link href={urlData.resume} target="_blank" rel="noopener">
                  View Full Resume
                </Link>
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
      {!edit && (
        <Stack direction="column" spacing={3}>
          <Stack direction={'row'} spacing={1}>
            {data &&
              data?.socialMediaWebsites?.map((values, index) => (
                <CustomLink
                  target="_blank"
                  href={values.url}
                  key={values.id}
                  passHref
                >
                  <CommonImage
                    key={values.id}
                    src={ImageType[values.socialMediaType]}
                    alt={values.name || 'name'}
                    style={{
                      cursor: 'pointer',
                      height: imageSize,
                      width: imageSize,
                    }}
                  />
                </CustomLink>
              ))}
          </Stack>

          {publicView ? null : (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <ToggleButton
                onPress={() => {
                  router.push('/profile/editprofile');
                  //after go live
                  // if (!normalization.isResumeUploaded) {
                  //   router.push('/profile/editprofile');
                  // } else if (
                  //   normalization.isResumeUploaded &&
                  //   normalization.skillNormalizationStatus != 0 &&
                  //   normalization.projectNormalizationStatus != 0
                  // ) {
                  //   router.push('/profile/editprofile');
                  // } else {
                  //   dispatch(
                  //     setAlertPopup({
                  //       message: 'Your resume is still extracting please wait',
                  //       type: 'warning',
                  //       duration: 3000,
                  //     })
                  //   );
                  // }
                }}
                border={theme.palette.primary.main}
                backgroundColor={theme.palette.primary.main}
                buttonProps={{ endIcon: <AddAPhotoRounded /> }}
                endIcon={<AddAPhotoRounded />}
              >
                Edit profile
              </ToggleButton>
              {/* <Button startIcon={<ShareOutlined />}>share</Button> */}
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default ProfileInfo;

function CustomLink({ href, ...rest }) {
  const router = useRouter();

  // Use the `url.parse` method to parse the href value and get the hostname

  // If the href hostname starts with "www.", treat the URL as external

  // Otherwise, use the regular `Link` component
  return <Link href={formatUrl(href)} {...rest} />;
}
