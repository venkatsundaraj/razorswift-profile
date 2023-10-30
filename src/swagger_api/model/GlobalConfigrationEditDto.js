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

/**
 * The GlobalConfigrationEditDto model module.
 * @module model/GlobalConfigrationEditDto
 * @version v3.76(UAT)
 */
export class GlobalConfigrationEditDto {
  /**
   * Constructs a new <code>GlobalConfigrationEditDto</code>.
   * @alias module:model/GlobalConfigrationEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>GlobalConfigrationEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GlobalConfigrationEditDto} obj Optional instance to populate.
   * @return {module:model/GlobalConfigrationEditDto} The populated <code>GlobalConfigrationEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new GlobalConfigrationEditDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('type'))
        obj.type = ApiClient.convertToType(data['type'], 'Number');
      if (data.hasOwnProperty('count'))
        obj.count = ApiClient.convertToType(data['count'], 'Number');
      if (data.hasOwnProperty('isActive'))
        obj.isActive = ApiClient.convertToType(data['isActive'], 'Boolean');
      if (data.hasOwnProperty('remarks'))
        obj.remarks = ApiClient.convertToType(data['remarks'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
GlobalConfigrationEditDto.prototype.id = undefined;

/**
 * @member {Number} type
 */
GlobalConfigrationEditDto.prototype.type = undefined;

/**
 * @member {Number} count
 */
GlobalConfigrationEditDto.prototype.count = undefined;

/**
 * @member {Boolean} isActive
 */
GlobalConfigrationEditDto.prototype.isActive = undefined;

/**
 * @member {String} remarks
 */
GlobalConfigrationEditDto.prototype.remarks = undefined;

