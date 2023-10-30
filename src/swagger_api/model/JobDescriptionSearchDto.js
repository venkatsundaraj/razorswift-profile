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
import {CandidateSkillPlatformCompactDto} from './CandidateSkillPlatformCompactDto';
import {SkillData} from './SkillData';

/**
 * The JobDescriptionSearchDto model module.
 * @module model/JobDescriptionSearchDto
 * @version v3.76(UAT)
 */
export class JobDescriptionSearchDto {
  /**
   * Constructs a new <code>JobDescriptionSearchDto</code>.
   * @alias module:model/JobDescriptionSearchDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>JobDescriptionSearchDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/JobDescriptionSearchDto} obj Optional instance to populate.
   * @return {module:model/JobDescriptionSearchDto} The populated <code>JobDescriptionSearchDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new JobDescriptionSearchDto();
      if (data.hasOwnProperty('candidateId'))
        obj.candidateId = ApiClient.convertToType(data['candidateId'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
      if (data.hasOwnProperty('contact'))
        obj.contact = ApiClient.convertToType(data['contact'], 'String');
      if (data.hasOwnProperty('slug'))
        obj.slug = ApiClient.convertToType(data['slug'], 'String');
      if (data.hasOwnProperty('isAttachedtoJD'))
        obj.isAttachedtoJD = ApiClient.convertToType(data['isAttachedtoJD'], 'Boolean');
      if (data.hasOwnProperty('foundSkills'))
        obj.foundSkills = ApiClient.convertToType(data['foundSkills'], [SkillData]);
      if (data.hasOwnProperty('skills'))
        obj.skills = ApiClient.convertToType(data['skills'], [CandidateSkillPlatformCompactDto]);
    }
    return obj;
  }
}

/**
 * @member {Number} candidateId
 */
JobDescriptionSearchDto.prototype.candidateId = undefined;

/**
 * @member {String} name
 */
JobDescriptionSearchDto.prototype.name = undefined;

/**
 * @member {String} email
 */
JobDescriptionSearchDto.prototype.email = undefined;

/**
 * @member {String} contact
 */
JobDescriptionSearchDto.prototype.contact = undefined;

/**
 * @member {String} slug
 */
JobDescriptionSearchDto.prototype.slug = undefined;

/**
 * @member {Boolean} isAttachedtoJD
 */
JobDescriptionSearchDto.prototype.isAttachedtoJD = undefined;

/**
 * @member {Array.<module:model/SkillData>} foundSkills
 */
JobDescriptionSearchDto.prototype.foundSkills = undefined;

/**
 * @member {Array.<module:model/CandidateSkillPlatformCompactDto>} skills
 */
JobDescriptionSearchDto.prototype.skills = undefined;

