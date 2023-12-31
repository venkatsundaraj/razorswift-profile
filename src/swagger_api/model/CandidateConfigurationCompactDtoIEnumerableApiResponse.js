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
import {CandidateConfigurationCompactDto} from './CandidateConfigurationCompactDto';
import {PageResult} from './PageResult';

/**
 * The CandidateConfigurationCompactDtoIEnumerableApiResponse model module.
 * @module model/CandidateConfigurationCompactDtoIEnumerableApiResponse
 * @version v3.76(UAT)
 */
export class CandidateConfigurationCompactDtoIEnumerableApiResponse {
  /**
   * Constructs a new <code>CandidateConfigurationCompactDtoIEnumerableApiResponse</code>.
   * @alias module:model/CandidateConfigurationCompactDtoIEnumerableApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateConfigurationCompactDtoIEnumerableApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateConfigurationCompactDtoIEnumerableApiResponse} obj Optional instance to populate.
   * @return {module:model/CandidateConfigurationCompactDtoIEnumerableApiResponse} The populated <code>CandidateConfigurationCompactDtoIEnumerableApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateConfigurationCompactDtoIEnumerableApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = ApiClient.convertToType(data['result'], [CandidateConfigurationCompactDto]);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
CandidateConfigurationCompactDtoIEnumerableApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
CandidateConfigurationCompactDtoIEnumerableApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
CandidateConfigurationCompactDtoIEnumerableApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
CandidateConfigurationCompactDtoIEnumerableApiResponse.prototype.pageResult = undefined;

/**
 * @member {Array.<module:model/CandidateConfigurationCompactDto>} result
 */
CandidateConfigurationCompactDtoIEnumerableApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
CandidateConfigurationCompactDtoIEnumerableApiResponse.prototype.errors = undefined;

