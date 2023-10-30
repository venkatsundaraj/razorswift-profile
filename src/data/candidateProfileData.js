export const candidateProfileData = {
  profileImage: {
    profileImageURL: 'www.google.com',
  },
  profileHeadLine: {
    profileHeadLine: 'test profile head line',
  },
  candidatePersonalData: {
    id: 1,
    email: 'charlie@gmail.com',
    contactNumber: '9876543210',
    firstName: 'Charlie',
    middleName: '',
    lastName: 'Chaplin',
    fullName: 'Charlie Chaplin',
    isStudent: false,
    dateOfBirth: '2023-02-14T08:52:55.772Z',
    gender: 1,
    institutionName: 'University of Oxford',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    isFresher: false,
  },
  socialMediaWebsite: [
    {
      id: 1,
      url: 'linked.com',
      socialMediaType: 1,
    },
    {
      id: 2,
      url: 'git.com',
      socialMediaType: 2,
    },
  ],
  expertise: [
    {
      id: 1,
      skillName: 'Software engineer',
    },
    {
      id: 2,
      skillName: 'Developer',
    },
  ],
  softSkill: [
    {
      id: 1,
      skillName: 'Commnication',
    },
    {
      id: 2,
      skillName: 'Leadership',
    },
  ],
  technicalSkill: [
    {
      id: 1,
      skillName: 'Angular',
      expierenceInMonths: '12',
      technicalSkillAlias: [
        {
          id: 1,
          skillAliasName: 'Angualar v1.0',
          expierenceInMonths: '2',
          weight: '50%',
          level: 'Intermediate',
        },
        {
          id: 2,
          skillAliasName: 'Angualar v2.0',
          expierenceInMonths: '10',
          weight: '80%',
          level: 'Expert',
        },
      ],
    },
    {
      id: 2,
      skillName: 'HTML',
      expierenceInMonths: '24',
      technicalSkillAlias: [
        {
          id: 1,
          skillAliasName: 'HTML v1.0',
          expierenceInMonths: '12',
          weight: '50%',
          level: 'Intermediate',
        },
        {
          id: 2,
          skillAliasName: 'HTML v2.0',
          expierenceInMonths: '12',
          weight: '80%',
          level: 'Expert',
        },
      ],
    },
  ],
  expierenceTimeLine: [
    {
      id: 1,
      expierence: 1,
      startDate: '2019-02-14T13:27:22.963Z',
      endDate: '2020-02-14T13:27:22.963Z',
      name: 'Kannada School',
      jobTitle: '',
      degereeName: 'SSLC',
      expierenceInMonths: null,
      isCurrentEmployee: false,
    },
    {
      id: 2,
      expierence: 1,
      startDate: '2020-02-14T13:27:22.963Z',
      endDate: null,
      name: 'VCNR',
      jobTitle: 'Staff',
      degereeName: '',
      expierenceInMonths: '48',
      isCurrentEmployee: true,
    },
  ],
  qualificationTimeLine: [
    {
      startDate: null,
      endDate: '2018-12-31T00:00:00+00:00',
      name: 'Malnad College of Engineering',
      degree: 'Bachelor of Engineering',
      fieldOfStudy: null,
      expierenceInMonths: null,
      id: 35,
    },
    {
      startDate: null,
      endDate: '2015-12-31T00:00:00+00:00',
      name: 'Government Polytechnic',
      degree: null,
      fieldOfStudy: null,
      expierenceInMonths: null,
      id: 36,
    },
    {
      startDate: null,
      endDate: '2012-12-31T00:00:00+00:00',
      name: 'Sri Siddhartha High School',
      degree: 'Secondary School Certificate',
      fieldOfStudy: null,
      expierenceInMonths: null,
      id: 37,
    },
  ],
};
