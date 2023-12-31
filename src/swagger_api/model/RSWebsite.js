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
import {WebsiteType} from './WebsiteType';

/**
 * The RSWebsite model module.
 * @module model/RSWebsite
 * @version v3.76(UAT)
 */
export class RSWebsite {
  /**
   * Constructs a new <code>RSWebsite</code>.
   * @alias module:model/RSWebsite
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>RSWebsite</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RSWebsite} obj Optional instance to populate.
   * @return {module:model/RSWebsite} The populated <code>RSWebsite</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new RSWebsite();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('url'))
        obj.url = ApiClient.convertToType(data['url'], 'String');
      if (data.hasOwnProperty('websiteType'))
        obj.websiteType = WebsiteType.constructFromObject(data['websiteType']);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
RSWebsite.prototype.id = undefined;

/**
 * @member {String} url
 */
RSWebsite.prototype.url = undefined;

/**
 * @member {module:model/WebsiteType} websiteType
 */
RSWebsite.prototype.websiteType = undefined;

