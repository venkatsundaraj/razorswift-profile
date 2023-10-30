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
 * The CertificateAliasCompactDto model module.
 * @module model/CertificateAliasCompactDto
 * @version v3.76(UAT)
 */
export class CertificateAliasCompactDto {
  /**
   * Constructs a new <code>CertificateAliasCompactDto</code>.
   * @alias module:model/CertificateAliasCompactDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CertificateAliasCompactDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CertificateAliasCompactDto} obj Optional instance to populate.
   * @return {module:model/CertificateAliasCompactDto} The populated <code>CertificateAliasCompactDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CertificateAliasCompactDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('certificateId'))
        obj.certificateId = ApiClient.convertToType(data['certificateId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CertificateAliasCompactDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
CertificateAliasCompactDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
CertificateAliasCompactDto.prototype.name = undefined;

/**
 * @member {Number} certificateId
 */
CertificateAliasCompactDto.prototype.certificateId = undefined;

