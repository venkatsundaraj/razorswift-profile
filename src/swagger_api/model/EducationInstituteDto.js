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
 * The EducationInstituteDto model module.
 * @module model/EducationInstituteDto
 * @version v3.76(UAT)
 */
export class EducationInstituteDto {
  /**
   * Constructs a new <code>EducationInstituteDto</code>.
   * @alias module:model/EducationInstituteDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>EducationInstituteDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/EducationInstituteDto} obj Optional instance to populate.
   * @return {module:model/EducationInstituteDto} The populated <code>EducationInstituteDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new EducationInstituteDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('isPremium'))
        obj.isPremium = ApiClient.convertToType(data['isPremium'], 'Boolean');
      if (data.hasOwnProperty('isApprroved'))
        obj.isApprroved = ApiClient.convertToType(data['isApprroved'], 'Boolean');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
EducationInstituteDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
EducationInstituteDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
EducationInstituteDto.prototype.name = undefined;

/**
 * @member {Boolean} isPremium
 */
EducationInstituteDto.prototype.isPremium = undefined;

/**
 * @member {Boolean} isApprroved
 */
EducationInstituteDto.prototype.isApprroved = undefined;

