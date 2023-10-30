import { CandidateProfileApi } from '@/swagger_api/api/CandidateProfileApi';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { callApi } from '@/utils/apirequest';
import { createContext, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

export const DataContext = createContext();

export function DataProvider(props) {
  const [data, setData] = useState({});
  const [messages, setMessages] = useState();
  const userDetails = localStorageUtil.getItem('userDetails');
  const dispatch = useDispatch();
  const candidateProfileApi = new CandidateProfileApi();
  const guid = userDetails?.candidate?.uniqueGuid;
  async function GetData() {
    console.log('CandidateIdInfoGetSetTimeout');
    console.log(userDetails?.candidateId);
    console.log('start');
    try {
      const response =
        await candidateProfileApi.apiCandidateProfileGetByGuidGuidGet(guid);
      const normalization = response.body.result.normalizationStatus;
      if (response.body.message === 'Record Fetched Successfully.') {
        setData(response?.body?.result);

        if (
          normalization.isResumeUploaded &&
          (normalization.skillNormalizationStatus != 0 ||
            normalization.projectNormalizationStatu != 0)
        ) {
          CandidateGetData();
        }
      } else if (response.body.message) {
        // dispatch(setAlertPopup({ message: 'response.body.message', type: 'info', duration: 3000 }));
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }

  const CandidateGetData = async () => {
    console.log('CandidateIdInfoGetSetTimeout');
    console.log(userDetails?.candidateId);
    console.log('start');
    const startTime = Date.now(); // get the start time in milliseconds
    const interval = setInterval(async () => {
      await candidateProfileApi
        .apiCandidateProfileGetByGuidGuidGet(guid)
        .then(response => {
          const elapsedTime = Date.now() - startTime; // calculate elapsed time
          console.log('elapsed time', elapsedTime);
          const normalization = response.body.result.normalizationStatus;
          if (
            elapsedTime >= 300000 ||
            (normalization.isResumeUploaded &&
              (normalization.skillNormalizationStatus != 0 ||
                normalization.projectNormalizationStatus != 0))
          ) {
            console.log('end');
            clearInterval(interval);
          }
          if (response.body.message === 'Record Fetched Successfully.') {
            setData(response?.body?.result);
          } else if (response.body.message) {
            // dispatch(setAlertPopup({ message: 'response.body.message', type: 'info', duration: 3000 }));
          }
          console.log('else condition called');
        })
        .catch(error => {
          console.error(error);
        });
    }, 15 * 1000);
  };

  const GetErrorMessages = () => {
    callApi('ErrorMessages', data)
      .then(response => {
        console.log(response, 'errors messgaes');
        if (response.status === 200) {
          setMessages(response.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetData();
    GetErrorMessages();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData, messages, setMessages }}>
      {props.children}
    </DataContext.Provider>
  );
}
