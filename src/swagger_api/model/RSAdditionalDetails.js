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
 * The RSAdditionalDetails model module.
 * @module model/RSAdditionalDetails
 * @version v3.76(UAT)
 */
export class RSAdditionalDetails {
  /**
   * Constructs a new <code>RSAdditionalDetails</code>.
   * @alias module:model/RSAdditionalDetails
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>RSAdditionalDetails</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RSAdditionalDetails} obj Optional instance to populate.
   * @return {module:model/RSAdditionalDetails} The populated <code>RSAdditionalDetails</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new RSAdditionalDetails();
      if (data.hasOwnProperty('about'))
        obj.about = ApiClient.convertToType(data['about'], 'String');
      if (data.hasOwnProperty('hobbitesAndActivities'))
        obj.hobbitesAndActivities = ApiClient.convertToType(data['hobbitesAndActivities'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} about
 */
RSAdditionalDetails.prototype.about = undefined;

/**
 * @member {String} hobbitesAndActivities
 */
RSAdditionalDetails.prototype.hobbitesAndActivities = undefined;

