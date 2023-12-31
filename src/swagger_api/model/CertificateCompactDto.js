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
 * The CertificateCompactDto model module.
 * @module model/CertificateCompactDto
 * @version v3.76(UAT)
 */
export class CertificateCompactDto {
  /**
   * Constructs a new <code>CertificateCompactDto</code>.
   * @alias module:model/CertificateCompactDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CertificateCompactDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CertificateCompactDto} obj Optional instance to populate.
   * @return {module:model/CertificateCompactDto} The populated <code>CertificateCompactDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CertificateCompactDto();
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
CertificateCompactDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
CertificateCompactDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
CertificateCompactDto.prototype.name = undefined;

/**
 * @member {Number} duration
 */
CertificateCompactDto.prototype.duration = undefined;

