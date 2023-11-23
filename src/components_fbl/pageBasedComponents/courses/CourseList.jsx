import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import ExtraParagraphHeading from '@/components_fbl/headingComponents/ExtraParagraphHeading';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import EnrollForm from '@/components_fbl/pageBasedComponents/courses/EnrollForm';
import { getCourseList } from '@/utils/getCourseList';
import { Button, Container, Dialog, Grid, Stack } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function CourseList() {
  const [coursesList, setCoursesList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getData = async function () {
      const { courses } = await getCourseList();

      setCoursesList(courses);
    };
    getData();
  }, []);

  const showPopup = function (item) {
    console.log(item);
    setShowForm(true);
  };

  const handleClose = function () {
    setShowForm(false);
  };
  return (
    <CustomSection>
      <Container>
        <Grid container spacing={{ xs: 4 }}>
          {coursesList.length
            ? coursesList.map(list => (
                <Grid item xs={12} sm={3} lg={4} key={list.id} sx={{}}>
                  <Stack sx={{ boxShadow: '0px 3px 6px #00000029' }}>
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
                      sx={{ padding: 2, height: '170px' }}
                    >
                      <ParagraphHeading
                        style={{ fontWeight: 'bold' }}
                        sx={{ color: '#EE5164' }}
                      >
                        Rs. {list.internal_amount}
                      </ParagraphHeading>
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
                        <Button
                          onClick={() => showPopup(list)}
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
                        </Button>
                        <Link
                          style={{
                            padding: '8px 20px',
                            textDecoration: 'none',
                          }}
                          href={list.link}
                        >
                          More Details
                        </Link>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
              ))
            : <ParagraphHeading>Loading...</ParagraphHeading>}
        </Grid>
        <Dialog open={showForm} onClose={handleClose}>
          <EnrollForm />
        </Dialog>
      </Container>
    </CustomSection>
  );
}

export default CourseList;
