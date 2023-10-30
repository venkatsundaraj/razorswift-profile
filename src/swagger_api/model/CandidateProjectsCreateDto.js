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
import {ProjectSkillCreateDto} from './ProjectSkillCreateDto';

/**
 * The CandidateProjectsCreateDto model module.
 * @module model/CandidateProjectsCreateDto
 * @version v3.76(UAT)
 */
export class CandidateProjectsCreateDto {
  /**
   * Constructs a new <code>CandidateProjectsCreateDto</code>.
   * @alias module:model/CandidateProjectsCreateDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateProjectsCreateDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateProjectsCreateDto} obj Optional instance to populate.
   * @return {module:model/CandidateProjectsCreateDto} The populated <code>CandidateProjectsCreateDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateProjectsCreateDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('title'))
        obj.title = ApiClient.convertToType(data['title'], 'String');
      if (data.hasOwnProperty('isAcademic'))
        obj.isAcademic = ApiClient.convertToType(data['isAcademic'], 'Boolean');
      if (data.hasOwnProperty('description'))
        obj.description = ApiClient.convertToType(data['description'], 'String');
      if (data.hasOwnProperty('responsibility'))
        obj.responsibility = ApiClient.convertToType(data['responsibility'], 'String');
      if (data.hasOwnProperty('startDate'))
        obj.startDate = ApiClient.convertToType(data['startDate'], 'Date');
      if (data.hasOwnProperty('endDate'))
        obj.endDate = ApiClient.convertToType(data['endDate'], 'Date');
      if (data.hasOwnProperty('projectSkills'))
        obj.projectSkills = ApiClient.convertToType(data['projectSkills'], [ProjectSkillCreateDto]);
      if (data.hasOwnProperty('employerId'))
        obj.employerId = ApiClient.convertToType(data['employerId'], 'Number');
      if (data.hasOwnProperty('candidateId'))
        obj.candidateId = ApiClient.convertToType(data['candidateId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CandidateProjectsCreateDto.prototype.id = undefined;

/**
 * @member {String} title
 */
CandidateProjectsCreateDto.prototype.title = undefined;

/**
 * @member {Boolean} isAcademic
 */
CandidateProjectsCreateDto.prototype.isAcademic = undefined;

/**
 * @member {String} description
 */
CandidateProjectsCreateDto.prototype.description = undefined;

/**
 * @member {String} responsibility
 */
CandidateProjectsCreateDto.prototype.responsibility = undefined;

/**
 * @member {Date} startDate
 */
CandidateProjectsCreateDto.prototype.startDate = undefined;

/**
 * @member {Date} endDate
 */
CandidateProjectsCreateDto.prototype.endDate = undefined;

/**
 * @member {Array.<module:model/ProjectSkillCreateDto>} projectSkills
 */
CandidateProjectsCreateDto.prototype.projectSkills = undefined;

/**
 * @member {Number} employerId
 */
CandidateProjectsCreateDto.prototype.employerId = undefined;

/**
 * @member {Number} candidateId
 */
CandidateProjectsCreateDto.prototype.candidateId = undefined;

