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
 * The ValidateCandidateDto model module.
 * @module model/ValidateCandidateDto
 * @version v3.76(UAT)
 */
export class ValidateCandidateDto {
  /**
   * Constructs a new <code>ValidateCandidateDto</code>.
   * @alias module:model/ValidateCandidateDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ValidateCandidateDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ValidateCandidateDto} obj Optional instance to populate.
   * @return {module:model/ValidateCandidateDto} The populated <code>ValidateCandidateDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ValidateCandidateDto();
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
      if (data.hasOwnProperty('contactNumber'))
        obj.contactNumber = ApiClient.convertToType(data['contactNumber'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} email
 */
ValidateCandidateDto.prototype.email = undefined;

/**
 * @member {String} contactNumber
 */
ValidateCandidateDto.prototype.contactNumber = undefined;

