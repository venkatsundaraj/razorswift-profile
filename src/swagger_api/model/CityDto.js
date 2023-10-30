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
import {StateDto} from './StateDto';

/**
 * The CityDto model module.
 * @module model/CityDto
 * @version v3.76(UAT)
 */
export class CityDto {
  /**
   * Constructs a new <code>CityDto</code>.
   * @alias module:model/CityDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CityDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CityDto} obj Optional instance to populate.
   * @return {module:model/CityDto} The populated <code>CityDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CityDto();
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
      if (data.hasOwnProperty('state'))
        obj.state = StateDto.constructFromObject(data['state']);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CityDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
CityDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
CityDto.prototype.name = undefined;

/**
 * @member {String} code
 */
CityDto.prototype.code = undefined;

/**
 * @member {Number} pinCode
 */
CityDto.prototype.pinCode = undefined;

/**
 * @member {Number} stdCode
 */
CityDto.prototype.stdCode = undefined;

/**
 * @member {Number} stateId
 */
CityDto.prototype.stateId = undefined;

/**
 * @member {module:model/StateDto} state
 */
CityDto.prototype.state = undefined;

