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
import {HotSkillCompactDto} from './HotSkillCompactDto';
import {PageResult} from './PageResult';

/**
 * The HotSkillCompactDtoIEnumerableApiResponse model module.
 * @module model/HotSkillCompactDtoIEnumerableApiResponse
 * @version v3.76(UAT)
 */
export class HotSkillCompactDtoIEnumerableApiResponse {
  /**
   * Constructs a new <code>HotSkillCompactDtoIEnumerableApiResponse</code>.
   * @alias module:model/HotSkillCompactDtoIEnumerableApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>HotSkillCompactDtoIEnumerableApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/HotSkillCompactDtoIEnumerableApiResponse} obj Optional instance to populate.
   * @return {module:model/HotSkillCompactDtoIEnumerableApiResponse} The populated <code>HotSkillCompactDtoIEnumerableApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new HotSkillCompactDtoIEnumerableApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = ApiClient.convertToType(data['result'], [HotSkillCompactDto]);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
HotSkillCompactDtoIEnumerableApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
HotSkillCompactDtoIEnumerableApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
HotSkillCompactDtoIEnumerableApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
HotSkillCompactDtoIEnumerableApiResponse.prototype.pageResult = undefined;

/**
 * @member {Array.<module:model/HotSkillCompactDto>} result
 */
HotSkillCompactDtoIEnumerableApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
HotSkillCompactDtoIEnumerableApiResponse.prototype.errors = undefined;

