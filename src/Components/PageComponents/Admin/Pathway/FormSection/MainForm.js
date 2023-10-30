import { useContext, useMemo, useState } from 'react';

import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { UrlPaths } from '@/src/data/UrlPaths';
import { JobDescriptionApi } from '@/swagger_api/*';
import { useRouter } from 'next/router';
import { createContext } from 'react';
import { useDispatch } from 'react-redux';
import DraggableForm from './DraggableForm';
import NormalForm from './NormalForm';

export const FormPathwayContext = createContext({});

const MainForm = ({ type, role }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, setLoading } = useContext(LoadingContext);
  const UrlBase =
    role === 'Admin' ? `${UrlPaths.adminJd}` : `${UrlPaths.clientJd}`;
  const [activeStep, setActiveStep] = useState(0);
  const [stepOneData, setStepOneData] = useState(null);
  const [stepTwoData, setStepTwoData] = useState(null);
  const [stepThreeData, setStepThreeData] = useState(null);
  const [operationType, setOperationType] = useState(type || 'add');
  const jobDescriptionApi = useMemo(() => new JobDescriptionApi(), []);

  return (
    <FormPathwayContext.Provider
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

        role,
      }}
    >
      <NormalForm />
      <DraggableForm />
    </FormPathwayContext.Provider>
  );
};

export default MainForm;
