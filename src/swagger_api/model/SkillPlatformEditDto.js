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
 * The SkillPlatformEditDto model module.
 * @module model/SkillPlatformEditDto
 * @version v3.76(UAT)
 */
export class SkillPlatformEditDto {
  /**
   * Constructs a new <code>SkillPlatformEditDto</code>.
   * @alias module:model/SkillPlatformEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>SkillPlatformEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SkillPlatformEditDto} obj Optional instance to populate.
   * @return {module:model/SkillPlatformEditDto} The populated <code>SkillPlatformEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new SkillPlatformEditDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('searchText'))
        obj.searchText = ApiClient.convertToType(data['searchText'], 'String');
      if (data.hasOwnProperty('skillId'))
        obj.skillId = ApiClient.convertToType(data['skillId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
SkillPlatformEditDto.prototype.id = undefined;

/**
 * @member {String} name
 */
SkillPlatformEditDto.prototype.name = undefined;

/**
 * @member {String} searchText
 */
SkillPlatformEditDto.prototype.searchText = undefined;

/**
 * @member {Number} skillId
 */
SkillPlatformEditDto.prototype.skillId = undefined;

