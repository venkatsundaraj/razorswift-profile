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
import {SocialMediaType} from './SocialMediaType';

/**
 * The RSSocialMediaWebsite model module.
 * @module model/RSSocialMediaWebsite
 * @version v3.76(UAT)
 */
export class RSSocialMediaWebsite {
  /**
   * Constructs a new <code>RSSocialMediaWebsite</code>.
   * @alias module:model/RSSocialMediaWebsite
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>RSSocialMediaWebsite</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RSSocialMediaWebsite} obj Optional instance to populate.
   * @return {module:model/RSSocialMediaWebsite} The populated <code>RSSocialMediaWebsite</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new RSSocialMediaWebsite();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('url'))
        obj.url = ApiClient.convertToType(data['url'], 'String');
      if (data.hasOwnProperty('socialMediaType'))
        obj.socialMediaType = SocialMediaType.constructFromObject(data['socialMediaType']);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
RSSocialMediaWebsite.prototype.id = undefined;

/**
 * @member {String} url
 */
RSSocialMediaWebsite.prototype.url = undefined;

/**
 * @member {module:model/SocialMediaType} socialMediaType
 */
RSSocialMediaWebsite.prototype.socialMediaType = undefined;

