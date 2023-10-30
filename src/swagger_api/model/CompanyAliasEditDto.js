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
 * The CompanyAliasEditDto model module.
 * @module model/CompanyAliasEditDto
 * @version v3.76(UAT)
 */
export class CompanyAliasEditDto {
  /**
   * Constructs a new <code>CompanyAliasEditDto</code>.
   * @alias module:model/CompanyAliasEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CompanyAliasEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CompanyAliasEditDto} obj Optional instance to populate.
   * @return {module:model/CompanyAliasEditDto} The populated <code>CompanyAliasEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CompanyAliasEditDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('companyId'))
        obj.companyId = ApiClient.convertToType(data['companyId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CompanyAliasEditDto.prototype.id = undefined;

/**
 * @member {String} name
 */
CompanyAliasEditDto.prototype.name = undefined;

/**
 * @member {Number} companyId
 */
CompanyAliasEditDto.prototype.companyId = undefined;

