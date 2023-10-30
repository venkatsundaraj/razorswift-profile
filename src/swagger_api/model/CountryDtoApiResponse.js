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
import {CountryDto} from './CountryDto';
import {PageResult} from './PageResult';

/**
 * The CountryDtoApiResponse model module.
 * @module model/CountryDtoApiResponse
 * @version v3.76(UAT)
 */
export class CountryDtoApiResponse {
  /**
   * Constructs a new <code>CountryDtoApiResponse</code>.
   * @alias module:model/CountryDtoApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CountryDtoApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CountryDtoApiResponse} obj Optional instance to populate.
   * @return {module:model/CountryDtoApiResponse} The populated <code>CountryDtoApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CountryDtoApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = CountryDto.constructFromObject(data['result']);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
CountryDtoApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
CountryDtoApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
CountryDtoApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
CountryDtoApiResponse.prototype.pageResult = undefined;

/**
 * @member {module:model/CountryDto} result
 */
CountryDtoApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
CountryDtoApiResponse.prototype.errors = undefined;

