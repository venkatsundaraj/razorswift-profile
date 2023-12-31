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
import {BusinessVerticalCompactDto} from './BusinessVerticalCompactDto';
import {PageResult} from './PageResult';

/**
 * The BusinessVerticalCompactDtoPagedListApiResponse model module.
 * @module model/BusinessVerticalCompactDtoPagedListApiResponse
 * @version v3.76(UAT)
 */
export class BusinessVerticalCompactDtoPagedListApiResponse {
  /**
   * Constructs a new <code>BusinessVerticalCompactDtoPagedListApiResponse</code>.
   * @alias module:model/BusinessVerticalCompactDtoPagedListApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>BusinessVerticalCompactDtoPagedListApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BusinessVerticalCompactDtoPagedListApiResponse} obj Optional instance to populate.
   * @return {module:model/BusinessVerticalCompactDtoPagedListApiResponse} The populated <code>BusinessVerticalCompactDtoPagedListApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new BusinessVerticalCompactDtoPagedListApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = ApiClient.convertToType(data['result'], [BusinessVerticalCompactDto]);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
BusinessVerticalCompactDtoPagedListApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
BusinessVerticalCompactDtoPagedListApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
BusinessVerticalCompactDtoPagedListApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
BusinessVerticalCompactDtoPagedListApiResponse.prototype.pageResult = undefined;

/**
 * @member {Array.<module:model/BusinessVerticalCompactDto>} result
 */
BusinessVerticalCompactDtoPagedListApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
BusinessVerticalCompactDtoPagedListApiResponse.prototype.errors = undefined;

