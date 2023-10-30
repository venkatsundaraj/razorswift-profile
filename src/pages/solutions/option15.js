import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

import { createContext } from 'react';

const MyFormContext = createContext({});

const StepOne = ({ onSubmit }) => {
  const { setActiveStep } = useContext(MyFormContext);

  return (
    <Formik
      initialValues={{ firstName: '' }}
      validationSchema={Yup.object({
        // define validation schema for step 1
      })}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <TextfieldWrapper
            name="firstName"
            // textLabelStyle={textLabel}
            textLabel="First Name"
            // otherProps={otherProps}
          />
          <Button onClick={() => setActiveStep(2)} type="button">
            Next
          </Button>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

const StepTwo = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ middleName: '' }}
      validationSchema={Yup.object({
        // define validation schema for step 2
      })}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <TextfieldWrapper
            name="middleName"
            // textLabelStyle={textLabel}
            textLabel="middle Name"
            // otherProps={otherProps}
          />
          <Button type="submit">Next</Button>
        </Form>
      )}
    </Formik>
  );
};

const StepThree = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ lastName: '' }}
      validationSchema={Yup.object({
        // define validation schema for step 3
      })}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <TextfieldWrapper
            name="lastName"
            // textLabelStyle={textLabel}
            textLabel="Last Name"
            // otherProps={otherProps}
          />

          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

const Option15 = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [stepOneData, setStepOneData] = useState(null);
  const [stepTwoData, setStepTwoData] = useState(null);
  const [stepThreeData, setStepThreeData] = useState(null);
  const apiResponse = '45';

  const handleStepOneSubmit = (values, { setSubmitting }) => {
    // submit data from step 1 to API
    // store API response in state
    setStepOneData(apiResponse);
    setActiveStep(1);
  };

  const handleStepTwoSubmit = (values, { setSubmitting }) => {
    // submit data from step 2 to API
    // store API response in state
    setStepTwoData(apiResponse);
    setActiveStep(2);
  };

  const handleStepThreeSubmit = (values, { setSubmitting }) => {
    // submit data from step 3 to API
    // store API response in state
    setStepThreeData(apiResponse);
    // handle final submission
  };

  return (
    <MyFormContext.Provider
      value={{
        stepOneData,
        stepTwoData,
        stepThreeData,
        setActiveStep,
        activeStep,
      }}
    >
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 3</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 0 && <StepOne onSubmit={handleStepOneSubmit} />}
      {activeStep === 1 && <StepTwo onSubmit={handleStepTwoSubmit} />}
      {activeStep === 2 && <StepThree onSubmit={handleStepThreeSubmit} />}
    </MyFormContext.Provider>
  );
};

export default Option15;
