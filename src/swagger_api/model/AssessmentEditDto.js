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
 * The AssessmentEditDto model module.
 * @module model/AssessmentEditDto
 * @version v3.76(UAT)
 */
export class AssessmentEditDto {
  /**
   * Constructs a new <code>AssessmentEditDto</code>.
   * @alias module:model/AssessmentEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>AssessmentEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AssessmentEditDto} obj Optional instance to populate.
   * @return {module:model/AssessmentEditDto} The populated <code>AssessmentEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AssessmentEditDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
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
AssessmentEditDto.prototype.id = undefined;

/**
 * @member {Number} tpAssessmentId
 */
AssessmentEditDto.prototype.tpAssessmentId = undefined;

/**
 * @member {String} title
 */
AssessmentEditDto.prototype.title = undefined;

/**
 * @member {String} note
 */
AssessmentEditDto.prototype.note = undefined;

/**
 * @member {Boolean} isSelfAssessment
 */
AssessmentEditDto.prototype.isSelfAssessment = undefined;

/**
 * @member {Number} integrationId
 */
AssessmentEditDto.prototype.integrationId = undefined;

/**
 * @member {Array.<module:model/AssessmentSkillCreateDto>} assessmentSkills
 */
AssessmentEditDto.prototype.assessmentSkills = undefined;

