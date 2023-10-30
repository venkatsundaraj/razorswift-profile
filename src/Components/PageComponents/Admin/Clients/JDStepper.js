import ClientContactForm from '@/pageComponents/Admin/Clients/ClientContactForm';
import ClientContractForm from '@/pageComponents/Admin/Clients/ClientContractForm';
import RegistrationForm from '@/pageComponents/Admin/Clients/RegistrationForm';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { setAlertPopup } from '@/store/alertSlice';
import { ClientApi, ClientContractApi, ContactApi } from '@/swagger_api/*';
import { Step, StepLabel, Stepper } from '@mui/material';
import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';

export const MyFormContext = createContext({});
const stepTitles = ['Registration form', 'Contact form', 'Contract form'];

const JDStepper = ({ type }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [stepOneData, setStepOneData] = useState(null);
  const [stepTwoData, setStepTwoData] = useState(null);
  const [stepThreeData, setStepThreeData] = useState(null);
  const [operationType, setOperationType] = useState(type || 'add');
  const clientApi = useMemo(() => new ClientApi(), []);
  const contactApi = useMemo(() => new ContactApi(), []);
  const clientContractApi = useMemo(() => new ClientContractApi(), []);
  const { loading, setLoading } = useContext(LoadingContext);

  const GetClientById = useCallback(
    async id => {
      setLoading(true);
      try {
        const response = await clientApi.apiClientIdGet(id);

        if (response.body.result) {
          setStepOneData(response.body.result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // This will run regardless of success or error
      }
    },
    [clientApi, setLoading]
  );

  const fetchClients = useCallback(
    async guid => {
      try {
        const response = await clientApi.apiClientGetByGuidGuidGet(guid);
        if (response.body.result) {
          return response.body.result;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    [clientApi]
  );

  const EditData = useCallback(async () => {
    if (router.query.guId) {
      const result = await fetchClients(router.query.guId);

      setStepOneData(result);
    }
  }, [fetchClients, router.query.guId]);

  useEffect(() => {
    EditData();
  }, [EditData]);

  const handleStepOneSubmit = (values, { setSubmitting }) => {
    const { clientAddresses, ...otherValues } = values;
    const businessVerticalId = values?.businessVerticalId?.year;

    const ClientAddress = clientAddresses.map(address => {
      const {
        address: { stateId, cityId, zipCode, street },
        ...rest
      } = address;
      return {
        address: {
          stateId: stateId?.year,
          cityId: cityId?.year,
          countryId: 77,
          zipCode,
          street,
        },
        ...rest,
      };
    });

    if (type === 'edit' || stepOneData?.id) {
      const id = type === 'edit' ? stepOneData.id : stepOneData?.id;
      editClientsRegistration({
        ...otherValues,
        id,
        businessVerticalId,
        clientAddresses: ClientAddress,
      });
    } else {
      addClientsRegistration({
        ...otherValues,
        businessVerticalId,
        clientAddresses: ClientAddress,
      });
    }
  };

  const handleStepTwoSubmit = (values, { setSubmitting }) => {
    let SubmittedValues = {
      ...values,
      clientId: stepOneData?.id || '',
      sourceId: stepOneData?.id || '',
    };
    setStepTwoData(SubmittedValues);
    console.log(type, values, 'type values', SubmittedValues, stepOneData?.id);
    if ((type === 'edit' && values?.id) || values?.id) {
      editClientsContact(values);
    } else {
      addClientsContact(SubmittedValues);
    }
  };

  const handleStepThreeSubmit = (values, { setSubmitting }) => {
    let SubmittedValues = {
      ...values,
      clientId: stepOneData?.id || '',
    };

    setStepThreeData(SubmittedValues);
    console.log(SubmittedValues, type);
    console.log(stepOneData?.clientContracts[0]?.id);
    // console.log('values', stepOneData?.id);
    if (type === 'edit' && stepOneData?.clientContracts[0]?.id) {
      editClientsContract({
        ...SubmittedValues,
        id: stepOneData?.clientContracts[0]?.id,
      });
    } else {
      addClientsContract(SubmittedValues);
    }
  };

  const addClientsRegistration = async SubmittedValues => {
    const opts = {
      body: SubmittedValues,
    };
    console.log('SubmittedValues', SubmittedValues);
    try {
      const response = await clientApi.apiClientPost(opts);

      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Client created successfully',
            type: 'success',
            duration: 3000,
          })
        );
        console.log(response.body.message);

        GetClientById(response?.body?.result?.id);

        setStepOneData(response.body.result);
        //const clientId = response?.body?.result?.clientAddresses[0]?.clientId;
        //setStepOneData({ ...stepOneData, clientId: clientId});
        setActiveStep(activeStep + 1);
        console.log(
          'clientId',
          response?.body?.result?.clientAddresses[0]?.clientId
        );
      } else {
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
      console.log('post', response);
      console.log(
        'clientId',
        response?.body?.result?.clientAddresses[0]?.clientId
      );
    } catch (error) {
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };

  const editClientsRegistration = async SubmittedValues => {
    const opts = {
      body: SubmittedValues,
    };

    try {
      const response = await clientApi.apiClientPut(opts);

      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Client updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        setActiveStep(activeStep + 1);
        setStepOneData(response.body.result);
        GetClientById(response?.body?.result?.id);
      } else if (response.body.message === 'Already Exists.') {
        dispatch(
          setAlertPopup({
            message: 'Already exists.',
            type: 'error',
            duration: 3000,
          })
        );
      } else if (response.body.message === 'Updation Failed.') {
        dispatch(
          setAlertPopup({
            message: 'Updation failed',
            type: 'error',
            duration: 3000,
          })
        );
      } else {
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
      console.log('post', response);
    } catch (error) {
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };

  const addClientsContact = async SubmittedValues => {
    const opts = {
      body: {
        ...SubmittedValues,
      },
    };
    try {
      const response = await contactApi.apiContactPost(opts);

      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Client contact created successfully',
            type: 'success',
            duration: 3000,
          })
        );
        console.log(response.body.message);
        setStepTwoData(response.body.result);
        setActiveStep(activeStep + 1);
        GetClientById(response?.body?.result?.clientId);
      } else {
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
      console.log('post', response);
    } catch (error) {
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };
  const editClientsContact = async SubmittedValues => {
    const opts = {
      body: {
        ...SubmittedValues,
      },
    };
    try {
      const response = await contactApi.apiContactPut(opts);

      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Client contact updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        setStepTwoData(response.body.result);
        setActiveStep(activeStep + 1);
        GetClientById(response?.body?.result?.clientId);
      } else {
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
      console.log('put', response);
    } catch (error) {
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };
  const addClientsContract = async values => {
    console.log('gettingvalues', values);
    const opts = {
      startDate: values?.startDate,
      endDate: values?.endDate,
      // status: values?.status,
      dateOfInvoice: values?.dateOfInvoice,
      uploadedFile: values?.uploadedFile,
      clientId: values?.clientId,
    };

    console.log(opts, 'aa');
    try {
      const response = await clientContractApi.apiClientContractPost(opts);

      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Client contract created successfully',
            type: 'success',
            duration: 3000,
          })
        );
        console.log(response.body.message);
        setStepThreeData(response.body.result);

        router.replace({
          pathname: `/admin/clients/view`,
          query: { guId: stepOneData?.uniqueGuid },
        });
      } else {
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
      console.log('post', response);
    } catch (error) {
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };

  const editClientsContract = async values => {
    const opts = {
      startDate: values?.startDate,
      endDate: values?.endDate,
      // status: values?.status,
      dateOfInvoice: values?.dateOfInvoice,
      uploadedFile: values?.uploadedFile,
      clientId: values?.clientId,
      id: values?.id,
    };
    try {
      const response = await clientContractApi.apiClientContractPut(opts);

      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Client contract updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        console.log(response.body.message);
        setStepThreeData(response.body.result);
        setActiveStep(activeStep + 1);
        router.replace({
          pathname: `/admin/clients/view`,
          query: { guId: stepOneData?.uniqueGuid },
        });
      } else {
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
      console.log('post', response);
    } catch (error) {
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };

  return (
    <MyFormContext.Provider
      value={{
        stepOneData,
        stepTwoData,
        stepThreeData,
        setStepOneData,
        setStepTwoData,
        setStepThreeData,
        setActiveStep,
        activeStep,
        operationType,
        setOperationType,
        EditData,
      }}
    >
      <Stepper activeStep={activeStep}>
        {stepTitles.map((title, index) => (
          <Step key={index}>
            <StepLabel>{title}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && <RegistrationForm onSubmit={handleStepOneSubmit} />}
      {activeStep === 1 && <ClientContactForm onSubmit={handleStepTwoSubmit} />}

      {activeStep === 2 && (
        <ClientContractForm onSubmit={handleStepThreeSubmit} />
      )}
    </MyFormContext.Provider>
  );
};

export default JDStepper;
