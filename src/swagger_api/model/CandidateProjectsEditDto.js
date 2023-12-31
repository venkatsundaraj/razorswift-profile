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
import {ProjectSkillEditDto} from './ProjectSkillEditDto';

/**
 * The CandidateProjectsEditDto model module.
 * @module model/CandidateProjectsEditDto
 * @version v3.76(UAT)
 */
export class CandidateProjectsEditDto {
  /**
   * Constructs a new <code>CandidateProjectsEditDto</code>.
   * @alias module:model/CandidateProjectsEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateProjectsEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateProjectsEditDto} obj Optional instance to populate.
   * @return {module:model/CandidateProjectsEditDto} The populated <code>CandidateProjectsEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateProjectsEditDto();
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
        obj.projectSkills = ApiClient.convertToType(data['projectSkills'], [ProjectSkillEditDto]);
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
CandidateProjectsEditDto.prototype.id = undefined;

/**
 * @member {String} title
 */
CandidateProjectsEditDto.prototype.title = undefined;

/**
 * @member {Boolean} isAcademic
 */
CandidateProjectsEditDto.prototype.isAcademic = undefined;

/**
 * @member {String} description
 */
CandidateProjectsEditDto.prototype.description = undefined;

/**
 * @member {String} responsibility
 */
CandidateProjectsEditDto.prototype.responsibility = undefined;

/**
 * @member {Date} startDate
 */
CandidateProjectsEditDto.prototype.startDate = undefined;

/**
 * @member {Date} endDate
 */
CandidateProjectsEditDto.prototype.endDate = undefined;

/**
 * @member {Array.<module:model/ProjectSkillEditDto>} projectSkills
 */
CandidateProjectsEditDto.prototype.projectSkills = undefined;

/**
 * @member {Number} employerId
 */
CandidateProjectsEditDto.prototype.employerId = undefined;

/**
 * @member {Number} candidateId
 */
CandidateProjectsEditDto.prototype.candidateId = undefined;

