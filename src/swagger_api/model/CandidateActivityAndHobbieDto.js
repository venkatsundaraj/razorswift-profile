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
 * The CandidateActivityAndHobbieDto model module.
 * @module model/CandidateActivityAndHobbieDto
 * @version v3.76(UAT)
 */
export class CandidateActivityAndHobbieDto {
  /**
   * Constructs a new <code>CandidateActivityAndHobbieDto</code>.
   * @alias module:model/CandidateActivityAndHobbieDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateActivityAndHobbieDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateActivityAndHobbieDto} obj Optional instance to populate.
   * @return {module:model/CandidateActivityAndHobbieDto} The populated <code>CandidateActivityAndHobbieDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateActivityAndHobbieDto();
      if (data.hasOwnProperty('candidateId'))
        obj.candidateId = ApiClient.convertToType(data['candidateId'], 'Number');
      if (data.hasOwnProperty('hobbiesAndInterests'))
        obj.hobbiesAndInterests = ApiClient.convertToType(data['hobbiesAndInterests'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} candidateId
 */
CandidateActivityAndHobbieDto.prototype.candidateId = undefined;

/**
 * @member {String} hobbiesAndInterests
 */
CandidateActivityAndHobbieDto.prototype.hobbiesAndInterests = undefined;

