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
 * The LanguageCompactDto model module.
 * @module model/LanguageCompactDto
 * @version v3.76(UAT)
 */
export class LanguageCompactDto {
  /**
   * Constructs a new <code>LanguageCompactDto</code>.
   * @alias module:model/LanguageCompactDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>LanguageCompactDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/LanguageCompactDto} obj Optional instance to populate.
   * @return {module:model/LanguageCompactDto} The populated <code>LanguageCompactDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new LanguageCompactDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('code'))
        obj.code = ApiClient.convertToType(data['code'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
LanguageCompactDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
LanguageCompactDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
LanguageCompactDto.prototype.name = undefined;

/**
 * @member {String} code
 */
LanguageCompactDto.prototype.code = undefined;

