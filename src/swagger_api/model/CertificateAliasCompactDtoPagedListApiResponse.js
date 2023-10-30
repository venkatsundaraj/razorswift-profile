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
import {CertificateAliasCompactDto} from './CertificateAliasCompactDto';
import {PageResult} from './PageResult';

/**
 * The CertificateAliasCompactDtoPagedListApiResponse model module.
 * @module model/CertificateAliasCompactDtoPagedListApiResponse
 * @version v3.76(UAT)
 */
export class CertificateAliasCompactDtoPagedListApiResponse {
  /**
   * Constructs a new <code>CertificateAliasCompactDtoPagedListApiResponse</code>.
   * @alias module:model/CertificateAliasCompactDtoPagedListApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CertificateAliasCompactDtoPagedListApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CertificateAliasCompactDtoPagedListApiResponse} obj Optional instance to populate.
   * @return {module:model/CertificateAliasCompactDtoPagedListApiResponse} The populated <code>CertificateAliasCompactDtoPagedListApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CertificateAliasCompactDtoPagedListApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = ApiClient.convertToType(data['result'], [CertificateAliasCompactDto]);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
CertificateAliasCompactDtoPagedListApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
CertificateAliasCompactDtoPagedListApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
CertificateAliasCompactDtoPagedListApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
CertificateAliasCompactDtoPagedListApiResponse.prototype.pageResult = undefined;

/**
 * @member {Array.<module:model/CertificateAliasCompactDto>} result
 */
CertificateAliasCompactDtoPagedListApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
CertificateAliasCompactDtoPagedListApiResponse.prototype.errors = undefined;

