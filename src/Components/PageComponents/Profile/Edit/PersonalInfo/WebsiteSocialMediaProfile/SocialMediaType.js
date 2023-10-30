import SelectWrapper from '@/formComponents/FormsUI/Select';
import Textfield from '@/formComponents/FormsUI/Textfield';
import { ButtonText } from '@/pageComponents/Profile/Common/Properties/Properties';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { socialMediaTypeOptions } from '@/src/data/DropDownValues';
import { setAlertPopup } from '@/store/alertSlice';
import { CandidateWebsiteApi } from '@/swagger_api/*';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { urlRegExp } from '@/utils/regex';
import { Button, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  url: '',
  type: 'Link',
  websiteType: 1,
  candidateId: '123',
  socialMediaType: '',
};

const FORM_VALIDATION = Yup.object().shape({
  url: Yup.string().required('URL is required').matches(urlRegExp, {
    message: 'Please provide a valid URL',
    excludeEmptyString: true,
  }),

  socialMediaType: Yup.number().required('Social Media is required'),
});

const SocialMediaType = ({
  readOnly,
  setReadOnly,
  urlFromApi,
  getCandidateWebsiteType,
}) => {
  const userDetails = localStorageUtil.getItem('userDetails');

  const [socialMediaTypeOptionsState, setSocialMediaTypeOptionsState] =
    useState([
      { id: 1, value: 1, name: 'LinkedIn' },
      { id: 2, value: 2, name: 'Twitter' },
      { id: 3, value: 3, name: 'Instagram' },
      { id: 4, value: 4, name: 'GitHub' },
      { id: 5, value: 5, name: 'Other' },
    ]);

  const [showForm, setShowForm] = useState(false);
  const { setLoading } = useContext(LoadingContext);
  const [urls, setUrls] = useState(urlFromApi);

  const candidateWebsite = useMemo(() => new CandidateWebsiteApi(), []);
  const dispatch = useDispatch();

  useEffect(() => {
    setUrls(urlFromApi);
  }, [urlFromApi]);

  const toggleForm = () => setShowForm(!showForm);
  const handleAddUrl = async (values, actions) => {
    setUrls([...urls, { ...values }]);
    const opts = {
      body: {
        socialMediaType: values.socialMediaType,
        url: values.url,
        candidateId: userDetails?.candidateId,
        websiteType: 2,
      },
    };

    setLoading(true);

    try {
      const response = await candidateWebsite.apiCandidateWebsitePost(opts);
      setLoading(false);
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Social Media added successfully',
            type: 'success',
            duration: 3000,
          })
        );
        getCandidateWebsiteType();
      } else {
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
      console.log('post', response);
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
    actions.resetForm();
    toggleForm();
  };

  const handleEditUrl = async (index, values) => {
    const opts = { body: values };

    setLoading(true);
    try {
      const response = await candidateWebsite.apiCandidateWebsitePut(opts);
      setLoading(false);
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Social Media updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        getCandidateWebsiteType();
      } else {
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
      console.log('post', response);
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

  const handleDeleteUrl = async (index, values) => {
    console.log(values);
    setLoading(true);

    const confirmDelete = async () => {
      try {
        const response = await candidateWebsite.apiCandidateWebsiteIdDelete(
          values.id
        );
        setLoading(false);

        if (response.body.result) {
          dispatch(
            setAlertPopup({
              message: 'Social Media deleted successfully',
              type: 'success',
              duration: 3000,
            })
          );
          getCandidateWebsiteType();
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
      'You want to delete this Social Media URL!',
      confirmDelete,
      revertDelete
    );
  };

  const handleRemoveForm = () => {
    setShowForm(false);
  };

  const filteredOptions = socialMediaTypeOptionsState.filter(option => {
    return !urlFromApi.some(url => url.socialMediaType === option.value);
  });

  // useEffect(() => {
  //   const filteredSocialMediaTypeOptions = socialMediaTypeOptionsState.filter(option => {
  //     return !urls.some(url => url.socialMediaType === option.value);
  //   });
  //   console.log(socialMediaTypeOptionsState);
  //   console.log(urlFromApi);

  //   setSocialMediaTypeOptionsState(filteredSocialMediaTypeOptions);
  // }, [urls]);

  return (
    <Stack spacing={2}>
      <ButtonText sx={{ textAlign: 'initial' }}>Social Media</ButtonText>
      {urls.length === 0 && (
        <ButtonText
          sx={{ textAlign: 'initial' }}
          weight="300"
          size="14px"
          sizesmall="12px"
        >
          As of now, no URLs has been added
        </ButtonText>
      )}
      <Stack spacing={2}>
        {urls.map((url, index) => (
          <Formik
            key={url.url}
            initialValues={{ ...url }}
            onSubmit={values => handleEditUrl(index, values)}
            validationSchema={FORM_VALIDATION}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <Stack sx={{ maxWidth: '300px' }} spacing={0}>
                  <Textfield
                    readOnly={readOnly}
                    name="url"
                    textLabel=""
                    otherProps={otherPropsRequired}
                  />
                  <SelectWrapper
                    readOnly={true}
                    textLabelStyle={textLabel}
                    name="socialMediaType"
                    options={socialMediaTypeOptions}
                    placeholder="Select Social Media"
                    inputProps={otherPropsNotRequired}
                  />
                  <Stack direction="row">
                    {!readOnly && (
                      <Button disabled={readOnly} type="submit">
                        Update
                      </Button>
                    )}

                    {!readOnly && (
                      <Button
                        disabled={readOnly}
                        type="button"
                        onClick={() => handleDeleteUrl(index, values)}
                      >
                        Delete
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        ))}
      </Stack>
      {!readOnly &&
        socialMediaTypeOptionsState.length > 0 &&
        urls.length < 5 &&
        !showForm && (
          <Button sx={{ maxWidth: '250px' }} onClick={toggleForm}>
            {`${!showForm ? 'Add' : 'remove'}`} URL
          </Button>
        )}

      {socialMediaTypeOptionsState.length > 0 && (
        <>
          {showForm && (
            <Formik
              initialValues={INITIAL_FORM_STATE}
              onSubmit={handleAddUrl}
              validationSchema={FORM_VALIDATION}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <Stack sx={{ maxWidth: '300px' }} spacing={1}>
                    <Textfield
                      readOnly={readOnly}
                      name="url"
                      textLabel="URL"
                      otherProps={otherPropsRequired}
                    />
                    <SelectWrapper
                      readOnly={readOnly}
                      textLabelStyle={textLabel}
                      name="socialMediaType"
                      textLabel="Social Media"
                      options={filteredOptions}
                      placeholder="Select Social Media"
                      inputProps={otherPropsRequired}
                    />

                    <Stack direction="row">
                      <Button type="submit">Add</Button>
                      <Button type="button" onClick={handleRemoveForm}>
                        Remove
                      </Button>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          )}
        </>
      )}
    </Stack>
  );
};

export default SocialMediaType;
