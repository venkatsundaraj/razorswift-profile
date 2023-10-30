export const UrlPaths = {
  adminJd: '/admin/jobs/',
  clientJd: '/client/jobs/',
};

export const MainURL = '/admin/pathway_masters';

export const AdminSpecialMainUrl = '/admin/admin_specials';
export const CrudUrl = {
  create: '/create',
  edit: '/edit',
  view: '/view',
};
export const PathwayURLMasters = {
  pathway_type: '/pathway_type',
  pathway_attribute: '/pathway_attribute',
  pathway_outcome: '/pathway_outcome',
  pathway_outcome_attribute: '/pathway_outcome_attribute',
  step: '/step',
  step_text: '/step_text',
  step_attribute: '/step_attribute',
  step_outcome: '/step_outcome',
  step_outcome_communication: '/step_outcome/step_outcome_communication',
  course: '/course',
  content: '/course/content',
};
export const GeneratedURLs = Object.keys(PathwayURLMasters).reduce(
  (acc, key) => {
    acc[key] = {
      main: `${MainURL}${PathwayURLMasters[key]}`,
      create: `${MainURL}${PathwayURLMasters[key]}${CrudUrl.create}`,
      edit: `${MainURL}${PathwayURLMasters[key]}${CrudUrl.edit}`,
      view: `${MainURL}${PathwayURLMasters[key]}${CrudUrl.view}`,
    };
    return acc;
  },
  {}
);

export const AdminSpecialUrl = {
  skill: '/skill',
  skillPlatform: '/skill_platform',
};

export const GeneratedMasterURLs = Object.keys(AdminSpecialUrl).reduce(
  (acc, key) => {
    acc[key] = {
      list: `${AdminSpecialMainUrl}${AdminSpecialUrl[key]}`,
      create: `${AdminSpecialMainUrl}${AdminSpecialUrl[key]}${CrudUrl.create}`,
      edit: `${AdminSpecialMainUrl}${AdminSpecialUrl[key]}${CrudUrl.edit}`,
      view: `${AdminSpecialMainUrl}${AdminSpecialUrl[key]}${CrudUrl.view}`,
    };
    return acc;
  },
  {}
);

//console.log(GeneratedURLs.pathway_type.create); // Outputs: "/admin/pathway_masters/pathway_type/create"
