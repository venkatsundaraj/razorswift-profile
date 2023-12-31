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
 * The SkillData model module.
 * @module model/SkillData
 * @version v3.76(UAT)
 */
export class SkillData {
  /**
   * Constructs a new <code>SkillData</code>.
   * @alias module:model/SkillData
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>SkillData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SkillData} obj Optional instance to populate.
   * @return {module:model/SkillData} The populated <code>SkillData</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new SkillData();
      if (data.hasOwnProperty('skillName'))
        obj.skillName = ApiClient.convertToType(data['skillName'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} skillName
 */
SkillData.prototype.skillName = undefined;

