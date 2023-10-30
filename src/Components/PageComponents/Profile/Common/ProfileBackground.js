import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { CandidateDocumentApi } from '@/swagger_api/*';
import {
  getAllowedExt,
  isValidFileType,
} from '@/utils/CommonFunctions/ImageDocVliadtion';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { useTheme } from '@emotion/react';
import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhotoIcon from '@mui/icons-material/Photo';
import SaveIcon from '@mui/icons-material/Save';
import {
  Avatar,
  Box,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Badge from '@mui/material/Badge';
import { Form, Formik, useField, useFormikContext } from 'formik';
import { useContext, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

import { setAlertPopup } from '@/store/alertSlice';

import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { useDispatch } from 'react-redux';

const INITIAL_FORM_STATE = {
  id: '',
  profileImage: '',
};
const FORM_VALIDATION = Yup.object().shape({
  profileImage: Yup.mixed()
    .test('is-valid-type', 'Not a valid image type', value =>
      isValidFileType(value && value.name.toLowerCase(), 'image')
    )
    .test(
      'is-valid-size',
      'Max allowed size is 2 mb',
      value => value && value.size <= 2097152
    ),
});

const backgroundImage1 = require('@/media/Profile/Image2.jpg');

const ProfileBackground = ({ edit }) => {
  const dispatch = useDispatch();
  const { loading, setLoading } = useContext(LoadingContext);
  const userDetails = localStorageUtil.getItem('userDetails');
  const theme = useTheme();
  const [readOnly, setReadOnly] = useState(false);
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);
  const data = context2 ? context2?.data : context1?.data;
  const image = '';
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    data ? data?.profileImage?.profileImageURL : image
  );
  const [imagePreviewUrlCopy, setImagePreviewUrlCopy] = useState(
    data ? data?.profileImage?.profileImageURL : image
  );
  const candidateDocumentApi = useMemo(() => new CandidateDocumentApi(), []);
  useEffect(() => {
    setImagePreviewUrl(data?.profileImage?.profileImageURL);
    setImagePreviewUrlCopy(data?.profileImage?.profileImageURL);
  }, [data]);

  function handleImageChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  }
  const handleSubmit = async (values, { resetForm }) => {
    // var profileImageDto = new CandidateProfileImageDto();
    setLoading(true);

    var candidateDocumentApi = new CandidateDocumentApi();
    const opts = {
      uploadedFile: values.profileImage, // values.profileImage should be the File object obtained from the input field
    };

    await candidateDocumentApi
      .apiCandidateDocumentUploadProfileImageCandidateIdPost(
        userDetails?.candidateId,
        opts
      )
      .then(async response => {
        setLoading(false);
        if (
          response.body.message === 'Updated Successfully.' ||
          response.body.message === 'File Upload Success'
        ) {
          dispatch(
            setAlertPopup({
              message: 'Profile Image Updated Successfully.',
              type: 'success',
              duration: 3000,
            })
          );
          setReadOnly(!readOnly);
          setImagePreviewUrl(response.body.result.profileImage.url);
        } else if (
          response.body.message === 'Updation Failed.' ||
          response.body.message === 'File Upload Failed.'
        ) {
          dispatch(
            setAlertPopup({
              message: 'Profile Image Update Failed!',
              type: 'error',
              duration: 3000,
            })
          );
        } else if (response.body.message === 'File Size Exceeded.') {
          dispatch(
            setAlertPopup({
              message: 'Upload image less than 2mb!',
              type: 'error',
              duration: 3000,
            })
          );
        } else if (response.body.message === 'File Type Invalid.') {
          dispatch(
            setAlertPopup({
              message: 'Upload image jpeg ,jpg or png images',
              type: 'error',
              duration: 3000,
            })
          );
        }
      })
      .catch(function (error) {
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
        setLoading(false);
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
  };
  const DeleteProfileImage = async () => {
    setLoading(true);
    const confirmDelete = async () => {
      try {
        const response =
          await candidateDocumentApi.apiCandidateDocumentDeleteProfileImageCandidateIdDelete(
            userDetails?.candidateId
          );
        setLoading(false);

        if (
          response.body.message === 'Deletion Failed.' ||
          response.body.message === 'No Record Found.'
        ) {
          dispatch(
            setAlertPopup({
              message: 'Profile Image Deletion Failed !',
              type: 'error',
              duration: 3000,
            })
          );
        } else if (response.body.message === 'Deleted Successfully.') {
          dispatch(
            setAlertPopup({
              message: 'Profile Image Deleted Successfully.',
              type: 'success',
              duration: 3000,
            })
          );
          setImagePreviewUrl('');
        }
      } catch (error) {
        setLoading(false);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
      }
    };
    const revertDelete = () => {
      dispatch(
        setAlertPopup({
          message: 'You have reverted the delete action',
          type: 'info',
          duration: 3000,
        })
      );
      setLoading(false);
    };
    showConfirmationDialog(
      'Are you sure?',
      'You want to delete this Profile Image!',
      confirmDelete,
      revertDelete
    );
  };

  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_STATE,
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={handleSubmit}
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
        resetForm,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Box
            sx={{
              height: 100,
              width: '100%',
              background: `linear-gradient(269.24deg, rgba(0, 0, 0, 0.2) 12.26%, rgba(0, 0, 0, 0) 92.42%), url(${backgroundImage1.default.src})`,
              backgroundSize: 'cover',
              borderRadius: '13px 13px 0px 0px',
              position: 'relative',
              mb: readOnly && edit ? 12 : 5,
            }}
          >
            <Box sx={{ position: 'absolute', top: '64%', left: '2%' }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <>
                    {edit && (
                      <IconButton
                        size="small"
                        sx={{ backgroundColor: '#ffffff' }}
                        disableRipple
                        onClick={() => {
                          if (readOnly) {
                            setReadOnly(false);
                            setImagePreviewUrl(imagePreviewUrlCopy);
                            // setImagePreviewUrl(image);
                            // if (values?.image?.url) setImagePreviewUrl(values.image.url);
                            resetForm();
                          } else {
                            setReadOnly(true);
                          }
                        }}
                      >
                        {readOnly ? (
                          <ClearIcon color="primary" />
                        ) : (
                          <EditIcon color="primary" />
                        )}
                      </IconButton>
                    )}
                  </>
                }
              >
                <Avatar
                  sizes="large"
                  alt="Profilebackground"
                  sx={{
                    bgcolor: 'white',
                    height: 62,
                    width: 62,
                    boxShadow: `6px -5px 0px 3px rgb(217 217 217 / 19%)`,
                  }}
                  src={imagePreviewUrl ? imagePreviewUrl : image}
                >
                  {data?.candidatePersonalData?.fullName?.slice(0, 2)}
                </Avatar>
              </Badge>
              {edit && readOnly && (
                <>
                  <Stack direction="row">
                    <RenderUploadButton
                      textLabel="Upload your college id"
                      inputName="profileImage"
                      fileType="image"
                      title="Upload photo"
                      handleImageChange={handleImageChange}
                    />
                    <IconButton
                      onClick={() => {
                        console.log('remove');
                        DeleteProfileImage();
                      }}
                      aria-label="delete"
                    >
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </Stack>
                </>
              )}
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileBackground;

const RenderUploadButton = ({
  errors,
  inputName,
  fileType,
  textLabel,
  title,
  handleImageChange,
  ...otherProps
}) => {
  let allowedExts = getAllowedExt(fileType);

  const { values, setFieldValue, handleSubmit } = useFormikContext();
  const [field, mata] = useField(inputName);

  return (
    <>
      <Stack direction="column" spacing={2}>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Stack direction="row">
            {values[inputName] ? (
              <IconButton
                disableRipple
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  id={inputName}
                  name={inputName}
                  type="file"
                  accept={allowedExts}
                  onChange={event => {
                    setFieldValue(inputName, event.currentTarget.files[0]);
                    handleImageChange(event);
                  }}
                />
                <Typography>Re-upload</Typography>
              </IconButton>
            ) : (
              <IconButton
                disableRipple
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  id={inputName}
                  name={inputName}
                  type="file"
                  accept={allowedExts}
                  onChange={event => {
                    setFieldValue(inputName, event.currentTarget.files[0]);
                    handleImageChange(event);
                  }}
                />
                {fileType === 'image' ? <PhotoIcon /> : <SaveIcon />}
                <Typography>{title}</Typography>
              </IconButton>
            )}
            <IconButton onClick={handleSubmit} aria-label="delete">
              <CloudUploadIcon color="primary" />
            </IconButton>
          </Stack>
          {mata.touched && mata.error && (
            <FormHelperText
              error
              id="standard-weight-helper-text-selectValuesId"
            >
              {mata.error}
            </FormHelperText>
          )}
        </Stack>
      </Stack>
    </>
  );
};
