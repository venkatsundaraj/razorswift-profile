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
import {CandidateCertificateDto} from './CandidateCertificateDto';
import {PageResult} from './PageResult';

/**
 * The CandidateCertificateDtoIEnumerableApiResponse model module.
 * @module model/CandidateCertificateDtoIEnumerableApiResponse
 * @version v3.76(UAT)
 */
export class CandidateCertificateDtoIEnumerableApiResponse {
  /**
   * Constructs a new <code>CandidateCertificateDtoIEnumerableApiResponse</code>.
   * @alias module:model/CandidateCertificateDtoIEnumerableApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateCertificateDtoIEnumerableApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateCertificateDtoIEnumerableApiResponse} obj Optional instance to populate.
   * @return {module:model/CandidateCertificateDtoIEnumerableApiResponse} The populated <code>CandidateCertificateDtoIEnumerableApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateCertificateDtoIEnumerableApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = ApiClient.convertToType(data['result'], [CandidateCertificateDto]);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
CandidateCertificateDtoIEnumerableApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
CandidateCertificateDtoIEnumerableApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
CandidateCertificateDtoIEnumerableApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
CandidateCertificateDtoIEnumerableApiResponse.prototype.pageResult = undefined;

/**
 * @member {Array.<module:model/CandidateCertificateDto>} result
 */
CandidateCertificateDtoIEnumerableApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
CandidateCertificateDtoIEnumerableApiResponse.prototype.errors = undefined;

