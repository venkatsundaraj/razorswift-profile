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
import {UserDto} from './UserDto';

/**
 * The UserDtoApiResponse model module.
 * @module model/UserDtoApiResponse
 * @version v3.76(UAT)
 */
export class UserDtoApiResponse {
  /**
   * Constructs a new <code>UserDtoApiResponse</code>.
   * @alias module:model/UserDtoApiResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>UserDtoApiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserDtoApiResponse} obj Optional instance to populate.
   * @return {module:model/UserDtoApiResponse} The populated <code>UserDtoApiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new UserDtoApiResponse();
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('messageType'))
        obj.messageType = ApiClient.convertToType(data['messageType'], 'String');
      if (data.hasOwnProperty('isSuccess'))
        obj.isSuccess = ApiClient.convertToType(data['isSuccess'], 'Boolean');
      if (data.hasOwnProperty('pageResult'))
        obj.pageResult = PageResult.constructFromObject(data['pageResult']);
      if (data.hasOwnProperty('result'))
        obj.result = UserDto.constructFromObject(data['result']);
      if (data.hasOwnProperty('errors'))
        obj.errors = ApiClient.convertToType(data['errors'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} message
 */
UserDtoApiResponse.prototype.message = undefined;

/**
 * @member {String} messageType
 */
UserDtoApiResponse.prototype.messageType = undefined;

/**
 * @member {Boolean} isSuccess
 */
UserDtoApiResponse.prototype.isSuccess = undefined;

/**
 * @member {module:model/PageResult} pageResult
 */
UserDtoApiResponse.prototype.pageResult = undefined;

/**
 * @member {module:model/UserDto} result
 */
UserDtoApiResponse.prototype.result = undefined;

/**
 * @member {Array.<String>} errors
 */
UserDtoApiResponse.prototype.errors = undefined;

