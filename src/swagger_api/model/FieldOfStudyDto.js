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
 * The FieldOfStudyDto model module.
 * @module model/FieldOfStudyDto
 * @version v3.76(UAT)
 */
export class FieldOfStudyDto {
  /**
   * Constructs a new <code>FieldOfStudyDto</code>.
   * @alias module:model/FieldOfStudyDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>FieldOfStudyDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FieldOfStudyDto} obj Optional instance to populate.
   * @return {module:model/FieldOfStudyDto} The populated <code>FieldOfStudyDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new FieldOfStudyDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('isApproved'))
        obj.isApproved = ApiClient.convertToType(data['isApproved'], 'Boolean');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
FieldOfStudyDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
FieldOfStudyDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
FieldOfStudyDto.prototype.name = undefined;

/**
 * @member {Boolean} isApproved
 */
FieldOfStudyDto.prototype.isApproved = undefined;

