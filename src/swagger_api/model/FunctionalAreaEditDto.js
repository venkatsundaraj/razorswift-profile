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
 * The FunctionalAreaEditDto model module.
 * @module model/FunctionalAreaEditDto
 * @version v3.76(UAT)
 */
export class FunctionalAreaEditDto {
  /**
   * Constructs a new <code>FunctionalAreaEditDto</code>.
   * @alias module:model/FunctionalAreaEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>FunctionalAreaEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FunctionalAreaEditDto} obj Optional instance to populate.
   * @return {module:model/FunctionalAreaEditDto} The populated <code>FunctionalAreaEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new FunctionalAreaEditDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
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
FunctionalAreaEditDto.prototype.id = undefined;

/**
 * @member {String} name
 */
FunctionalAreaEditDto.prototype.name = undefined;

/**
 * @member {String} description
 */
FunctionalAreaEditDto.prototype.description = undefined;

/**
 * @member {String} status
 */
FunctionalAreaEditDto.prototype.status = undefined;

