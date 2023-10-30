const config = {
  customization: {
    isOpen: [], // for active default menu
    fontFamily: 'urbanist',
    borderRadius: 4,
    opened: true,
    userInfo: null,
    labInfo: null,
    departmentInfo: null,
  },
  mainRoute: '/masters/',
  masterRoutes: {
    country: '/masters/country',
    state: '/masters/state',
    degree: '/masters/degree',
    degreealias: '/masters/degreealias',
    skill: '/masters/skill',
    skillalias: '/masters/skillplaform',
    hotskill: '/masters/hotskill',
    company: '/masters/company',
    companyalias: '/masters/companyalias',
    educationinstitute: '/masters/educationinstitute',
    language: '/masters/language',
    parser: '/masters/parser',
    jobtitle: '/masters/jobtitle',
    jobtitlealias: '/masters/jobtitlealias',
    city: '/masters/city',
  },
  get masterRoutesCopy() {
    return {
      country: `${this.mainRoute}country`,
      state: `${this.mainRoute}state`,
      degree: `${this.mainRoute}degree`,
      degreealias: `${this.mainRoute}degreealias`,
      skill: `${this.mainRoute}skill`,
      skillalias: `${this.mainRoute}skillplaform`,
      hotskill: `${this.mainRoute}hotskill`,
      company: `${this.mainRoute}company`,
      companyalias: `${this.mainRoute}companyalias`,
      educationinstitute: `${this.mainRoute}educationinstitute`,
      language: `${this.mainRoute}language`,
      parser: `${this.mainRoute}parser`,
      jobtitle: `${this.mainRoute}jobtitle`,
      jobtitlealias: `${this.mainRoute}jobtitlealias`,
      city: `${this.mainRoute}city`,
    };
  },

  //config.masterRoutesCopy.country

  countryIndiaCode: 77,
  ProdOld: 'https://razorswift.co.in/',
  Prod: 'https://app.razorswift.net/',
  Uat: 'https://app.razorswift.org/',
  local: 'http://192.168.1.140:99/',
  hosted: 'http://3.110.125.63/',
  countryCode: { name: 'India', code: 77 },
};

export default config;
