import FormCard from '@/cardComponents/FormCard';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { CandidateWebsiteApi } from '@/swagger_api/*';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { Divider, Stack } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import SocialMediaType from './LinkType';
import LinkType from './SocialMediaType';

const WebsiteSocialMediaProfile = () => {
  const { loading, setLoading } = useContext(LoadingContext);
  const [readOnly, setReadOnly] = useState(true);
  const [url, setUrl] = useState([]);
  const userDetails = localStorageUtil.getItem('userDetails');

  const candidateWebsite = new CandidateWebsiteApi();
  const getCandidateWebsiteType = async () => {
    setLoading(true);
    await candidateWebsite
      .apiCandidateWebsiteGetAllByWebsiteTypeCandidateidGet(
        userDetails?.candidateId
      )
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
          setUrl(response.body.result);
          console.log(url.filter(url => url.websiteType === 1));
        } else if (response.body.message === 'No Records Found.') {
          setUrl([]);
        } else {
          // Swal.fire({
          //   icon: 'info',
          //   title: '',
          //   text: response.body.message,
          // });
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

  return (
    <Stack spacing={2}>
      <FormHeaderComponents
        title="Website & Social profile"
        isButtonNotRequired={!readOnly}
        workingFunction={() => setReadOnly(false)}
      />
      <FormCard>
        <Stack spacing={2} divider={<Divider flexItem />}>
          <SocialMediaType
            readOnly={readOnly}
            setReadOnly={setReadOnly}
            urlFromApi={url.filter(url => url.websiteType === 1)}
            getCandidateWebsiteType={getCandidateWebsiteType}
            setUrl={setUrl}
          />
          <LinkType
            readOnly={readOnly}
            setReadOnly={setReadOnly}
            urlFromApi={url.filter(url => url.websiteType === 2)}
            getCandidateWebsiteType={getCandidateWebsiteType}
            setUrl={setUrl}
          />
        </Stack>
      </FormCard>
    </Stack>
  );
};

export default WebsiteSocialMediaProfile;
