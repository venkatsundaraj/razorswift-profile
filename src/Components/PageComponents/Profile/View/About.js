import ProfileCard from '@/cardComponents/ProfileCard';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import ViewEditor from '@/reUsableComponents/RichTextEditor/ViewEditor';
import { Divider, Stack } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

const About = () => {
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);
  const additionalDetails = context2
    ? context2?.data?.additionalDetails
    : context1.data?.additionalDetails;

  const [additionalDetailsInfo, setAdditionalDetailsInfo] = useState();
  useEffect(() => {
    if (typeof window !== 'undefined')
      setAdditionalDetailsInfo(additionalDetails);
  }, [additionalDetails]);
  return (
    <ProfileCard>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <ViewEditor title={'About me'} text={additionalDetailsInfo?.about} />
        <ViewEditor
          title={'Hobbies & Activities'}
          text={additionalDetailsInfo?.hobbitesAndActivities}
        />
      </Stack>
    </ProfileCard>
  );
};

export default About;
