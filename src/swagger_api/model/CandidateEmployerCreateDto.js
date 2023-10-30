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
import {JobProfileType} from './JobProfileType';

/**
 * The CandidateEmployerCreateDto model module.
 * @module model/CandidateEmployerCreateDto
 * @version v3.76(UAT)
 */
export class CandidateEmployerCreateDto {
  /**
   * Constructs a new <code>CandidateEmployerCreateDto</code>.
   * @alias module:model/CandidateEmployerCreateDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateEmployerCreateDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateEmployerCreateDto} obj Optional instance to populate.
   * @return {module:model/CandidateEmployerCreateDto} The populated <code>CandidateEmployerCreateDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateEmployerCreateDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('companyName'))
        obj.companyName = ApiClient.convertToType(data['companyName'], 'String');
      if (data.hasOwnProperty('companyId'))
        obj.companyId = ApiClient.convertToType(data['companyId'], 'Number');
      if (data.hasOwnProperty('jobTitleName'))
        obj.jobTitleName = ApiClient.convertToType(data['jobTitleName'], 'String');
      if (data.hasOwnProperty('jobTitleId'))
        obj.jobTitleId = ApiClient.convertToType(data['jobTitleId'], 'Number');
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
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CandidateEmployerCreateDto.prototype.id = undefined;

/**
 * @member {String} companyName
 */
CandidateEmployerCreateDto.prototype.companyName = undefined;

/**
 * @member {Number} companyId
 */
CandidateEmployerCreateDto.prototype.companyId = undefined;

/**
 * @member {String} jobTitleName
 */
CandidateEmployerCreateDto.prototype.jobTitleName = undefined;

/**
 * @member {Number} jobTitleId
 */
CandidateEmployerCreateDto.prototype.jobTitleId = undefined;

/**
 * @member {module:model/JobProfileType} jobProfileType
 */
CandidateEmployerCreateDto.prototype.jobProfileType = undefined;

/**
 * @member {Date} startDate
 */
CandidateEmployerCreateDto.prototype.startDate = undefined;

/**
 * @member {Date} endDate
 */
CandidateEmployerCreateDto.prototype.endDate = undefined;

/**
 * @member {Boolean} isCurrentEmployer
 */
CandidateEmployerCreateDto.prototype.isCurrentEmployer = undefined;

/**
 * @member {String} jobDescription
 */
CandidateEmployerCreateDto.prototype.jobDescription = undefined;

/**
 * @member {Number} candidateId
 */
CandidateEmployerCreateDto.prototype.candidateId = undefined;

