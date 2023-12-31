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
 * The RSQualificationTimeLine model module.
 * @module model/RSQualificationTimeLine
 * @version v3.76(UAT)
 */
export class RSQualificationTimeLine {
  /**
   * Constructs a new <code>RSQualificationTimeLine</code>.
   * @alias module:model/RSQualificationTimeLine
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>RSQualificationTimeLine</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RSQualificationTimeLine} obj Optional instance to populate.
   * @return {module:model/RSQualificationTimeLine} The populated <code>RSQualificationTimeLine</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new RSQualificationTimeLine();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('startDate'))
        obj.startDate = ApiClient.convertToType(data['startDate'], 'Date');
      if (data.hasOwnProperty('endDate'))
        obj.endDate = ApiClient.convertToType(data['endDate'], 'Date');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('degree'))
        obj.degree = ApiClient.convertToType(data['degree'], 'String');
      if (data.hasOwnProperty('fieldOfStudy'))
        obj.fieldOfStudy = ApiClient.convertToType(data['fieldOfStudy'], 'String');
      if (data.hasOwnProperty('experienceInMonths'))
        obj.experienceInMonths = ApiClient.convertToType(data['experienceInMonths'], 'Number');
      if (data.hasOwnProperty('isStillPerceiving'))
        obj.isStillPerceiving = ApiClient.convertToType(data['isStillPerceiving'], 'Boolean');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
RSQualificationTimeLine.prototype.id = undefined;

/**
 * @member {Date} startDate
 */
RSQualificationTimeLine.prototype.startDate = undefined;

/**
 * @member {Date} endDate
 */
RSQualificationTimeLine.prototype.endDate = undefined;

/**
 * @member {String} name
 */
RSQualificationTimeLine.prototype.name = undefined;

/**
 * @member {String} degree
 */
RSQualificationTimeLine.prototype.degree = undefined;

/**
 * @member {String} fieldOfStudy
 */
RSQualificationTimeLine.prototype.fieldOfStudy = undefined;

/**
 * @member {Number} experienceInMonths
 */
RSQualificationTimeLine.prototype.experienceInMonths = undefined;

/**
 * @member {Boolean} isStillPerceiving
 */
RSQualificationTimeLine.prototype.isStillPerceiving = undefined;

