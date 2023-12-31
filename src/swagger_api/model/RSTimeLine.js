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
 * The RSTimeLine model module.
 * @module model/RSTimeLine
 * @version v3.76(UAT)
 */
export class RSTimeLine {
  /**
   * Constructs a new <code>RSTimeLine</code>.
   * @alias module:model/RSTimeLine
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>RSTimeLine</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RSTimeLine} obj Optional instance to populate.
   * @return {module:model/RSTimeLine} The populated <code>RSTimeLine</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new RSTimeLine();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('startDate'))
        obj.startDate = ApiClient.convertToType(data['startDate'], 'Date');
      if (data.hasOwnProperty('endDate'))
        obj.endDate = ApiClient.convertToType(data['endDate'], 'Date');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('jobTitle'))
        obj.jobTitle = ApiClient.convertToType(data['jobTitle'], 'String');
      if (data.hasOwnProperty('degereeName'))
        obj.degereeName = ApiClient.convertToType(data['degereeName'], 'String');
      if (data.hasOwnProperty('experienceInMonths'))
        obj.experienceInMonths = ApiClient.convertToType(data['experienceInMonths'], 'Number');
      if (data.hasOwnProperty('isCurrentEmployee'))
        obj.isCurrentEmployee = ApiClient.convertToType(data['isCurrentEmployee'], 'Boolean');
      if (data.hasOwnProperty('isCollege'))
        obj.isCollege = ApiClient.convertToType(data['isCollege'], 'Boolean');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
RSTimeLine.prototype.id = undefined;

/**
 * @member {Date} startDate
 */
RSTimeLine.prototype.startDate = undefined;

/**
 * @member {Date} endDate
 */
RSTimeLine.prototype.endDate = undefined;

/**
 * @member {String} name
 */
RSTimeLine.prototype.name = undefined;

/**
 * @member {String} jobTitle
 */
RSTimeLine.prototype.jobTitle = undefined;

/**
 * @member {String} degereeName
 */
RSTimeLine.prototype.degereeName = undefined;

/**
 * @member {Number} experienceInMonths
 */
RSTimeLine.prototype.experienceInMonths = undefined;

/**
 * @member {Boolean} isCurrentEmployee
 */
RSTimeLine.prototype.isCurrentEmployee = undefined;

/**
 * @member {Boolean} isCollege
 */
RSTimeLine.prototype.isCollege = undefined;

