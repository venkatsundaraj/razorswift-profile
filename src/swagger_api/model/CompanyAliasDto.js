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
import {CompanyDto} from './CompanyDto';

/**
 * The CompanyAliasDto model module.
 * @module model/CompanyAliasDto
 * @version v3.76(UAT)
 */
export class CompanyAliasDto {
  /**
   * Constructs a new <code>CompanyAliasDto</code>.
   * @alias module:model/CompanyAliasDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CompanyAliasDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CompanyAliasDto} obj Optional instance to populate.
   * @return {module:model/CompanyAliasDto} The populated <code>CompanyAliasDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CompanyAliasDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('companyId'))
        obj.companyId = ApiClient.convertToType(data['companyId'], 'Number');
      if (data.hasOwnProperty('company'))
        obj.company = CompanyDto.constructFromObject(data['company']);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CompanyAliasDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
CompanyAliasDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
CompanyAliasDto.prototype.name = undefined;

/**
 * @member {Number} companyId
 */
CompanyAliasDto.prototype.companyId = undefined;

/**
 * @member {module:model/CompanyDto} company
 */
CompanyAliasDto.prototype.company = undefined;

