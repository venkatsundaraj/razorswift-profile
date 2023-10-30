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
 * The CertificateDto model module.
 * @module model/CertificateDto
 * @version v3.76(UAT)
 */
export class CertificateDto {
  /**
   * Constructs a new <code>CertificateDto</code>.
   * @alias module:model/CertificateDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CertificateDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CertificateDto} obj Optional instance to populate.
   * @return {module:model/CertificateDto} The populated <code>CertificateDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CertificateDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('duration'))
        obj.duration = ApiClient.convertToType(data['duration'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CertificateDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
CertificateDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
CertificateDto.prototype.name = undefined;

/**
 * @member {Number} duration
 */
CertificateDto.prototype.duration = undefined;

