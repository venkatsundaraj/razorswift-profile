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
import {PageResult} from './PageResult';
import {SourcingSequenceCompactDto} from './SourcingSequenceCompactDto';

/**
 * The SourcingSequenceCompactDtoPagedListApiResponse model module.
 * @module model/SourcingSequenceCompactDtoPagedListApiResponse
 * @version v3.76(UAT)
 */
export class SourcingSequenceCompactDtoPagedListApiResponse {
  /**
   * Constructs a new <code>SourcingSequenceCompactDtoPagedListApiResponse</code>.
   * @alias module:model/SourcingSequenceCompactDtoPagedListApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>SourcingSequenceCompactDtoPagedListApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SourcingSequenceCompactDtoPagedListApiResponse} obj Optional instance to populate.
   * @return {module:model/SourcingSequenceCompactDtoPagedListApiResponse} The populated <code>SourcingSequenceCompactDtoPagedListApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new SourcingSequenceCompactDtoPagedListApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = ApiClient.convertToType(data['result'], [SourcingSequenceCompactDto]);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
SourcingSequenceCompactDtoPagedListApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
SourcingSequenceCompactDtoPagedListApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
SourcingSequenceCompactDtoPagedListApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
SourcingSequenceCompactDtoPagedListApiResponse.prototype.pageResult = undefined;

/**
 * @member {Array.<module:model/SourcingSequenceCompactDto>} result
 */
SourcingSequenceCompactDtoPagedListApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
SourcingSequenceCompactDtoPagedListApiResponse.prototype.errors = undefined;

