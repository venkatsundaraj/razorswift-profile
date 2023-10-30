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
import {OntologyCompactDto} from './OntologyCompactDto';
import {PageResult} from './PageResult';

/**
 * The OntologyCompactDtoApiResponse model module.
 * @module model/OntologyCompactDtoApiResponse
 * @version v3.76(UAT)
 */
export class OntologyCompactDtoApiResponse {
  /**
   * Constructs a new <code>OntologyCompactDtoApiResponse</code>.
   * @alias module:model/OntologyCompactDtoApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>OntologyCompactDtoApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OntologyCompactDtoApiResponse} obj Optional instance to populate.
   * @return {module:model/OntologyCompactDtoApiResponse} The populated <code>OntologyCompactDtoApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new OntologyCompactDtoApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = OntologyCompactDto.constructFromObject(data['result']);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
OntologyCompactDtoApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
OntologyCompactDtoApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
OntologyCompactDtoApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
OntologyCompactDtoApiResponse.prototype.pageResult = undefined;

/**
 * @member {module:model/OntologyCompactDto} result
 */
OntologyCompactDtoApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
OntologyCompactDtoApiResponse.prototype.errors = undefined;

