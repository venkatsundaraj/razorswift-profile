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
import {MPathwayOutcomeAttributeCompactDto} from './MPathwayOutcomeAttributeCompactDto';
import {PageResult} from './PageResult';

/**
 * The MPathwayOutcomeAttributeCompactDtoPagedListApiResponse model module.
 * @module model/MPathwayOutcomeAttributeCompactDtoPagedListApiResponse
 * @version v3.76(UAT)
 */
export class MPathwayOutcomeAttributeCompactDtoPagedListApiResponse {
  /**
   * Constructs a new <code>MPathwayOutcomeAttributeCompactDtoPagedListApiResponse</code>.
   * @alias module:model/MPathwayOutcomeAttributeCompactDtoPagedListApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>MPathwayOutcomeAttributeCompactDtoPagedListApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MPathwayOutcomeAttributeCompactDtoPagedListApiResponse} obj Optional instance to populate.
   * @return {module:model/MPathwayOutcomeAttributeCompactDtoPagedListApiResponse} The populated <code>MPathwayOutcomeAttributeCompactDtoPagedListApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MPathwayOutcomeAttributeCompactDtoPagedListApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = ApiClient.convertToType(data['result'], [MPathwayOutcomeAttributeCompactDto]);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
MPathwayOutcomeAttributeCompactDtoPagedListApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
MPathwayOutcomeAttributeCompactDtoPagedListApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
MPathwayOutcomeAttributeCompactDtoPagedListApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
MPathwayOutcomeAttributeCompactDtoPagedListApiResponse.prototype.pageResult = undefined;

/**
 * @member {Array.<module:model/MPathwayOutcomeAttributeCompactDto>} result
 */
MPathwayOutcomeAttributeCompactDtoPagedListApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
MPathwayOutcomeAttributeCompactDtoPagedListApiResponse.prototype.errors = undefined;

