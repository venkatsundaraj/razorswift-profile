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
 * The CandidateSkillPlatformCompactDto model module.
 * @module model/CandidateSkillPlatformCompactDto
 * @version v3.76(UAT)
 */
export class CandidateSkillPlatformCompactDto {
  /**
   * Constructs a new <code>CandidateSkillPlatformCompactDto</code>.
   * @alias module:model/CandidateSkillPlatformCompactDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateSkillPlatformCompactDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateSkillPlatformCompactDto} obj Optional instance to populate.
   * @return {module:model/CandidateSkillPlatformCompactDto} The populated <code>CandidateSkillPlatformCompactDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateSkillPlatformCompactDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('skillPlatformId'))
        obj.skillPlatformId = ApiClient.convertToType(data['skillPlatformId'], 'Number');
      if (data.hasOwnProperty('candidateId'))
        obj.candidateId = ApiClient.convertToType(data['candidateId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CandidateSkillPlatformCompactDto.prototype.id = undefined;

/**
 * @member {String} name
 */
CandidateSkillPlatformCompactDto.prototype.name = undefined;

/**
 * @member {Number} skillPlatformId
 */
CandidateSkillPlatformCompactDto.prototype.skillPlatformId = undefined;

/**
 * @member {Number} candidateId
 */
CandidateSkillPlatformCompactDto.prototype.candidateId = undefined;

