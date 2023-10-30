import PageTitle from '@/headingComponents/PageTitle';
import { KeyboardArrowDown } from '@mui/icons-material';
import {
  AccordionSummary,
  Box,
  Container,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useState } from 'react';
import { marginTopBottom } from 'src/utils/commonStyles';

const Faq = ({ arrayDetails }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const CustomContainer = styled(Container)(({ theme }) => ({
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
    },
  }));

  const Accordion = styled(props => (
    <MuiAccordion disableGutters elevation={0} square={false} {...props} />
  ))(({ theme }) => ({
    '&.MuiAccordion-root:before': {
      height: 0,
    },
    '&.MuiAccordion-root': {
      marginTop: 10,
      marginBottom: 10,
      border: 'none',
      backgroundColor: '#F5F5F5',
    },
    boxShadow: 5,
  }));

  const Question = styled(Typography)(({ theme }) => ({
    fontSize: '24px',
    color: '#1D1D1D',
    fontWeight: '600',
    lineHeight: '25.29px',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      lineHeight: '25.29px',
    },
  }));

  const Answer = styled(Typography)(({ theme }) => ({
    fontSize: '20px',
    color: '#434343',
    fontWeight: '500',
    lineHeight: '35.2px',

    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
      lineHeight: '23.29px',
    },
  }));

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '10px',
        ...marginTopBottom,
      }}
    >
      <PageTitle>Frequently asked questions</PageTitle>
      <CustomContainer maxWidth="md">
        <Box
          style={{
            width: '100%',
          }}
        >
          {arrayDetails.map((values, index) => (
            <Accordion
              key={values.id}
              TransitionProps={{ unmountOnExit: true }}
              square={false}
              expanded={expanded === values.id}
              onChange={handleChange(values.id)}
            >
              <AccordionSummary
                expandIcon={
                  <KeyboardArrowDown
                    style={{
                      fontWeight: '900',
                      color: '#1D1D1D',
                      fontSize: '24px',
                      lineHeight: '23px',
                    }}
                  />
                }
                aria-controls={`${values.id}bh-content`}
                id={`${values.id}bh-header`}
              >
                <Question>{values.question}</Question>
              </AccordionSummary>
              <AccordionDetails>
                {values.answer.map(value => (
                  <Answer
                    sx={{ marginBottom: 1 }}
                    key={value.id}
                    display="block"
                  >
                    {value.answer}
                  </Answer>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </CustomContainer>
    </Container>
  );
};

export default Faq;
