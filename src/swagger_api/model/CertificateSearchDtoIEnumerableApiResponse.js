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
import {CertificateSearchDto} from './CertificateSearchDto';
import {PageResult} from './PageResult';

/**
 * The CertificateSearchDtoIEnumerableApiResponse model module.
 * @module model/CertificateSearchDtoIEnumerableApiResponse
 * @version v3.76(UAT)
 */
export class CertificateSearchDtoIEnumerableApiResponse {
  /**
   * Constructs a new <code>CertificateSearchDtoIEnumerableApiResponse</code>.
   * @alias module:model/CertificateSearchDtoIEnumerableApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CertificateSearchDtoIEnumerableApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CertificateSearchDtoIEnumerableApiResponse} obj Optional instance to populate.
   * @return {module:model/CertificateSearchDtoIEnumerableApiResponse} The populated <code>CertificateSearchDtoIEnumerableApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CertificateSearchDtoIEnumerableApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = ApiClient.convertToType(data['result'], [CertificateSearchDto]);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
CertificateSearchDtoIEnumerableApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
CertificateSearchDtoIEnumerableApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
CertificateSearchDtoIEnumerableApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
CertificateSearchDtoIEnumerableApiResponse.prototype.pageResult = undefined;

/**
 * @member {Array.<module:model/CertificateSearchDto>} result
 */
CertificateSearchDtoIEnumerableApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
CertificateSearchDtoIEnumerableApiResponse.prototype.errors = undefined;

