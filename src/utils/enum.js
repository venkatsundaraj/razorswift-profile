export const SocialMediaPlatform = {
  LinkedIn: 1,
  Twitter: 2,
  Instagram: 3,
  GitHub: 4,
  Other: 5,
};
export const AcceptanceType = {
  Acceptance: 1,
  AcceptanceByClient: 2,
};

export const AcceptedStatus = {
  Open: 1,
  Accepted: 2,
  Rejected: 3,
  Inprogress: 4,
  Closed: 5,
  Deactivate: 6,
  // acepted and closed same intesd of accept 2 5 should be sent
};

export const ClientAcceptedStatus = {
  YetToRespond: 1,
  Accepted: 2,
  Rejected: 3,
};

export const sourceSequenceEnum = {
  'Schedule Assessment': 1,
  'Update Assessment Result': 2,
  'Schedule Interview': 3,
  'Update Interview Result': 4,
  'Offer roll out': 5,
  'Accept offer': 6,
  'Accept joining': 7,
};
export const reversedSourceSequenceEnum = {
  1: 'Schedule Assessment',
  2: 'Update Assessment Result',
  3: 'Schedule Interview',
  4: 'Update Interview Result',
  5: 'Offer roll out',
  6: 'Accept offer',
  7: 'Accept joining',
};

export const resultStatusEnum = {
  Passed: 1,
  Rejected: 2,
  YetToBeSchedule: 0,
};
export const progressiveStatusEnum = {
  Scheduled: 1,
  Inprogress: 2,
  Completed: 3,
};

export const taggedOrUntaggedEnum = new Map([
  [true, 1],
  [false, 2],
  [null, 2],
]);

export const roundsStatus = {
  Accept: 'AC',
  Reject: 'RJ',
};

// export const InterviewStatus = {
//   Pass: 1,
//   Fail: 2,
// };
export const InterviewStatus = {
  Pass: 1,
  Fail: 2,
};
export const typeOfViewer = {
  jobs: 'jd',
  aspirant: 'aspirant',
};
export const roleOfViewer = {
  candidate: 'candidate',
  admin: 'aspirant',
  client: 'client',
};
export const modeType = {
  edit: 'edit',
  view: 'view',
};
