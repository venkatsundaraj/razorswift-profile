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
import {PageResult} from './PageResult';
import {SkillDto} from './SkillDto';

/**
 * The SkillDtoApiResponse model module.
 * @module model/SkillDtoApiResponse
 * @version v3.76(UAT)
 */
export class SkillDtoApiResponse {
  /**
   * Constructs a new <code>SkillDtoApiResponse</code>.
   * @alias module:model/SkillDtoApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>SkillDtoApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SkillDtoApiResponse} obj Optional instance to populate.
   * @return {module:model/SkillDtoApiResponse} The populated <code>SkillDtoApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new SkillDtoApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = SkillDto.constructFromObject(data['result']);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
SkillDtoApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
SkillDtoApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
SkillDtoApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
SkillDtoApiResponse.prototype.pageResult = undefined;

/**
 * @member {module:model/SkillDto} result
 */
SkillDtoApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
SkillDtoApiResponse.prototype.errors = undefined;

