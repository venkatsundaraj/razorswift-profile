import ProfileLayout from '@/layouts/ProfileLayout';
import ProfileBackground from '@/pageComponents/Profile/Common/ProfileBackground';
import ProfileInfo from '@/pageComponents/Profile/Common/ProfileInfo';
import RightBar from '@/pageComponents/Profile/RightBar';
import TabView from '@/pageComponents/Profile/View/TabView';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { Container, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

const ViewPublic = ({ slug }) => {
  const { data, setData } = useContext(SlugContext);
  const userDetails = localStorageUtil.getItem('userDetails');

  const router = useRouter();

  useEffect(() => {
    setData(slug);
    // GetData();
  }, []);

  return (
    <Container maxWidth="xl" disableGutters>
      <ProfileLayout
        sidebar={true}
        viewBar={true}
        rightComponent={
          <RightBar>
            <ProfileBackground data={data} />
            <Container>
              <Stack spacing={3}>
                <ProfileInfo publicView data={data} />
                {/* <Expertise /> */}
                <TabView data={data} />
              </Stack>
            </Container>
          </RightBar>
        }
      />
    </Container>
  );
};

export default ViewPublic;
