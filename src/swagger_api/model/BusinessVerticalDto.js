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
 * The BusinessVerticalDto model module.
 * @module model/BusinessVerticalDto
 * @version v3.76(UAT)
 */
export class BusinessVerticalDto {
  /**
   * Constructs a new <code>BusinessVerticalDto</code>.
   * @alias module:model/BusinessVerticalDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>BusinessVerticalDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BusinessVerticalDto} obj Optional instance to populate.
   * @return {module:model/BusinessVerticalDto} The populated <code>BusinessVerticalDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new BusinessVerticalDto();
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
BusinessVerticalDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
BusinessVerticalDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
BusinessVerticalDto.prototype.name = undefined;

/**
 * @member {String} description
 */
BusinessVerticalDto.prototype.description = undefined;

/**
 * @member {String} status
 */
BusinessVerticalDto.prototype.status = undefined;

