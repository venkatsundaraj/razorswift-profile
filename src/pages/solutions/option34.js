import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

//import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';

import styled from '@emotion/styled';
import { useEffect } from 'react';

import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

const Accordion = styled(props => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled(props => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  //   flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const commonStyle = {
  //   height: '100px',
  width: '100%',
  backgroundColor: 'white',
  borderRadius: 0,
  minHeight: 50,
};
const CardSectionHeader = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '700',
  fontSize: '18px',
  lineHeight: '15.4px',
  textAlign: 'inherit',
  padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '12.23px',
  },
}));

// path way

const Option34 = () => {
  const [stepMasters, stepStepMasters] = useState([
    {
      id: 1,
      stepName: 'create profile',
      isMandate: true,
      attributes: [
        {
          mainHeader: 'Reference',
          details: [
            {
              id: 1,
              label: 'Name',
              type: 'text',
              isRequired: true,
              fieldName: 'name',
              value: '',
            },
            {
              id: 2,
              label: 'Link',
              type: 'url',
              isRequired: true,
              fieldName: 'link',
              value: '',
            },
            {
              id: 3,
              label: 'Date',
              type: 'date',
              isRequired: true,
              fieldName: 'date',
              value: '',
            },
          ],
        },
        {
          mainHeader: 'Outcome',
          details: [
            {
              id: 1,
              label: 'Pass',
              type: 'text',
              isRequired: true,
              fieldName: 'pass',
              value: '',
            },
            {
              id: 2,
              label: 'Fail',
              type: 'text',
              isRequired: true,
              fieldName: 'fail',
              value: '',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      stepName: 'Assessment',
      isMandate: false,
      attributes: [
        {
          mainHeader: 'Outcome',
          details: [
            {
              id: 1,
              label: 'Min marks',
              type: 'number',
              isRequired: true,
              fieldName: 'minMarks',
              value: '',
            },
            {
              id: 2,
              label: 'Max marks',
              type: 'number',
              isRequired: true,
              fieldName: 'maxMarks',
              value: '',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      stepName: 'Courses',
      isMandate: false,
    },
  ]);
  const [formInitialValues, setFormInitialValues] = useState(null);
  const handleListItemClick = id => {
    const updatedStepMasters = stepMasters.map(step =>
      step?.id === id
        ? { ...step, isSelectedItemList: !step?.isSelectedItemList }
        : step
    );
    stepStepMasters(updatedStepMasters);
  };
  const setFormInitialValuesFunction = values => {
    setFormInitialValues(values);
  };

  useEffect(() => {
    const updatedStepMasters = stepMasters.map(step => ({
      ...step,
      isSelectedItemList: false,
    }));
    stepStepMasters(updatedStepMasters);
  }, []);

  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleAccordionChange = panel => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };
  const handleInputChange = (event, mainHeader, fieldName, detailId) => {
    const updatedFormInitialValues = { ...formInitialValues };

    for (const attribute of updatedFormInitialValues.attributes) {
      if (attribute.mainHeader === mainHeader) {
        for (const detail of attribute.details) {
          if (detail.id === detailId && detail.fieldName === fieldName) {
            detail.value = event.target.value;
            break;
          }
        }
        break; // No need to continue checking other attributes
      }
    }

    setFormInitialValues(updatedFormInitialValues);
    console.log(updatedFormInitialValues);
  };

  const handleSaveClick = () => {
    const updatedStepMasters = stepMasters.map(step =>
      step.id === formInitialValues.id ? { ...formInitialValues } : step
    );
    console.log(updatedStepMasters);
    stepStepMasters(updatedStepMasters);
  };

  return (
    <Stack maxWidth="xl" sx={{ margin: 5 }} spacing={5}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
        Pathway Creation
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              List of Steps
            </Typography>
            <List>
              {stepMasters.map(step => (
                <ListItemButton
                  key={step?.id}
                  onClick={() => handleListItemClick(step?.id)}
                  selected={step?.isSelectedItemList}
                  sx={{
                    fontWeight: step?.isSelectedItemList ? 'bold' : 'normal',
                  }}
                >
                  <ListItemText primary={step?.stepName} />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Selected Items
            </Typography>
            {stepMasters
              .filter(step => step?.isSelectedItemList)
              .map(step => (
                <ListItemButton
                  key={step?.id}
                  onClick={() => setFormInitialValuesFunction(step)}
                  selected={step?.id === formInitialValues?.id}
                  sx={{ fontWeight: 'bold' }}
                >
                  <ListItemText primary={step?.stepName} />
                </ListItemButton>
              ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          {formInitialValues && (
            <Paper sx={{ p: 3 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                >
                  {formInitialValues?.stepName}
                </Typography>
                <IconButton
                  onClick={() => {
                    setFormInitialValues(null);
                  }}
                  aria-label="delete"
                  size="small"
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </Stack>
              {formInitialValues?.attributes?.map((attribute, index) => (
                <Accordion
                  key={index}
                  expanded={expandedPanel === index}
                  onChange={handleAccordionChange(index)}
                  sx={{ mb: 2 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        mb: 1,
                      }}
                    >
                      {attribute.mainHeader}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {attribute.details?.map((details, detailsIndex) => (
                        <ListItem key={detailsIndex}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ width: '100%' }}
                          >
                            <Typography>{details.label}</Typography>
                            <TextField
                              label=""
                              id="outlined-size-small"
                              value={details.value}
                              size="small"
                              onChange={event =>
                                handleInputChange(
                                  event,
                                  attribute.mainHeader,
                                  details.fieldName,
                                  details.id
                                )
                              }
                            />
                          </Stack>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
              <Button
                variant="contained"
                onClick={handleSaveClick}
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};
export default Option34;
