import axios from 'axios';
// import config from '../../config.js';

// const baseUrl = config.prodBasePath;

const ContactRequest =
  'https://bl5zgf5hjnfmiopwp6ns5iwdyu0hasls.lambda-url.ap-south-1.on.aws/';

const URL =
  'https://ufyv7etd3fg7ifivmubdhi7zny0swsrl.lambda-url.ap-south-1.on.aws/';

const AssessmentLink =
  'https://laeqpzdx4vewvflrslslrgwpnu0trrmm.lambda-url.ap-south-1.on.aws/';

const SlugSSRLink =
  'https://axp37c3cvzztul6bw7d3o32yqm0fihqk.lambda-url.ap-south-1.on.aws/';
const ErrorMessageLink =
  'https://yxmoggrpkepkuf2fcwuzhiyn7e0mkjit.lambda-url.ap-south-1.on.aws/';

const JdCandidateStatusUpdate =
  'https://yknwiscnxdpdirmuplqbigqcsi0arfdh.lambda-url.ap-south-1.on.aws/;';

const JdSkillExtractionApi =
  'https://lcstcb43c2k7p2vwrvjwe5coja0jzfoj.lambda-url.ap-south-1.on.aws/';
const JdTextExtraction =
  'https://cvpppq2kndqkx5dd7majoys3ra0kxlzg.lambda-url.ap-south-1.on.aws/';
const SearchCandidateList =
  'https://cxxqloptqgflor6r24nprv5haq0hlsvl.lambda-url.ap-south-1.on.aws/';

//DemoGetPathWayDetails
const GetPathwayTitle =
  'https://j5qvm76kqueysfazkgsaltxwqi0mtinj.lambda-url.ap-south-1.on.aws/';
//DemoGetEnrolledPathwaylist

const GetEnrolledPathwayDetails =
  'https://xpb4zfrydo2w655qwb5pi6lzj40nfnkz.lambda-url.ap-south-1.on.aws/';

//DemoGetPathWayExploreList

const GetEnrolledPathwayDetailsBasedOnJDandSkills =
  'https://vuziwh7mdm33zoonboa4bhvprm0vrsao.lambda-url.ap-south-1.on.aws/';

function callApi(path, cData) {
  const apiPaths = {
    contactRequest: ContactRequest,
    sendOtp: URL,
    resendOtpText: URL,
    resendOtpVoice: URL,
    verifyOtp: URL,
    InviteOrRequest: AssessmentLink,
    ListCandidateAssessment: AssessmentLink,
    ListCandidateRequest: AssessmentLink,
    AdminInviteCandidate: AssessmentLink,
    AdminRejectInvite: AssessmentLink,
    HeadSSR: SlugSSRLink,
    ErrorMessages: ErrorMessageLink,
    JdCandidateStatusUpdate: JdCandidateStatusUpdate,
    JdSkillExtractionApi: JdSkillExtractionApi,
    JdTextExtraction: JdTextExtraction,
    SearchCandidateList: SearchCandidateList,
    GetPathwayTitle: GetPathwayTitle,
    GetEnrolledPathwayDetails: GetEnrolledPathwayDetails,
    GetEnrolledPathwayDetailsBasedOnJDandSkills:
      GetEnrolledPathwayDetailsBasedOnJDandSkills,
  };
  let apiMethod = null;
  let apiUrl = null;
  let apiData = null;
  let apiHeaders = null;

  // apiHeaders = {
  //   'Content-Type': 'application/json',
  // };
  switch (path) {
    case 'sendOtp':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = {
        action: 'sendOtp',
        ...cData,
      };

      break;
    case 'contactRequest':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = cData;

      break;
    case 'resendOtpText':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        action: 'retryOtp',
        ...cData,
      };
      break;
    case 'resendOtpVoice':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        action: 'retryOtp',
        ...cData,
      };
      break;
    case 'verifyOtp':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        action: 'verifyOtp',
        ...cData,
      };
      break;
    case 'InviteOrRequest':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        action: 'invite_or_request',
        ...cData,
      };
      break;
    case 'ListCandidateAssessment':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        action: 'list_candidate_assessment',
        ...cData,
      };
      break;
    case 'ListCandidateRequest':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        action: 'list_all_requests',
        ...cData,
      };
      break;
    case 'AdminInviteCandidate':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        action: 'invite',
        ...cData,
      };
      break;
    case 'AdminRejectInvite':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        action: 'reject_request',
        ...cData,
      };
      break;
    case 'HeadSSR':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        ...cData,
      };
      break;
    case 'ErrorMessages':
      apiMethod = 'GET';
      apiUrl = apiPaths[path];
      // apiData = apiData = {
      //   ...cData,
      // };
      break;
    case 'JdCandidateStatusUpdate':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        ...cData,
      };
      break;
    case 'JdSkillExtractionApi':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        ...cData,
      };
      break;
    case 'JdTextExtraction':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        ...cData,
      };
      break;
    case 'SearchCandidateList':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        ...cData,
      };
      break;
    case 'GetPathwayTitle':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        ...cData,
      };
      break;
    case 'GetEnrolledPathwayDetails':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        ...cData,
      };
      break;
    case 'GetEnrolledPathwayDetailsBasedOnJDandSkills':
      apiMethod = 'POST';
      apiUrl = apiPaths[path];
      apiData = apiData = {
        ...cData,
      };
      break;

    default:
      break;
  }
  return axios({
    url: apiUrl,
    method: apiMethod,
    data: apiData,
    headers: apiHeaders,
  });
}

export { callApi };
