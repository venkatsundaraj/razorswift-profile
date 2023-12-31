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
 * The BusinessVerticalCreateDto model module.
 * @module model/BusinessVerticalCreateDto
 * @version v3.76(UAT)
 */
export class BusinessVerticalCreateDto {
  /**
   * Constructs a new <code>BusinessVerticalCreateDto</code>.
   * @alias module:model/BusinessVerticalCreateDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>BusinessVerticalCreateDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BusinessVerticalCreateDto} obj Optional instance to populate.
   * @return {module:model/BusinessVerticalCreateDto} The populated <code>BusinessVerticalCreateDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new BusinessVerticalCreateDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('description'))
        obj.description = ApiClient.convertToType(data['description'], 'String');
      if (data.hasOwnProperty('status'))
        obj.status = ApiClient.convertToType(data['status'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
BusinessVerticalCreateDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
BusinessVerticalCreateDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
BusinessVerticalCreateDto.prototype.name = undefined;

/**
 * @member {String} description
 */
BusinessVerticalCreateDto.prototype.description = undefined;

/**
 * @member {String} status
 */
BusinessVerticalCreateDto.prototype.status = undefined;

