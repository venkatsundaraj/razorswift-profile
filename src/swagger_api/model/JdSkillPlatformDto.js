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
import {JdSkillType} from './JdSkillType';
import {SkillLevel} from './SkillLevel';
import {SkillPlatformDto} from './SkillPlatformDto';

/**
 * The JdSkillPlatformDto model module.
 * @module model/JdSkillPlatformDto
 * @version v3.76(UAT)
 */
export class JdSkillPlatformDto {
  /**
   * Constructs a new <code>JdSkillPlatformDto</code>.
   * @alias module:model/JdSkillPlatformDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>JdSkillPlatformDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/JdSkillPlatformDto} obj Optional instance to populate.
   * @return {module:model/JdSkillPlatformDto} The populated <code>JdSkillPlatformDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new JdSkillPlatformDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('skillLevel'))
        obj.skillLevel = SkillLevel.constructFromObject(data['skillLevel']);
      if (data.hasOwnProperty('experienceInMonths'))
        obj.experienceInMonths = ApiClient.convertToType(data['experienceInMonths'], 'Number');
      if (data.hasOwnProperty('weightByCandidate'))
        obj.weightByCandidate = ApiClient.convertToType(data['weightByCandidate'], 'String');
      if (data.hasOwnProperty('skillType'))
        obj.skillType = JdSkillType.constructFromObject(data['skillType']);
      if (data.hasOwnProperty('occurrence'))
        obj.occurrence = ApiClient.convertToType(data['occurrence'], 'Number');
      if (data.hasOwnProperty('isHotSkill'))
        obj.isHotSkill = ApiClient.convertToType(data['isHotSkill'], 'Boolean');
      if (data.hasOwnProperty('isSelfVerified'))
        obj.isSelfVerified = ApiClient.convertToType(data['isSelfVerified'], 'Boolean');
      if (data.hasOwnProperty('jdSkillId'))
        obj.jdSkillId = ApiClient.convertToType(data['jdSkillId'], 'Number');
      if (data.hasOwnProperty('skillPlatformId'))
        obj.skillPlatformId = ApiClient.convertToType(data['skillPlatformId'], 'Number');
      if (data.hasOwnProperty('skillPlatform'))
        obj.skillPlatform = SkillPlatformDto.constructFromObject(data['skillPlatform']);
      if (data.hasOwnProperty('jobDescriptionId'))
        obj.jobDescriptionId = ApiClient.convertToType(data['jobDescriptionId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
JdSkillPlatformDto.prototype.id = undefined;

/**
 * @member {String} name
 */
JdSkillPlatformDto.prototype.name = undefined;

/**
 * @member {module:model/SkillLevel} skillLevel
 */
JdSkillPlatformDto.prototype.skillLevel = undefined;

/**
 * @member {Number} experienceInMonths
 */
JdSkillPlatformDto.prototype.experienceInMonths = undefined;

/**
 * @member {String} weightByCandidate
 */
JdSkillPlatformDto.prototype.weightByCandidate = undefined;

/**
 * @member {module:model/JdSkillType} skillType
 */
JdSkillPlatformDto.prototype.skillType = undefined;

/**
 * @member {Number} occurrence
 */
JdSkillPlatformDto.prototype.occurrence = undefined;

/**
 * @member {Boolean} isHotSkill
 */
JdSkillPlatformDto.prototype.isHotSkill = undefined;

/**
 * @member {Boolean} isSelfVerified
 */
JdSkillPlatformDto.prototype.isSelfVerified = undefined;

/**
 * @member {Number} jdSkillId
 */
JdSkillPlatformDto.prototype.jdSkillId = undefined;

/**
 * @member {Number} skillPlatformId
 */
JdSkillPlatformDto.prototype.skillPlatformId = undefined;

/**
 * @member {module:model/SkillPlatformDto} skillPlatform
 */
JdSkillPlatformDto.prototype.skillPlatform = undefined;

/**
 * @member {Number} jobDescriptionId
 */
JdSkillPlatformDto.prototype.jobDescriptionId = undefined;

