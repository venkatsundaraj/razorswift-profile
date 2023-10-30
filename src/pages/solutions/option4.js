import Textfield from '@/formComponents/FormsUI/Textfield';
import {
  ButtonText,
  otherProps,
} from '@/pageComponents/Profile/Common/Properties/Properties';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { CandidateWebsiteApi } from '@/swagger_api/*';
import { Button, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  url: '',
  type: 'Link',
  websiteType: 1,
  candidateId: '123',
};

const FORM_VALIDATION = Yup.object().shape({
  url: Yup.string().url('Invalid URL format').required('URL is required'),
});

const UrlForm = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={FORM_VALIDATION}
  >
    {({ values, errors, touched }) => (
      <Form>
        <Stack sx={{ maxWidth: '300px' }} spacing={2}>
          <Textfield readOnly={values.readOnly} name="url" textLabel="" />
          <Stack direction="row">
            <Button type="submit">Update</Button>
            <Button type="button" onClick={values.onDelete}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Form>
    )}
  </Formik>
);

const Option4 = ({ readOnly, setReadOnly, urlFromApi }) => {
  const [showForm, setShowForm] = useState(false);
  const { loading, setLoading } = useContext(LoadingContext);
  const candidateWebsite = new CandidateWebsiteApi();
  const [urls, setUrls] = useState([]);

  const getCandidateWebsiteType = async () => {
    setLoading(true);
    await candidateWebsite
      .apiCandidateWebsiteGetAllByWebsiteTypeCandidateidGet(22)
      .then(async response => {
        setLoading(false);

        if (
          response.body.message === 'Records Fetched Successfully.' ||
          response.body.message === 'Record Fetched Successfully.'
        ) {
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Successful',
          //   text: 'Records Fetched Successfully.',
          // });
          setUrls(response.body.result.filter(url => url.websiteType === 1));
        } else {
          Swal.fire({
            icon: 'info',
            title: '',
            text: response.body.message,
          });
        }
      })
      .catch(function (error) {
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

  useEffect(() => {
    getCandidateWebsiteType();
  }, []);

  const toggleForm = () => setShowForm(!showForm);
  const handleAddUrl = (values, actions) => {
    setUrls([...urls, { url: values.url }]);
    actions.resetForm();
    toggleForm();
  };

  const handleEditUrl = (index, values) => {
    setUrls([...urls.slice(0, index), { ...values }, ...urls.slice(index + 1)]);
  };

  const handleDeleteUrl = (index, values) => {
    setUrls([...urls.slice(0, index), ...urls.slice(index + 1)]);
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
          onSubmit={values => {
            handleEditUrl(index, values);
          }}
          validationSchema={FORM_VALIDATION}
        >
          {({ values, errors, touched }) => (
            <Form>
              {JSON.stringify(values)}
              <Stack sx={{ maxWidth: '300px' }} spacing={2}>
                <Textfield
                  readOnly={readOnly}
                  name="url"
                  textLabel=""
                  otherProps={otherProps}
                />

                <Stack direction="row">
                  <Button type="submit">Update</Button>
                  <Button
                    type="button"
                    onClick={() => handleDeleteUrl(index, values)}
                  >
                    Delete
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      ))}
      {!readOnly && <Button onClick={toggleForm}>Add URL</Button>}
      {showForm && (
        <Formik
          initialValues={INITIAL_FORM_STATE}
          onSubmit={handleAddUrl}
          validationSchema={FORM_VALIDATION}
        >
          {({ errors, touched, values }) => (
            <Form>
              {JSON.stringify(values)}
              <Stack>
                <Textfield
                  readOnly={readOnly}
                  name="url"
                  textLabel="url"
                  otherProps={otherProps}
                />
                <Button type="submit">Add</Button>
                <Button type="button" onClick={() => handleDeleteUrl(index)}>
                  Delete
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      )}
    </Stack>
  );
};

export default Option4;
