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
import {CandidateEmployerCompactDto} from './CandidateEmployerCompactDto';
import {PageResult} from './PageResult';

/**
 * The CandidateEmployerCompactDtoApiResponse model module.
 * @module model/CandidateEmployerCompactDtoApiResponse
 * @version v3.76(UAT)
 */
export class CandidateEmployerCompactDtoApiResponse {
  /**
   * Constructs a new <code>CandidateEmployerCompactDtoApiResponse</code>.
   * @alias module:model/CandidateEmployerCompactDtoApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateEmployerCompactDtoApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateEmployerCompactDtoApiResponse} obj Optional instance to populate.
   * @return {module:model/CandidateEmployerCompactDtoApiResponse} The populated <code>CandidateEmployerCompactDtoApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateEmployerCompactDtoApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = CandidateEmployerCompactDto.constructFromObject(data['result']);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
CandidateEmployerCompactDtoApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
CandidateEmployerCompactDtoApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
CandidateEmployerCompactDtoApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
CandidateEmployerCompactDtoApiResponse.prototype.pageResult = undefined;

/**
 * @member {module:model/CandidateEmployerCompactDto} result
 */
CandidateEmployerCompactDtoApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
CandidateEmployerCompactDtoApiResponse.prototype.errors = undefined;

