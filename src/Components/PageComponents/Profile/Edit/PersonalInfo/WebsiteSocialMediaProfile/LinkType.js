import Textfield from '@/formComponents/FormsUI/Textfield';
import { ButtonText } from '@/pageComponents/Profile/Common/Properties/Properties';
import { CandidateWebsiteApi } from '@/swagger_api/*';
import { Button, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { setAlertPopup } from '@/store/alertSlice';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { urlRegExp } from '@/utils/regex';
import { Delete } from '@mui/icons-material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DoneIcon from '@mui/icons-material/Done';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { IconButton } from '@mui/material';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';

const INITIAL_FORM_STATE = {
  url: '',
  type: 'Link',
  websiteType: 1,
  candidateId: '123',
};

const FORM_VALIDATION = Yup.object().shape({
  url: Yup.string().required('URL is required').matches(urlRegExp, {
    message: 'Please provide a valid URL',
    excludeEmptyString: true,
  }),
});

const LinkType = ({
  readOnly,
  setReadOnly,
  urlFromApi,
  getCandidateWebsiteType,
}) => {
  const [showForm, setShowForm] = useState(false);
  const { loading, setLoading } = useContext(LoadingContext);
  const userDetails = localStorageUtil.getItem('userDetails');
  const [urls, setUrls] = useState(urlFromApi);
  const candidateWebsite = useMemo(() => new CandidateWebsiteApi(), []);
  const dispatch = useDispatch();

  useEffect(() => {
    setUrls(urlFromApi);
  }, [urlFromApi]);

  const toggleForm = () => setShowForm(!showForm);
  const handleAddUrl = async (values, actions) => {
    const opts = {
      body: {
        url: values.url,
        candidateId: userDetails?.candidateId,
        websiteType: 1,
      },
    };

    setLoading(true);

    try {
      const response = await candidateWebsite.apiCandidateWebsitePost(opts);
      setLoading(false);
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Website added successfully',
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
            message: 'Website updated successfully',
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
              message: 'Website deleted successfully',
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
      'You want to delete this Website URL!',
      confirmDelete,
      revertDelete
    );
  };

  const handleRemoveForm = () => {
    setShowForm(false);
  };

  return (
    <Stack spacing={2}>
      <ButtonText sx={{ textAlign: 'initial' }}>Websites</ButtonText>
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

      {urls.map((url, index) => (
        <Formik
          key={url.url}
          initialValues={{ ...url }}
          onSubmit={values => handleEditUrl(index, values)}
          validationSchema={FORM_VALIDATION}
        >
          {({ values, errors, touched }) => (
            <Form>
              <Stack sx={{ maxWidth: '500px' }} direction="row" spacing={2}>
                <Textfield
                  readOnly={readOnly}
                  name="url"
                  textLabel=""
                  otherProps={otherPropsRequired}
                />

                <Stack direction="row">
                  {!readOnly && (
                    <IconButton
                      disabled={readOnly}
                      type="submit"
                      color="primary"
                      disableRipple
                      size="large"
                      aria-label="back"
                    >
                      <DoneIcon />
                    </IconButton>
                  )}

                  {!readOnly && (
                    <IconButton
                      disabled={readOnly}
                      type="button"
                      disableRipple
                      size="large"
                      aria-label="back"
                      color="primary"
                      onClick={() => handleDeleteUrl(index, values)}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      ))}

      {showForm && (
        <Formik
          initialValues={INITIAL_FORM_STATE}
          onSubmit={handleAddUrl}
          validationSchema={FORM_VALIDATION}
        >
          {({ errors, touched }) => (
            <Form>
              <Stack direction="row" sx={{ maxWidth: '500px' }}>
                <Textfield
                  readOnly={readOnly}
                  name="url"
                  textLabel=""
                  otherProps={otherPropsRequired}
                />
                <Stack direction="row">
                  <IconButton
                    disabled={readOnly}
                    type="submit"
                    color="primary"
                    disableRipple
                    size="large"
                    aria-label="back"
                  >
                    <AddCircleRoundedIcon />
                  </IconButton>
                  <IconButton
                    disabled={readOnly}
                    type="button"
                    disableRipple
                    size="large"
                    aria-label="back"
                    color="primary"
                    onClick={handleRemoveForm}
                  >
                    <RemoveCircleRoundedIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      )}

      {!readOnly && !showForm && (
        <Stack direction="row" justifyContent={'flex-start'}>
          <Button
            sx={{ maxWidth: '250px', minWidth: '250px' }}
            disabled={readOnly}
            onClick={toggleForm}
          >
            {`${!showForm ? 'Add URL' : 'remove'}`}
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default LinkType;
