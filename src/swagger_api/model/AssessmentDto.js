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
import {AssessmentSkillDto} from './AssessmentSkillDto';
import {IntegrationDto} from './IntegrationDto';

/**
 * The AssessmentDto model module.
 * @module model/AssessmentDto
 * @version v3.76(UAT)
 */
export class AssessmentDto {
  /**
   * Constructs a new <code>AssessmentDto</code>.
   * @alias module:model/AssessmentDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>AssessmentDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AssessmentDto} obj Optional instance to populate.
   * @return {module:model/AssessmentDto} The populated <code>AssessmentDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AssessmentDto();
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
      if (data.hasOwnProperty('isActive'))
        obj.isActive = ApiClient.convertToType(data['isActive'], 'Boolean');
      if (data.hasOwnProperty('isSelfAssessment'))
        obj.isSelfAssessment = ApiClient.convertToType(data['isSelfAssessment'], 'Boolean');
      if (data.hasOwnProperty('integrationId'))
        obj.integrationId = ApiClient.convertToType(data['integrationId'], 'Number');
      if (data.hasOwnProperty('integration'))
        obj.integration = IntegrationDto.constructFromObject(data['integration']);
      if (data.hasOwnProperty('assessmentSkills'))
        obj.assessmentSkills = ApiClient.convertToType(data['assessmentSkills'], [AssessmentSkillDto]);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
AssessmentDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
AssessmentDto.prototype.uniqueGuid = undefined;

/**
 * @member {Number} tpAssessmentId
 */
AssessmentDto.prototype.tpAssessmentId = undefined;

/**
 * @member {String} title
 */
AssessmentDto.prototype.title = undefined;

/**
 * @member {String} note
 */
AssessmentDto.prototype.note = undefined;

/**
 * @member {Boolean} isActive
 */
AssessmentDto.prototype.isActive = undefined;

/**
 * @member {Boolean} isSelfAssessment
 */
AssessmentDto.prototype.isSelfAssessment = undefined;

/**
 * @member {Number} integrationId
 */
AssessmentDto.prototype.integrationId = undefined;

/**
 * @member {module:model/IntegrationDto} integration
 */
AssessmentDto.prototype.integration = undefined;

/**
 * @member {Array.<module:model/AssessmentSkillDto>} assessmentSkills
 */
AssessmentDto.prototype.assessmentSkills = undefined;

