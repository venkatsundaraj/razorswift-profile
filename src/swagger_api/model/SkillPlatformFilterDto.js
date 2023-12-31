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
import {SkillDto} from './SkillDto';

/**
 * The SkillPlatformFilterDto model module.
 * @module model/SkillPlatformFilterDto
 * @version v3.76(UAT)
 */
export class SkillPlatformFilterDto {
  /**
   * Constructs a new <code>SkillPlatformFilterDto</code>.
   * @alias module:model/SkillPlatformFilterDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>SkillPlatformFilterDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SkillPlatformFilterDto} obj Optional instance to populate.
   * @return {module:model/SkillPlatformFilterDto} The populated <code>SkillPlatformFilterDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new SkillPlatformFilterDto();
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('skillId'))
        obj.skillId = ApiClient.convertToType(data['skillId'], 'Number');
      if (data.hasOwnProperty('skill'))
        obj.skill = SkillDto.constructFromObject(data['skill']);
    }
    return obj;
  }
}

/**
 * @member {String} name
 */
SkillPlatformFilterDto.prototype.name = undefined;

/**
 * @member {Number} skillId
 */
SkillPlatformFilterDto.prototype.skillId = undefined;

/**
 * @member {module:model/SkillDto} skill
 */
SkillPlatformFilterDto.prototype.skill = undefined;

