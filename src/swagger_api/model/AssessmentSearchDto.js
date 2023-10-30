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
 * The AssessmentSearchDto model module.
 * @module model/AssessmentSearchDto
 * @version v3.76(UAT)
 */
export class AssessmentSearchDto {
  /**
   * Constructs a new <code>AssessmentSearchDto</code>.
   * @alias module:model/AssessmentSearchDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>AssessmentSearchDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AssessmentSearchDto} obj Optional instance to populate.
   * @return {module:model/AssessmentSearchDto} The populated <code>AssessmentSearchDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AssessmentSearchDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
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
      if (data.hasOwnProperty('isTagged'))
        obj.isTagged = ApiClient.convertToType(data['isTagged'], 'Boolean');
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
AssessmentSearchDto.prototype.id = undefined;

/**
 * @member {Number} tpAssessmentId
 */
AssessmentSearchDto.prototype.tpAssessmentId = undefined;

/**
 * @member {String} title
 */
AssessmentSearchDto.prototype.title = undefined;

/**
 * @member {String} note
 */
AssessmentSearchDto.prototype.note = undefined;

/**
 * @member {Boolean} isActive
 */
AssessmentSearchDto.prototype.isActive = undefined;

/**
 * @member {Boolean} isSelfAssessment
 */
AssessmentSearchDto.prototype.isSelfAssessment = undefined;

/**
 * @member {Boolean} isTagged
 */
AssessmentSearchDto.prototype.isTagged = undefined;

/**
 * @member {Number} integrationId
 */
AssessmentSearchDto.prototype.integrationId = undefined;

/**
 * @member {module:model/IntegrationDto} integration
 */
AssessmentSearchDto.prototype.integration = undefined;

/**
 * @member {Array.<module:model/AssessmentSkillDto>} assessmentSkills
 */
AssessmentSearchDto.prototype.assessmentSkills = undefined;

