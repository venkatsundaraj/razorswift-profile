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
 * The AddressEditDto model module.
 * @module model/AddressEditDto
 * @version v3.76(UAT)
 */
export class AddressEditDto {
  /**
   * Constructs a new <code>AddressEditDto</code>.
   * @alias module:model/AddressEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>AddressEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AddressEditDto} obj Optional instance to populate.
   * @return {module:model/AddressEditDto} The populated <code>AddressEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AddressEditDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('street'))
        obj.street = ApiClient.convertToType(data['street'], 'String');
      if (data.hasOwnProperty('cityName'))
        obj.cityName = ApiClient.convertToType(data['cityName'], 'String');
      if (data.hasOwnProperty('zipCode'))
        obj.zipCode = ApiClient.convertToType(data['zipCode'], 'String');
      if (data.hasOwnProperty('formattedAddress'))
        obj.formattedAddress = ApiClient.convertToType(data['formattedAddress'], 'String');
      if (data.hasOwnProperty('type'))
        obj.type = ApiClient.convertToType(data['type'], 'String');
      if (data.hasOwnProperty('countryId'))
        obj.countryId = ApiClient.convertToType(data['countryId'], 'Number');
      if (data.hasOwnProperty('stateId'))
        obj.stateId = ApiClient.convertToType(data['stateId'], 'Number');
      if (data.hasOwnProperty('cityId'))
        obj.cityId = ApiClient.convertToType(data['cityId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
AddressEditDto.prototype.id = undefined;

/**
 * @member {String} street
 */
AddressEditDto.prototype.street = undefined;

/**
 * @member {String} cityName
 */
AddressEditDto.prototype.cityName = undefined;

/**
 * @member {String} zipCode
 */
AddressEditDto.prototype.zipCode = undefined;

/**
 * @member {String} formattedAddress
 */
AddressEditDto.prototype.formattedAddress = undefined;

/**
 * @member {String} type
 */
AddressEditDto.prototype.type = undefined;

/**
 * @member {Number} countryId
 */
AddressEditDto.prototype.countryId = undefined;

/**
 * @member {Number} stateId
 */
AddressEditDto.prototype.stateId = undefined;

/**
 * @member {Number} cityId
 */
AddressEditDto.prototype.cityId = undefined;

