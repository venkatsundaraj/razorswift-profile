import {
  ClientApi,
  JobDescriptionApi,
  MPathwayTypeApi,
  SkillPlatformApi,
} from '@/swagger_api/*';

export const skillPlatformApi = new SkillPlatformApi();
export const clientApi = new ClientApi();
export const jobDescriptionApi = new JobDescriptionApi();
export const pathwayTypeApi = new MPathwayTypeApi();
