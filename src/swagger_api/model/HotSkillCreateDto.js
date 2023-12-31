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
 * The HotSkillCreateDto model module.
 * @module model/HotSkillCreateDto
 * @version v3.76(UAT)
 */
export class HotSkillCreateDto {
  /**
   * Constructs a new <code>HotSkillCreateDto</code>.
   * @alias module:model/HotSkillCreateDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>HotSkillCreateDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/HotSkillCreateDto} obj Optional instance to populate.
   * @return {module:model/HotSkillCreateDto} The populated <code>HotSkillCreateDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new HotSkillCreateDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('duration'))
        obj.duration = ApiClient.convertToType(data['duration'], 'String');
      if (data.hasOwnProperty('skillId'))
        obj.skillId = ApiClient.convertToType(data['skillId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
HotSkillCreateDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
HotSkillCreateDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
HotSkillCreateDto.prototype.name = undefined;

/**
 * @member {String} duration
 */
HotSkillCreateDto.prototype.duration = undefined;

/**
 * @member {Number} skillId
 */
HotSkillCreateDto.prototype.skillId = undefined;

