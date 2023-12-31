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
 * The Skill model module.
 * @module model/Skill
 * @version v3.76(UAT)
 */
export class Skill {
  /**
   * Constructs a new <code>Skill</code>.
   * @alias module:model/Skill
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>Skill</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Skill} obj Optional instance to populate.
   * @return {module:model/Skill} The populated <code>Skill</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Skill();
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('weight'))
        obj.weight = ApiClient.convertToType(data['weight'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {String} name
 */
Skill.prototype.name = undefined;

/**
 * @member {Number} weight
 */
Skill.prototype.weight = undefined;

