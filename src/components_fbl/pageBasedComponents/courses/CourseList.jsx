import PrimaryFillButton from '@/components_fbl/buttonComponents/PrimaryFillButton';
import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import ExtraParagraphHeading from '@/components_fbl/headingComponents/ExtraParagraphHeading';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import { getCourseList } from '@/utils/getCourseList';
import { Button, Container, Dialog, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import EnrollForm from './EnrollForm';

function CourseList() {
  const [coursesList, setCoursesList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    const getData = async function () {
      const { courses } = await getCourseList();

      setCoursesList(courses);
    };
    getData();
  }, []);

  const showPopup = function (item) {
    setFilteredData(item);
    setShowForm(true);
  };

  const handleClose = function () {
    setShowForm(false);
  };
  return (
    <CustomSection>
      <Container>
        <Grid container spacing={{ xs: 4 }}>
          {coursesList.length ? (
            coursesList.map(list => (
              <Grid item xs={12} sm={3} lg={4} key={list.id} sx={{}}>
                <Stack sx={{ boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)' }}>
                  <ParagraphHeading
                    sx={{
                      color: '#000000',
                      textAlign: 'cetner',
                      padding: '10px 20px',
                      width: '100%',
                      textTransform: 'uppercase',
                      backgroundColor: '#EBC8DD',
                      textAlign: 'center',
                    }}
                  >
                    SKILL - BASED COURSE
                  </ParagraphHeading>
                  <Stack
                    flexDirection="column"
                    alignItems="start"
                    justifyContent="space-between"
                    sx={{ padding: 2, height: '180px' }}
                  >
                    <ExtraParagraphHeading
                      style={{ fontWeight: 'bold' }}
                      sx={{ color: '#EE5164' }}
                    >
                      Rs. {parseInt(list.internal_amount)}
                    </ExtraParagraphHeading>
                    <ExtraParagraphHeading
                      sx={{ color: '#000000', fontWeight: '500' }}
                    >
                      {list.name}
                    </ExtraParagraphHeading>
                    <Stack
                      alignItems="center"
                      flexDirection="row"
                      justifyContent="space-between"
                      sx={{ width: '100%' }}
                    >
                      <PrimaryFillButton
                        href={`/courses/${list.id}`}
                        sx={{
                          backgroundColor: '#A62973',
                          color: '#ffffff',
                          borderRadius: '50px',
                          padding: '10px 20px',
                          textDecoration: 'none',
                          '&:hover': {
                            backgroundColor: '#A62973',
                            color: '#ffffff',
                            boxShadow: '0px 3px 6px #00000029',
                          },
                        }}
                      >
                        Enroll Now
                      </PrimaryFillButton>
                      <Button
                        style={{
                          padding: 0,
                          borderRadius: '0',
                        }}
                        sx={{
                          backgroundColor: 'transparent',
                          color: '#252525',
                          lineHeight: 'normal',
                          mr: 2,
                          transition: 'all 300ms linear',
                          textDecoration: 'none',
                          '&:hover': {
                            backgroundColor: 'transparent',
                            borderBottom: '1px solid #252525',
                          },
                        }}
                        target="_blank"
                        href={list.link}
                      >
                        More Details
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            ))
          ) : (
            <ParagraphHeading>Loading...</ParagraphHeading>
          )}
        </Grid>
        <Dialog open={showForm} onClose={handleClose}>
          <EnrollForm courseData={filteredData} onClose={handleClose} />
        </Dialog>
      </Container>
    </CustomSection>
  );
}

export default CourseList;
