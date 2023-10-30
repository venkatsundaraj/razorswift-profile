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

/**
 * The ProjectSkillCreateDto model module.
 * @module model/ProjectSkillCreateDto
 * @version v3.76(UAT)
 */
export class ProjectSkillCreateDto {
  /**
   * Constructs a new <code>ProjectSkillCreateDto</code>.
   * @alias module:model/ProjectSkillCreateDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ProjectSkillCreateDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProjectSkillCreateDto} obj Optional instance to populate.
   * @return {module:model/ProjectSkillCreateDto} The populated <code>ProjectSkillCreateDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ProjectSkillCreateDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('skillPlatformName'))
        obj.skillPlatformName = ApiClient.convertToType(data['skillPlatformName'], 'String');
      if (data.hasOwnProperty('candidateSkillPlatformId'))
        obj.candidateSkillPlatformId = ApiClient.convertToType(data['candidateSkillPlatformId'], 'Number');
      if (data.hasOwnProperty('projectId'))
        obj.projectId = ApiClient.convertToType(data['projectId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
ProjectSkillCreateDto.prototype.id = undefined;

/**
 * @member {String} skillPlatformName
 */
ProjectSkillCreateDto.prototype.skillPlatformName = undefined;

/**
 * @member {Number} candidateSkillPlatformId
 */
ProjectSkillCreateDto.prototype.candidateSkillPlatformId = undefined;

/**
 * @member {Number} projectId
 */
ProjectSkillCreateDto.prototype.projectId = undefined;

