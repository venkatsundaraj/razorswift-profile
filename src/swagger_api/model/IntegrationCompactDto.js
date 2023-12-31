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
 * The IntegrationCompactDto model module.
 * @module model/IntegrationCompactDto
 * @version v3.76(UAT)
 */
export class IntegrationCompactDto {
  /**
   * Constructs a new <code>IntegrationCompactDto</code>.
   * @alias module:model/IntegrationCompactDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>IntegrationCompactDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/IntegrationCompactDto} obj Optional instance to populate.
   * @return {module:model/IntegrationCompactDto} The populated <code>IntegrationCompactDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new IntegrationCompactDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('companyName'))
        obj.companyName = ApiClient.convertToType(data['companyName'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
IntegrationCompactDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
IntegrationCompactDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} companyName
 */
IntegrationCompactDto.prototype.companyName = undefined;

