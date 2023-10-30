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
 * The CompanyCompactDto model module.
 * @module model/CompanyCompactDto
 * @version v3.76(UAT)
 */
export class CompanyCompactDto {
  /**
   * Constructs a new <code>CompanyCompactDto</code>.
   * @alias module:model/CompanyCompactDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CompanyCompactDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CompanyCompactDto} obj Optional instance to populate.
   * @return {module:model/CompanyCompactDto} The populated <code>CompanyCompactDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CompanyCompactDto();
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
CompanyCompactDto.prototype.id = undefined;

/**
 * @member {String} name
 */
CompanyCompactDto.prototype.name = undefined;

/**
 * @member {Number} companySize
 */
CompanyCompactDto.prototype.companySize = undefined;

/**
 * @member {module:model/CompanyType} companyType
 */
CompanyCompactDto.prototype.companyType = undefined;

/**
 * @member {Boolean} isPremium
 */
CompanyCompactDto.prototype.isPremium = undefined;

