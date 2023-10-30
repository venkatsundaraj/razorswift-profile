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
 * The FunctionalAreaCompactDto model module.
 * @module model/FunctionalAreaCompactDto
 * @version v3.76(UAT)
 */
export class FunctionalAreaCompactDto {
  /**
   * Constructs a new <code>FunctionalAreaCompactDto</code>.
   * @alias module:model/FunctionalAreaCompactDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>FunctionalAreaCompactDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FunctionalAreaCompactDto} obj Optional instance to populate.
   * @return {module:model/FunctionalAreaCompactDto} The populated <code>FunctionalAreaCompactDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new FunctionalAreaCompactDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
FunctionalAreaCompactDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
FunctionalAreaCompactDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
FunctionalAreaCompactDto.prototype.name = undefined;

