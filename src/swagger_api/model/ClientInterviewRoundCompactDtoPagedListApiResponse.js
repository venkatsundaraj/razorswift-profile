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
import {ClientInterviewRoundCompactDto} from './ClientInterviewRoundCompactDto';
import {PageResult} from './PageResult';

/**
 * The ClientInterviewRoundCompactDtoPagedListApiResponse model module.
 * @module model/ClientInterviewRoundCompactDtoPagedListApiResponse
 * @version v3.76(UAT)
 */
export class ClientInterviewRoundCompactDtoPagedListApiResponse {
  /**
   * Constructs a new <code>ClientInterviewRoundCompactDtoPagedListApiResponse</code>.
   * @alias module:model/ClientInterviewRoundCompactDtoPagedListApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ClientInterviewRoundCompactDtoPagedListApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClientInterviewRoundCompactDtoPagedListApiResponse} obj Optional instance to populate.
   * @return {module:model/ClientInterviewRoundCompactDtoPagedListApiResponse} The populated <code>ClientInterviewRoundCompactDtoPagedListApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ClientInterviewRoundCompactDtoPagedListApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = ApiClient.convertToType(data['result'], [ClientInterviewRoundCompactDto]);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
ClientInterviewRoundCompactDtoPagedListApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
ClientInterviewRoundCompactDtoPagedListApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
ClientInterviewRoundCompactDtoPagedListApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
ClientInterviewRoundCompactDtoPagedListApiResponse.prototype.pageResult = undefined;

/**
 * @member {Array.<module:model/ClientInterviewRoundCompactDto>} result
 */
ClientInterviewRoundCompactDtoPagedListApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
ClientInterviewRoundCompactDtoPagedListApiResponse.prototype.errors = undefined;

