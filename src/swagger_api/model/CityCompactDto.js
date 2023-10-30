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
 * The CityCompactDto model module.
 * @module model/CityCompactDto
 * @version v3.76(UAT)
 */
export class CityCompactDto {
  /**
   * Constructs a new <code>CityCompactDto</code>.
   * @alias module:model/CityCompactDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CityCompactDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CityCompactDto} obj Optional instance to populate.
   * @return {module:model/CityCompactDto} The populated <code>CityCompactDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CityCompactDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('code'))
        obj.code = ApiClient.convertToType(data['code'], 'String');
      if (data.hasOwnProperty('pinCode'))
        obj.pinCode = ApiClient.convertToType(data['pinCode'], 'Number');
      if (data.hasOwnProperty('stdCode'))
        obj.stdCode = ApiClient.convertToType(data['stdCode'], 'Number');
      if (data.hasOwnProperty('stateId'))
        obj.stateId = ApiClient.convertToType(data['stateId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CityCompactDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
CityCompactDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
CityCompactDto.prototype.name = undefined;

/**
 * @member {String} code
 */
CityCompactDto.prototype.code = undefined;

/**
 * @member {Number} pinCode
 */
CityCompactDto.prototype.pinCode = undefined;

/**
 * @member {Number} stdCode
 */
CityCompactDto.prototype.stdCode = undefined;

/**
 * @member {Number} stateId
 */
CityCompactDto.prototype.stateId = undefined;

