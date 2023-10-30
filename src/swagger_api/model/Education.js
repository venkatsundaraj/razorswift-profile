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
 * The Education model module.
 * @module model/Education
 * @version v3.76(UAT)
 */
export class Education {
  /**
   * Constructs a new <code>Education</code>.
   * @alias module:model/Education
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>Education</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Education} obj Optional instance to populate.
   * @return {module:model/Education} The populated <code>Education</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Education();
      if (data.hasOwnProperty('passoutYear'))
        obj.passoutYear = ApiClient.convertToType(data['passoutYear'], 'String');
      if (data.hasOwnProperty('university'))
        obj.university = ApiClient.convertToType(data['university'], 'String');
      if (data.hasOwnProperty('collegeSchoolName'))
        obj.collegeSchoolName = ApiClient.convertToType(data['collegeSchoolName'], 'String');
      if (data.hasOwnProperty('titleDegree'))
        obj.titleDegree = ApiClient.convertToType(data['titleDegree'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} passoutYear
 */
Education.prototype.passoutYear = undefined;

/**
 * @member {String} university
 */
Education.prototype.university = undefined;

/**
 * @member {String} collegeSchoolName
 */
Education.prototype.collegeSchoolName = undefined;

/**
 * @member {String} titleDegree
 */
Education.prototype.titleDegree = undefined;

