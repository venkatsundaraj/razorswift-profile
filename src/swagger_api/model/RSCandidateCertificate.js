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
 * The RSCandidateCertificate model module.
 * @module model/RSCandidateCertificate
 * @version v3.76(UAT)
 */
export class RSCandidateCertificate {
  /**
   * Constructs a new <code>RSCandidateCertificate</code>.
   * @alias module:model/RSCandidateCertificate
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>RSCandidateCertificate</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RSCandidateCertificate} obj Optional instance to populate.
   * @return {module:model/RSCandidateCertificate} The populated <code>RSCandidateCertificate</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new RSCandidateCertificate();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('title'))
        obj.title = ApiClient.convertToType(data['title'], 'String');
      if (data.hasOwnProperty('authority'))
        obj.authority = ApiClient.convertToType(data['authority'], 'String');
      if (data.hasOwnProperty('startDate'))
        obj.startDate = ApiClient.convertToType(data['startDate'], 'Date');
      if (data.hasOwnProperty('endDate'))
        obj.endDate = ApiClient.convertToType(data['endDate'], 'Date');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
RSCandidateCertificate.prototype.id = undefined;

/**
 * @member {String} title
 */
RSCandidateCertificate.prototype.title = undefined;

/**
 * @member {String} authority
 */
RSCandidateCertificate.prototype.authority = undefined;

/**
 * @member {Date} startDate
 */
RSCandidateCertificate.prototype.startDate = undefined;

/**
 * @member {Date} endDate
 */
RSCandidateCertificate.prototype.endDate = undefined;

