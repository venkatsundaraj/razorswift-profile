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
import {AssessmentSkillCreateDto} from './AssessmentSkillCreateDto';

/**
 * The AssessmentCreateDto model module.
 * @module model/AssessmentCreateDto
 * @version v3.76(UAT)
 */
export class AssessmentCreateDto {
  /**
   * Constructs a new <code>AssessmentCreateDto</code>.
   * @alias module:model/AssessmentCreateDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>AssessmentCreateDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AssessmentCreateDto} obj Optional instance to populate.
   * @return {module:model/AssessmentCreateDto} The populated <code>AssessmentCreateDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AssessmentCreateDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('tpAssessmentId'))
        obj.tpAssessmentId = ApiClient.convertToType(data['tpAssessmentId'], 'Number');
      if (data.hasOwnProperty('title'))
        obj.title = ApiClient.convertToType(data['title'], 'String');
      if (data.hasOwnProperty('note'))
        obj.note = ApiClient.convertToType(data['note'], 'String');
      if (data.hasOwnProperty('isSelfAssessment'))
        obj.isSelfAssessment = ApiClient.convertToType(data['isSelfAssessment'], 'Boolean');
      if (data.hasOwnProperty('integrationId'))
        obj.integrationId = ApiClient.convertToType(data['integrationId'], 'Number');
      if (data.hasOwnProperty('assessmentSkills'))
        obj.assessmentSkills = ApiClient.convertToType(data['assessmentSkills'], [AssessmentSkillCreateDto]);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
AssessmentCreateDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
AssessmentCreateDto.prototype.uniqueGuid = undefined;

/**
 * @member {Number} tpAssessmentId
 */
AssessmentCreateDto.prototype.tpAssessmentId = undefined;

/**
 * @member {String} title
 */
AssessmentCreateDto.prototype.title = undefined;

/**
 * @member {String} note
 */
AssessmentCreateDto.prototype.note = undefined;

/**
 * @member {Boolean} isSelfAssessment
 */
AssessmentCreateDto.prototype.isSelfAssessment = undefined;

/**
 * @member {Number} integrationId
 */
AssessmentCreateDto.prototype.integrationId = undefined;

/**
 * @member {Array.<module:model/AssessmentSkillCreateDto>} assessmentSkills
 */
AssessmentCreateDto.prototype.assessmentSkills = undefined;

