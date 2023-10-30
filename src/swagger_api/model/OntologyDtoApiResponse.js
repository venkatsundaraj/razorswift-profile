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
import {OntologyDto} from './OntologyDto';
import {PageResult} from './PageResult';

/**
 * The OntologyDtoApiResponse model module.
 * @module model/OntologyDtoApiResponse
 * @version v3.76(UAT)
 */
export class OntologyDtoApiResponse {
  /**
   * Constructs a new <code>OntologyDtoApiResponse</code>.
   * @alias module:model/OntologyDtoApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>OntologyDtoApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OntologyDtoApiResponse} obj Optional instance to populate.
   * @return {module:model/OntologyDtoApiResponse} The populated <code>OntologyDtoApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new OntologyDtoApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = OntologyDto.constructFromObject(data['result']);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
OntologyDtoApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
OntologyDtoApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
OntologyDtoApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
OntologyDtoApiResponse.prototype.pageResult = undefined;

/**
 * @member {module:model/OntologyDto} result
 */
OntologyDtoApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
OntologyDtoApiResponse.prototype.errors = undefined;

