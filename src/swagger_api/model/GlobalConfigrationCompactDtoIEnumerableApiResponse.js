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
import {GlobalConfigrationCompactDto} from './GlobalConfigrationCompactDto';
import {PageResult} from './PageResult';

/**
 * The GlobalConfigrationCompactDtoIEnumerableApiResponse model module.
 * @module model/GlobalConfigrationCompactDtoIEnumerableApiResponse
 * @version v3.76(UAT)
 */
export class GlobalConfigrationCompactDtoIEnumerableApiResponse {
  /**
   * Constructs a new <code>GlobalConfigrationCompactDtoIEnumerableApiResponse</code>.
   * @alias module:model/GlobalConfigrationCompactDtoIEnumerableApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>GlobalConfigrationCompactDtoIEnumerableApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GlobalConfigrationCompactDtoIEnumerableApiResponse} obj Optional instance to populate.
   * @return {module:model/GlobalConfigrationCompactDtoIEnumerableApiResponse} The populated <code>GlobalConfigrationCompactDtoIEnumerableApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new GlobalConfigrationCompactDtoIEnumerableApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = ApiClient.convertToType(data['result'], [GlobalConfigrationCompactDto]);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
GlobalConfigrationCompactDtoIEnumerableApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
GlobalConfigrationCompactDtoIEnumerableApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
GlobalConfigrationCompactDtoIEnumerableApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
GlobalConfigrationCompactDtoIEnumerableApiResponse.prototype.pageResult = undefined;

/**
 * @member {Array.<module:model/GlobalConfigrationCompactDto>} result
 */
GlobalConfigrationCompactDtoIEnumerableApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
GlobalConfigrationCompactDtoIEnumerableApiResponse.prototype.errors = undefined;

