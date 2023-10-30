import ProfileLayout from '@/layouts/ProfileLayout';
import Jd from '@/pageComponents/JD';
import TabView from '@/pageComponents/JD/ViewJd/TabView/index';
import RightBar from '@/pageComponents/Profile/RightBar';
import { JdSlugContext } from '@/reUsableComponents/DataContext/JdSlugContext';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
const ViewJd = ({ jdslug }) => {
  const { data, setData } = useContext(JdSlugContext);
  const userDetails = localStorageUtil.getItem('userDetails');

  const router = useRouter();

  useEffect(() => {
    setData(jdslug);
  }, []);

  return (
    <Container maxWidth="xl" disableGutters>
      <ProfileLayout
        sidebar={true}
        viewBar={false}
        rightComponent={
          <RightBar>
            <Container>
              <Jd data={data} />

              <TabView data={data} />
            </Container>
          </RightBar>
        }
      />
    </Container>
  );
};

export default ViewJd;
