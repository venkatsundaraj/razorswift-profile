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
import {AssessmentSkillFilterDto} from './AssessmentSkillFilterDto';
import {IntegrationDto} from './IntegrationDto';

/**
 * The AssessmentCompactDto model module.
 * @module model/AssessmentCompactDto
 * @version v3.76(UAT)
 */
export class AssessmentCompactDto {
  /**
   * Constructs a new <code>AssessmentCompactDto</code>.
   * @alias module:model/AssessmentCompactDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>AssessmentCompactDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AssessmentCompactDto} obj Optional instance to populate.
   * @return {module:model/AssessmentCompactDto} The populated <code>AssessmentCompactDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AssessmentCompactDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('title'))
        obj.title = ApiClient.convertToType(data['title'], 'String');
      if (data.hasOwnProperty('note'))
        obj.note = ApiClient.convertToType(data['note'], 'String');
      if (data.hasOwnProperty('isSelfAssessment'))
        obj.isSelfAssessment = ApiClient.convertToType(data['isSelfAssessment'], 'Boolean');
      if (data.hasOwnProperty('integrationId'))
        obj.integrationId = ApiClient.convertToType(data['integrationId'], 'Number');
      if (data.hasOwnProperty('integration'))
        obj.integration = IntegrationDto.constructFromObject(data['integration']);
      if (data.hasOwnProperty('assessmentSkills'))
        obj.assessmentSkills = ApiClient.convertToType(data['assessmentSkills'], [AssessmentSkillFilterDto]);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
AssessmentCompactDto.prototype.id = undefined;

/**
 * @member {String} title
 */
AssessmentCompactDto.prototype.title = undefined;

/**
 * @member {String} note
 */
AssessmentCompactDto.prototype.note = undefined;

/**
 * @member {Boolean} isSelfAssessment
 */
AssessmentCompactDto.prototype.isSelfAssessment = undefined;

/**
 * @member {Number} integrationId
 */
AssessmentCompactDto.prototype.integrationId = undefined;

/**
 * @member {module:model/IntegrationDto} integration
 */
AssessmentCompactDto.prototype.integration = undefined;

/**
 * @member {Array.<module:model/AssessmentSkillFilterDto>} assessmentSkills
 */
AssessmentCompactDto.prototype.assessmentSkills = undefined;

