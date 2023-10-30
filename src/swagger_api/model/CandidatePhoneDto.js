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
 * The CandidatePhoneDto model module.
 * @module model/CandidatePhoneDto
 * @version v3.76(UAT)
 */
export class CandidatePhoneDto {
  /**
   * Constructs a new <code>CandidatePhoneDto</code>.
   * @alias module:model/CandidatePhoneDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidatePhoneDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidatePhoneDto} obj Optional instance to populate.
   * @return {module:model/CandidatePhoneDto} The populated <code>CandidatePhoneDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidatePhoneDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('number'))
        obj._number = ApiClient.convertToType(data['number'], 'String');
      if (data.hasOwnProperty('isdCode'))
        obj.isdCode = ApiClient.convertToType(data['isdCode'], 'String');
      if (data.hasOwnProperty('originalNumber'))
        obj.originalNumber = ApiClient.convertToType(data['originalNumber'], 'String');
      if (data.hasOwnProperty('formattedNumber'))
        obj.formattedNumber = ApiClient.convertToType(data['formattedNumber'], 'String');
      if (data.hasOwnProperty('type'))
        obj.type = ApiClient.convertToType(data['type'], 'String');
      if (data.hasOwnProperty('candidateId'))
        obj.candidateId = ApiClient.convertToType(data['candidateId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CandidatePhoneDto.prototype.id = undefined;

/**
 * @member {String} _number
 */
CandidatePhoneDto.prototype._number = undefined;

/**
 * @member {String} isdCode
 */
CandidatePhoneDto.prototype.isdCode = undefined;

/**
 * @member {String} originalNumber
 */
CandidatePhoneDto.prototype.originalNumber = undefined;

/**
 * @member {String} formattedNumber
 */
CandidatePhoneDto.prototype.formattedNumber = undefined;

/**
 * @member {String} type
 */
CandidatePhoneDto.prototype.type = undefined;

/**
 * @member {Number} candidateId
 */
CandidatePhoneDto.prototype.candidateId = undefined;

