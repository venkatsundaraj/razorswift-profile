/*
 * Extractor Engine API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v3.76(UAT)
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.50
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from '../ApiClient';
import {CompanyDto} from './CompanyDto';
import {JobProfileType} from './JobProfileType';
import {JobTitleDto} from './JobTitleDto';

/**
 * The CandidateEmployerDto model module.
 * @module model/CandidateEmployerDto
 * @version v3.76(UAT)
 */
export class CandidateEmployerDto {
  /**
   * Constructs a new <code>CandidateEmployerDto</code>.
   * @alias module:model/CandidateEmployerDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateEmployerDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateEmployerDto} obj Optional instance to populate.
   * @return {module:model/CandidateEmployerDto} The populated <code>CandidateEmployerDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateEmployerDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('companyName'))
        obj.companyName = ApiClient.convertToType(data['companyName'], 'String');
      if (data.hasOwnProperty('companyId'))
        obj.companyId = ApiClient.convertToType(data['companyId'], 'Number');
      if (data.hasOwnProperty('company'))
        obj.company = CompanyDto.constructFromObject(data['company']);
      if (data.hasOwnProperty('jobTitleName'))
        obj.jobTitleName = ApiClient.convertToType(data['jobTitleName'], 'String');
      if (data.hasOwnProperty('jobTitleId'))
        obj.jobTitleId = ApiClient.convertToType(data['jobTitleId'], 'Number');
      if (data.hasOwnProperty('jobTitle'))
        obj.jobTitle = JobTitleDto.constructFromObject(data['jobTitle']);
      if (data.hasOwnProperty('jobProfileType'))
        obj.jobProfileType = JobProfileType.constructFromObject(data['jobProfileType']);
      if (data.hasOwnProperty('startDate'))
        obj.startDate = ApiClient.convertToType(data['startDate'], 'Date');
      if (data.hasOwnProperty('endDate'))
        obj.endDate = ApiClient.convertToType(data['endDate'], 'Date');
      if (data.hasOwnProperty('isCurrentEmployer'))
        obj.isCurrentEmployer = ApiClient.convertToType(data['isCurrentEmployer'], 'Boolean');
      if (data.hasOwnProperty('jobDescription'))
        obj.jobDescription = ApiClient.convertToType(data['jobDescription'], 'String');
      if (data.hasOwnProperty('candidateId'))
        obj.candidateId = ApiClient.convertToType(data['candidateId'], 'Number');
      if (data.hasOwnProperty('experienceInMonths'))
        obj.experienceInMonths = ApiClient.convertToType(data['experienceInMonths'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CandidateEmployerDto.prototype.id = undefined;

/**
 * @member {String} companyName
 */
CandidateEmployerDto.prototype.companyName = undefined;

/**
 * @member {Number} companyId
 */
CandidateEmployerDto.prototype.companyId = undefined;

/**
 * @member {module:model/CompanyDto} company
 */
CandidateEmployerDto.prototype.company = undefined;

/**
 * @member {String} jobTitleName
 */
CandidateEmployerDto.prototype.jobTitleName = undefined;

/**
 * @member {Number} jobTitleId
 */
CandidateEmployerDto.prototype.jobTitleId = undefined;

/**
 * @member {module:model/JobTitleDto} jobTitle
 */
CandidateEmployerDto.prototype.jobTitle = undefined;

/**
 * @member {module:model/JobProfileType} jobProfileType
 */
CandidateEmployerDto.prototype.jobProfileType = undefined;

/**
 * @member {Date} startDate
 */
CandidateEmployerDto.prototype.startDate = undefined;

/**
 * @member {Date} endDate
 */
CandidateEmployerDto.prototype.endDate = undefined;

/**
 * @member {Boolean} isCurrentEmployer
 */
CandidateEmployerDto.prototype.isCurrentEmployer = undefined;

/**
 * @member {String} jobDescription
 */
CandidateEmployerDto.prototype.jobDescription = undefined;

/**
 * @member {Number} candidateId
 */
CandidateEmployerDto.prototype.candidateId = undefined;

/**
 * @member {Number} experienceInMonths
 */
CandidateEmployerDto.prototype.experienceInMonths = undefined;

