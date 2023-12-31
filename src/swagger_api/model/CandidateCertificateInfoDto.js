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
import {CandidateCertificateDto} from './CandidateCertificateDto';

/**
 * The CandidateCertificateInfoDto model module.
 * @module model/CandidateCertificateInfoDto
 * @version v3.76(UAT)
 */
export class CandidateCertificateInfoDto {
  /**
   * Constructs a new <code>CandidateCertificateInfoDto</code>.
   * @alias module:model/CandidateCertificateInfoDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateCertificateInfoDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateCertificateInfoDto} obj Optional instance to populate.
   * @return {module:model/CandidateCertificateInfoDto} The populated <code>CandidateCertificateInfoDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateCertificateInfoDto();
      if (data.hasOwnProperty('certificates'))
        obj.certificates = ApiClient.convertToType(data['certificates'], [CandidateCertificateDto]);
    }
    return obj;
  }
}

/**
 * @member {Array.<module:model/CandidateCertificateDto>} certificates
 */
CandidateCertificateInfoDto.prototype.certificates = undefined;

