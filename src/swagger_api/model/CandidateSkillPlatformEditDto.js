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
import {SkillLevel} from './SkillLevel';

/**
 * The CandidateSkillPlatformEditDto model module.
 * @module model/CandidateSkillPlatformEditDto
 * @version v3.76(UAT)
 */
export class CandidateSkillPlatformEditDto {
  /**
   * Constructs a new <code>CandidateSkillPlatformEditDto</code>.
   * @alias module:model/CandidateSkillPlatformEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateSkillPlatformEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateSkillPlatformEditDto} obj Optional instance to populate.
   * @return {module:model/CandidateSkillPlatformEditDto} The populated <code>CandidateSkillPlatformEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateSkillPlatformEditDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('skillLevel'))
        obj.skillLevel = SkillLevel.constructFromObject(data['skillLevel']);
      if (data.hasOwnProperty('experienceInMonths'))
        obj.experienceInMonths = ApiClient.convertToType(data['experienceInMonths'], 'Number');
      if (data.hasOwnProperty('candidateSkillId'))
        obj.candidateSkillId = ApiClient.convertToType(data['candidateSkillId'], 'Number');
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
CandidateSkillPlatformEditDto.prototype.id = undefined;

/**
 * @member {String} name
 */
CandidateSkillPlatformEditDto.prototype.name = undefined;

/**
 * @member {module:model/SkillLevel} skillLevel
 */
CandidateSkillPlatformEditDto.prototype.skillLevel = undefined;

/**
 * @member {Number} experienceInMonths
 */
CandidateSkillPlatformEditDto.prototype.experienceInMonths = undefined;

/**
 * @member {Number} candidateSkillId
 */
CandidateSkillPlatformEditDto.prototype.candidateSkillId = undefined;

/**
 * @member {Number} skillPlatformId
 */
CandidateSkillPlatformEditDto.prototype.skillPlatformId = undefined;

/**
 * @member {Number} candidateId
 */
CandidateSkillPlatformEditDto.prototype.candidateId = undefined;

