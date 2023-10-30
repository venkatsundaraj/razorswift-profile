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
import {FunctionalAreaCompactDto} from './FunctionalAreaCompactDto';
import {PageResult} from './PageResult';

/**
 * The FunctionalAreaCompactDtoApiResponse model module.
 * @module model/FunctionalAreaCompactDtoApiResponse
 * @version v3.76(UAT)
 */
export class FunctionalAreaCompactDtoApiResponse {
  /**
   * Constructs a new <code>FunctionalAreaCompactDtoApiResponse</code>.
   * @alias module:model/FunctionalAreaCompactDtoApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>FunctionalAreaCompactDtoApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FunctionalAreaCompactDtoApiResponse} obj Optional instance to populate.
   * @return {module:model/FunctionalAreaCompactDtoApiResponse} The populated <code>FunctionalAreaCompactDtoApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new FunctionalAreaCompactDtoApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = FunctionalAreaCompactDto.constructFromObject(data['result']);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
FunctionalAreaCompactDtoApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
FunctionalAreaCompactDtoApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
FunctionalAreaCompactDtoApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
FunctionalAreaCompactDtoApiResponse.prototype.pageResult = undefined;

/**
 * @member {module:model/FunctionalAreaCompactDto} result
 */
FunctionalAreaCompactDtoApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
FunctionalAreaCompactDtoApiResponse.prototype.errors = undefined;

