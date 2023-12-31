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
 * The StateCreateDto model module.
 * @module model/StateCreateDto
 * @version v3.76(UAT)
 */
export class StateCreateDto {
  /**
   * Constructs a new <code>StateCreateDto</code>.
   * @alias module:model/StateCreateDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>StateCreateDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/StateCreateDto} obj Optional instance to populate.
   * @return {module:model/StateCreateDto} The populated <code>StateCreateDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new StateCreateDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('code'))
        obj.code = ApiClient.convertToType(data['code'], 'String');
      if (data.hasOwnProperty('numericCode'))
        obj.numericCode = ApiClient.convertToType(data['numericCode'], 'Number');
      if (data.hasOwnProperty('countryId'))
        obj.countryId = ApiClient.convertToType(data['countryId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
StateCreateDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
StateCreateDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
StateCreateDto.prototype.name = undefined;

/**
 * @member {String} code
 */
StateCreateDto.prototype.code = undefined;

/**
 * @member {Number} numericCode
 */
StateCreateDto.prototype.numericCode = undefined;

/**
 * @member {Number} countryId
 */
StateCreateDto.prototype.countryId = undefined;

