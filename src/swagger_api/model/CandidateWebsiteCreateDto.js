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
import {WebsiteType} from './WebsiteType';

/**
 * The CandidateWebsiteCreateDto model module.
 * @module model/CandidateWebsiteCreateDto
 * @version v3.76(UAT)
 */
export class CandidateWebsiteCreateDto {
  /**
   * Constructs a new <code>CandidateWebsiteCreateDto</code>.
   * @alias module:model/CandidateWebsiteCreateDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateWebsiteCreateDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateWebsiteCreateDto} obj Optional instance to populate.
   * @return {module:model/CandidateWebsiteCreateDto} The populated <code>CandidateWebsiteCreateDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateWebsiteCreateDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('url'))
        obj.url = ApiClient.convertToType(data['url'], 'String');
      if (data.hasOwnProperty('type'))
        obj.type = ApiClient.convertToType(data['type'], 'String');
      if (data.hasOwnProperty('websiteType'))
        obj.websiteType = WebsiteType.constructFromObject(data['websiteType']);
      if (data.hasOwnProperty('socialMediaType'))
        obj.socialMediaType = SocialMediaType.constructFromObject(data['socialMediaType']);
      if (data.hasOwnProperty('candidateId'))
        obj.candidateId = ApiClient.convertToType(data['candidateId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CandidateWebsiteCreateDto.prototype.id = undefined;

/**
 * @member {String} url
 */
CandidateWebsiteCreateDto.prototype.url = undefined;

/**
 * @member {String} type
 */
CandidateWebsiteCreateDto.prototype.type = undefined;

/**
 * @member {module:model/WebsiteType} websiteType
 */
CandidateWebsiteCreateDto.prototype.websiteType = undefined;

/**
 * @member {module:model/SocialMediaType} socialMediaType
 */
CandidateWebsiteCreateDto.prototype.socialMediaType = undefined;

/**
 * @member {Number} candidateId
 */
CandidateWebsiteCreateDto.prototype.candidateId = undefined;

