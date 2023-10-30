import MainCard from '@/cardComponents/MainCard';
import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { skillLevels } from '@/src/data/Enum';
import {
  ClientApi,
  JobDescriptionApi,
  SkillPlatformApi,
} from '@/swagger_api/*';
import { debounce } from '@/utils/CommonFunctions/Functions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import {
  multiLineValidation,
  nameValidationwithNoRegex,
  staticDropDownValidation,
} from '@/utils/validationSchema';
import {
  Divider,
  Grid,
  List,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

//import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';

import ProfileCard from '@/cardComponents/ProfileCard';
import styled from '@emotion/styled';

import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton, ListItemButton, TextField } from '@mui/material';

//import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';

import { setAlertPopup } from '@/store/alertSlice';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Switch from '@mui/material/Switch';
import Swal from 'sweetalert2';

//import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';

//import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 18,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(10px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.primary.main
            : theme.palette.primary.main,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 16,
    height: 16,
    borderRadius: 8,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

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
  padding: '0px 0px 10px 0px',

  [theme.breakpoints.down('sm')]: {
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '12.23px',
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: 'black',
  height: 2,
  // Adjust margin as needed
}));

// path way
// ... (Other imports you provided)

// Draggable Step Item
function DraggableStepItem({ step, handleListItemClick }) {
  const [, ref] = useDrag({
    type: 'STEP_ITEM',
    item: step,
  });

  return (
    <ListItemButton ref={ref} onClick={() => handleListItemClick(step?.id)}>
      <ListItemText primary={step?.stepName} />
    </ListItemButton>
  );
}

// Droppable Area
function DropTargetArea({ onDrop }) {
  const [, ref] = useDrop({
    accept: 'STEP_ITEM',
    drop: item => {
      onDrop(item);
    },
  });

  return (
    <div ref={ref} style={{ minHeight: '100px', border: '1px solid black' }}>
      Drop here
    </div>
  );
}

const NormalForm = () => {
  // ... (Your state initializations and other functions)
  const [isInternal, setIsInternal] = useState(true);
  const [isSkillBased, setIsSkillBased] = useState(true);
  const dispatch = useDispatch();
  const [platform, setPlatform] = useState([]);
  const [skillAliases, setAliases] = useState([]);
  const userDetails = useMemo(
    () => localStorageUtil.getItem('userDetails'),
    []
  );
  const skillPlatformApi = useMemo(() => new SkillPlatformApi(), []);
  const clientApi = useMemo(() => new ClientApi(), []);
  const jobDescriptionApi = useMemo(() => new JobDescriptionApi(), []);
  const [skillPlatformList, setSkillPlatformList] = useState([]);
  const [companyList, setComapnyList] = useState([]);
  const [jobDescrptionList, setJobDescriptionList] = useState([]);
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
      description: '',
      is_active: true,
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

  const PathWayTypes = [
    { id: 1, value: 1, name: 'Jobs' },
    { id: 2, value: 2, name: 'Skill' },
    { id: 3, value: 3, name: 'Company' },
  ];

  const INITIAL_FORM_STATE = {
    pathwayType: '',
    title: '',
    description: '',

    ...(isSkillBased && {
      skill: '',
      skill_level: '',
    }),
    ...(!isSkillBased && { company: '', jobDescription: '' }),
  };
  const FORM_VALIDATION = Yup.object().shape({
    title: nameValidationwithNoRegex('Title', true),
    description: multiLineValidation('Description', true),
    pathwayType: staticDropDownValidation('Path Way', true, PathWayTypes),
    ...(isSkillBased && {
      skill: Yup.mixed().required('Skill platform is required'),
      skill_level: staticDropDownValidation('SKill Level', true, skillLevels),
    }),
    ...(!isSkillBased && {
      company: Yup.mixed().required('Skill platform is required'),
      jobDescription: Yup.mixed().required('Skill platform is required'),
    }),
  });

  const SubmitDetails = async (values, { resetForm }) => {
    console.log('sub', values);
    const updatedStepMasters = stepMasters.map(step =>
      step.id === formInitialValues.id ? { ...formInitialValues } : step
    );
    console.log(updatedStepMasters);
    dispatch(
      setAlertPopup({
        message: 'Pathway created successfully',
        type: 'success',
        duration: 3000,
      })
    );
  };

  const handleInputSkillPlatformName = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };

      try {
        const response = await skillPlatformApi.apiSkillPlatformGetAllByNameGet(
          opts
        );

        const trim =
          response?.body?.result?.map((res, index) => ({
            title: res?.name,
            year: res?.id,
          })) || [];

        setSkillPlatformList(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [skillPlatformApi.apiSkillPlatformGetAllByNameGet, setSkillPlatformList]
  );
  const handleInputCompanyName = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };

      try {
        const response = await clientApi.apiClientGetAllByNameGet(opts);

        const trim =
          response?.body?.result?.map((res, index) => ({
            title: res?.name,
            year: res?.id,
          })) || [];

        setComapnyList(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [skillPlatformApi.apiSkillPlatformGetAllByNameGet, setSkillPlatformList]
  );
  const handleInputJobDescriptionName = useCallback(
    async newValue => {
      let opts = {
        name: newValue,
      };
      console.log(newValue);

      try {
        const response =
          await jobDescriptionApi.apiJobDescriptionGetAllJdByClientIdClientIdGet(
            newValue
          );

        const trim =
          response?.body?.result?.map((res, index) => ({
            title: res?.title,
            year: res?.id,
          })) || [];

        setJobDescriptionList(trim);
      } catch (error) {
        console.log(error);
      }
    },
    [jobDescriptionApi]
  );

  // Rest of your component

  useEffect(() => {
    handleInputSkillPlatformName('');
    handleInputCompanyName('');
  }, [handleInputSkillPlatformName, handleInputCompanyName]);

  const handleDrop = item => {
    handleListItemClick(item.id);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, { resetForm }) =>
          SubmitDetails(values, { resetForm })
        }
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          touched,
          values,
        }) => (
          <>
            <MainCard title="PathWay Creation">
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="space-between">
                  <Grid item xs={6} md={6} alignSelf="flex-start">
                    <SelectWrapper
                      name={`pathwayType`}
                      textLabel="Pathway Type"
                      textLabelStyle={textLabel}
                      options={PathWayTypes}
                      placeholder="Select Path Type"
                      inputProps={otherPropsRequired}
                      onChangeValues={e => {
                        Swal.fire({
                          title: 'Are you sure?',
                          text: 'Your want the change Pathway Type!',
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: 'blue',
                          cancelButtonColor: 'grey',
                          confirmButtonText: 'Yes',
                          cancelButtonText: 'No',
                          reverseButtons: true,
                          allowOutsideClick: false,
                        }).then(async result => {
                          if (result.isConfirmed) {
                            setFieldValue('pathwayType', e.target.value);
                            if (e.target.value === 2) {
                              setIsSkillBased(true);
                            } else {
                              setIsSkillBased(false);
                              handleInputCompanyName('');
                            }
                          } else if (
                            /* Read more about handling dismissals below */
                            result.dismiss === Swal.DismissReason.cancel
                          ) {
                            dispatch(
                              setAlertPopup({
                                message: 'You have reverted the select action',
                                type: 'info',
                                duration: 3000,
                              })
                            );
                          }
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextfieldWrapper
                      name="title"
                      textLabelStyle={textLabel}
                      textLabel="Title"
                      otherProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextfieldWrapper
                      name="description"
                      multiline
                      minRows={4}
                      textLabelStyle={textLabel}
                      textLabel="Description"
                      otherProps={otherPropsRequired}
                    />
                  </Grid>

                  {isSkillBased && (
                    <Grid item xs={6} md={6}>
                      <HandleInputChangeAutocomplete
                        isNotAdd={false}
                        otherProps={otherPropsRequired}
                        options={skillPlatformList}
                        handleInputChange={handleInputSkillPlatformName}
                        textLabelStyle={textLabel}
                        name="skill"
                        label="Skills"
                        placeHolder="Select Skill"
                        value={values.skill}
                        onChange={(e, value) => {
                          setFieldValue('skill', value);
                        }}
                      />
                    </Grid>
                  )}

                  {isSkillBased && (
                    <Grid item xs={6} md={6} alignSelf="flex-start">
                      <SelectWrapper
                        name={`skill_level`}
                        textLabel="Skill Level"
                        textLabelStyle={textLabel}
                        options={skillLevels}
                        placeholder="Select level"
                        inputProps={otherPropsRequired}
                      />
                    </Grid>
                  )}

                  {!isSkillBased && (
                    <Grid item xs={6} md={6}>
                      <HandleInputChangeAutocomplete
                        isNotAdd={true}
                        otherProps={otherPropsRequired}
                        options={companyList}
                        handleInputChange={handleInputCompanyName}
                        textLabelStyle={textLabel}
                        name="company"
                        label="Company"
                        placeHolder="Select Company"
                        value={values.company}
                        onChange={(e, value) => {
                          setFieldValue('company', value);
                          if (value?.year) {
                            console.log(value?.year);
                            handleInputJobDescriptionName(value?.year);
                          }
                        }}
                      />
                    </Grid>
                  )}

                  {!isSkillBased && (
                    <Grid item xs={6} md={6}>
                      <HandleInputChangeAutocomplete
                        isNotAdd={true}
                        otherProps={otherPropsRequired}
                        options={jobDescrptionList}
                        handleInputChange={() => {
                          handleInputJobDescriptionName(values?.company?.year);
                        }}
                        textLabelStyle={textLabel}
                        name="jobDescription"
                        label="Jobs"
                        placeHolder="Select Jobs"
                        value={values.jobDescription}
                        onChange={(e, value) => {
                          setFieldValue('jobDescription', value);
                        }}
                      />
                    </Grid>
                  )}
                </Grid>
              </Form>
              <Divider sx={{ marginY: 3 }} />

              <Stack maxWidth="xl" spacing={10}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 1 }}
                >
                  <Grid item xs={12} sm={4}>
                    <ProfileCard styleProps={{ ...commonStyle }}>
                      <Stack direction="column" justifyContent="space-evenly">
                        <CardSectionHeader>List</CardSectionHeader>
                        <StyledDivider />
                        <List>
                          {stepMasters.map(step => (
                            <DraggableStepItem
                              key={step?.id}
                              step={step}
                              handleListItemClick={handleListItemClick}
                            />
                          ))}
                        </List>
                      </Stack>
                    </ProfileCard>

                    <DropTargetArea onDrop={handleDrop} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <ProfileCard
                      styleProps={{
                        ...commonStyle,
                      }}
                    >
                      <CardSectionHeader>Selected Items</CardSectionHeader>
                      <StyledDivider />
                      {stepMasters
                        .filter(step => step?.isSelectedItemList)
                        .map(step => (
                          <ListItemButton
                            key={step?.id}
                            onClick={() => setFormInitialValuesFunction(step)}
                            selected={step?.id === formInitialValues?.id}
                          >
                            <ListItemText primary={step?.stepName} />
                          </ListItemButton>
                        ))}
                    </ProfileCard>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <ProfileCard
                      styleProps={{
                        ...commonStyle,
                      }}
                    >
                      <CardSectionHeader>Properties</CardSectionHeader>
                      <StyledDivider />
                      {formInitialValues && (
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="flex-end"
                        >
                          <IconButton
                            onClick={() => {
                              setFormInitialValues(null);
                            }}
                            aria-label="delete"
                            size="small"
                          >
                            <CloseIcon color="primary" size="28px" />
                          </IconButton>
                        </Stack>
                      )}

                      {formInitialValues?.attributes?.map(
                        (attribute, index) => (
                          <Accordion
                            key={index}
                            expanded={expandedPanel === index}
                            onChange={handleAccordionChange(index)}
                          >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography>{attribute.mainHeader}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {attribute.details?.map(
                                (details, detailsIndex) => (
                                  <>
                                    <Typography key={detailsIndex}>
                                      {details.label}
                                    </Typography>
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
                                      } // this should append the values to formIntialValues
                                    />
                                  </>
                                )
                              )}
                            </AccordionDetails>
                          </Accordion>
                        )
                      )}
                    </ProfileCard>
                  </Grid>
                </Grid>
                <Stack alignItems={'center'}>
                  {
                    // <Button
                    //   sx={{ mt: 2 }}
                    //   variant="contained"
                    //   onClick={handleSaveClick}
                    // >
                    //   Submit
                    // </Button>
                    <SubmissionButton onClick={handleSubmit}>
                      Submit
                    </SubmissionButton>
                  }
                </Stack>
              </Stack>
              {/* ... (Your existing code) */}

              {/* ... (Rest of your component) */}
            </MainCard>
          </>
        )}
      </Formik>
    </DndProvider>
  );
};

export default NormalForm;
