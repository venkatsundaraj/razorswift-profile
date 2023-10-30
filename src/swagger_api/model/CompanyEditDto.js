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
import {CompanyType} from './CompanyType';

/**
 * The CompanyEditDto model module.
 * @module model/CompanyEditDto
 * @version v3.76(UAT)
 */
export class CompanyEditDto {
  /**
   * Constructs a new <code>CompanyEditDto</code>.
   * @alias module:model/CompanyEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CompanyEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CompanyEditDto} obj Optional instance to populate.
   * @return {module:model/CompanyEditDto} The populated <code>CompanyEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CompanyEditDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('companySize'))
        obj.companySize = ApiClient.convertToType(data['companySize'], 'Number');
      if (data.hasOwnProperty('companyType'))
        obj.companyType = CompanyType.constructFromObject(data['companyType']);
      if (data.hasOwnProperty('isPremium'))
        obj.isPremium = ApiClient.convertToType(data['isPremium'], 'Boolean');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CompanyEditDto.prototype.id = undefined;

/**
 * @member {String} name
 */
CompanyEditDto.prototype.name = undefined;

/**
 * @member {Number} companySize
 */
CompanyEditDto.prototype.companySize = undefined;

/**
 * @member {module:model/CompanyType} companyType
 */
CompanyEditDto.prototype.companyType = undefined;

/**
 * @member {Boolean} isPremium
 */
CompanyEditDto.prototype.isPremium = undefined;

