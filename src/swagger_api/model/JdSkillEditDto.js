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
import {JdSkillPlatformEditDto} from './JdSkillPlatformEditDto';
import {JdSkillType} from './JdSkillType';

/**
 * The JdSkillEditDto model module.
 * @module model/JdSkillEditDto
 * @version v3.76(UAT)
 */
export class JdSkillEditDto {
  /**
   * Constructs a new <code>JdSkillEditDto</code>.
   * @alias module:model/JdSkillEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>JdSkillEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/JdSkillEditDto} obj Optional instance to populate.
   * @return {module:model/JdSkillEditDto} The populated <code>JdSkillEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new JdSkillEditDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('skillType'))
        obj.skillType = JdSkillType.constructFromObject(data['skillType']);
      if (data.hasOwnProperty('description'))
        obj.description = ApiClient.convertToType(data['description'], 'String');
      if (data.hasOwnProperty('experienceInYears'))
        obj.experienceInYears = ApiClient.convertToType(data['experienceInYears'], 'Number');
      if (data.hasOwnProperty('skillId'))
        obj.skillId = ApiClient.convertToType(data['skillId'], 'Number');
      if (data.hasOwnProperty('jobDescriptionId'))
        obj.jobDescriptionId = ApiClient.convertToType(data['jobDescriptionId'], 'Number');
      if (data.hasOwnProperty('jdSkillPlatforms'))
        obj.jdSkillPlatforms = ApiClient.convertToType(data['jdSkillPlatforms'], [JdSkillPlatformEditDto]);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
JdSkillEditDto.prototype.id = undefined;

/**
 * @member {String} name
 */
JdSkillEditDto.prototype.name = undefined;

/**
 * @member {module:model/JdSkillType} skillType
 */
JdSkillEditDto.prototype.skillType = undefined;

/**
 * @member {String} description
 */
JdSkillEditDto.prototype.description = undefined;

/**
 * @member {Number} experienceInYears
 */
JdSkillEditDto.prototype.experienceInYears = undefined;

/**
 * @member {Number} skillId
 */
JdSkillEditDto.prototype.skillId = undefined;

/**
 * @member {Number} jobDescriptionId
 */
JdSkillEditDto.prototype.jobDescriptionId = undefined;

/**
 * @member {Array.<module:model/JdSkillPlatformEditDto>} jdSkillPlatforms
 */
JdSkillEditDto.prototype.jdSkillPlatforms = undefined;

