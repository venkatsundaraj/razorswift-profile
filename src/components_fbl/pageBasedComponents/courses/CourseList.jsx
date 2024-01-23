import PrimaryFillButton from '@/components_fbl/buttonComponents/PrimaryFillButton';
import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import ExtraParagraphHeading from '@/components_fbl/headingComponents/ExtraParagraphHeading';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import EnrollForm from '@/components_fbl/pageBasedComponents/courses/EnrollForm';
import { geneateUrls, getCourseList } from '@/utils/getCourseList';
import { Button, Container, Dialog, Grid, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ExtraSubtitleHeading from '../../headingComponents/ExtraSubtitleHeading';
function CourseList() {
  const [coursesList, setCoursesList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    const getData = async function () {
      const data = await getCourseList();
      console.log(data);
      setCoursesList(data);
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

  const secondsec = {
    offscreen: {
      opacity: 0,
      rotate: 0,
      y: 100,
    },
    onscreen: {
      opacity: [0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rotate: [0, 20, -20, 20, 0],
      y: 0,
      transition: {
        type: 'spring',
        duration: 2,
        ease: 'easeInOut',
        damping: 9.8,
        stiffness: 100,
      },
    },
  };
  return (
    <CustomSection sx={{ overflowY: 'hidden' }}>
      <Container>
        {coursesList.overview_text ? (
          <ParagraphHeading
            sx={{ color: 'primaryPalette.black', textAlign: 'center', mb: 3 }}
          >
            {coursesList.overview_text}
          </ParagraphHeading>
        ) : (
          <ParagraphHeading>Loading...</ParagraphHeading>
        )}
        <Grid container spacing={{ xs: 4 }}>
          {coursesList.courses?.length ? (
            coursesList.courses.map(list => (
              <Grid item xs={12} sm={3} lg={4} key={list.id} sx={{}}>
                <motion.div transition={{ staggerChildren: 1.9 }} id="cards">
                  <motion.div
                    variants={secondsec}
                    initial={'offscreen'}
                    whileInView={'onscreen'}
                    viewport={{ once: true }}
                  >
                    <Stack
                      sx={{
                        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.13)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <ExtraSubtitleHeading
                        style={{ fontSize: '12px' }}
                        sx={{
                          position: 'absolute',
                          left: '-20px',
                          top: '5px',
                          fontWeight: '500',
                          color: 'primaryPalette.white',
                          width: '100px',
                          textAlign: 'center',
                          padding: '4px 6px',
                          backgroundColor: '#EE5164',
                          transform: 'rotate(-45deg)',
                          transformOrigin: 'bottom',
                          opacity: '0',
                          display: 'none',
                        }}
                      >
                        {list.powered_by}
                      </ExtraSubtitleHeading>
                      <ParagraphHeading
                        sx={{
                          color: '#000000',
                          textAlign: 'cetner',
                          padding: '10px 20px',
                          width: '100%',
                          textTransform: 'uppercase',
                          backgroundColor: '#EBC8DD',
                          textAlign: 'center',
                          display: 'none',
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
                            href={`/courses/${geneateUrls(list.name)}`}
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
                  </motion.div>
                </motion.div>
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
