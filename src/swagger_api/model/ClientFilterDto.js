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
 * The ClientFilterDto model module.
 * @module model/ClientFilterDto
 * @version v3.76(UAT)
 */
export class ClientFilterDto {
  /**
   * Constructs a new <code>ClientFilterDto</code>.
   * @alias module:model/ClientFilterDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ClientFilterDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClientFilterDto} obj Optional instance to populate.
   * @return {module:model/ClientFilterDto} The populated <code>ClientFilterDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ClientFilterDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
ClientFilterDto.prototype.id = undefined;

/**
 * @member {String} name
 */
ClientFilterDto.prototype.name = undefined;

