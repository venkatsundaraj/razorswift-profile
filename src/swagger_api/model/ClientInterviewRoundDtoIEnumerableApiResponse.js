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
import {ClientInterviewRoundDto} from './ClientInterviewRoundDto';
import {PageResult} from './PageResult';

/**
 * The ClientInterviewRoundDtoIEnumerableApiResponse model module.
 * @module model/ClientInterviewRoundDtoIEnumerableApiResponse
 * @version v3.76(UAT)
 */
export class ClientInterviewRoundDtoIEnumerableApiResponse {
  /**
   * Constructs a new <code>ClientInterviewRoundDtoIEnumerableApiResponse</code>.
   * @alias module:model/ClientInterviewRoundDtoIEnumerableApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ClientInterviewRoundDtoIEnumerableApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClientInterviewRoundDtoIEnumerableApiResponse} obj Optional instance to populate.
   * @return {module:model/ClientInterviewRoundDtoIEnumerableApiResponse} The populated <code>ClientInterviewRoundDtoIEnumerableApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ClientInterviewRoundDtoIEnumerableApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = ApiClient.convertToType(data['result'], [ClientInterviewRoundDto]);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
ClientInterviewRoundDtoIEnumerableApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
ClientInterviewRoundDtoIEnumerableApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
ClientInterviewRoundDtoIEnumerableApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
ClientInterviewRoundDtoIEnumerableApiResponse.prototype.pageResult = undefined;

/**
 * @member {Array.<module:model/ClientInterviewRoundDto>} result
 */
ClientInterviewRoundDtoIEnumerableApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
ClientInterviewRoundDtoIEnumerableApiResponse.prototype.errors = undefined;

