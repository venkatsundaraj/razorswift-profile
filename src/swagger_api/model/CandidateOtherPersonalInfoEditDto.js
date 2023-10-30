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
import {CandidateAndLanguageDto} from './CandidateAndLanguageDto';
import {GenderType} from './GenderType';

/**
 * The CandidateOtherPersonalInfoEditDto model module.
 * @module model/CandidateOtherPersonalInfoEditDto
 * @version v3.76(UAT)
 */
export class CandidateOtherPersonalInfoEditDto {
  /**
   * Constructs a new <code>CandidateOtherPersonalInfoEditDto</code>.
   * @alias module:model/CandidateOtherPersonalInfoEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateOtherPersonalInfoEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateOtherPersonalInfoEditDto} obj Optional instance to populate.
   * @return {module:model/CandidateOtherPersonalInfoEditDto} The populated <code>CandidateOtherPersonalInfoEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateOtherPersonalInfoEditDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('dateOfBirth'))
        obj.dateOfBirth = ApiClient.convertToType(data['dateOfBirth'], 'Date');
      if (data.hasOwnProperty('gender'))
        obj.gender = GenderType.constructFromObject(data['gender']);
      if (data.hasOwnProperty('bloodGroup'))
        obj.bloodGroup = ApiClient.convertToType(data['bloodGroup'], 'String');
      if (data.hasOwnProperty('fatherName'))
        obj.fatherName = ApiClient.convertToType(data['fatherName'], 'String');
      if (data.hasOwnProperty('motherName'))
        obj.motherName = ApiClient.convertToType(data['motherName'], 'String');
      if (data.hasOwnProperty('maritalStatus'))
        obj.maritalStatus = ApiClient.convertToType(data['maritalStatus'], 'String');
      if (data.hasOwnProperty('candidateLanguages'))
        obj.candidateLanguages = ApiClient.convertToType(data['candidateLanguages'], [CandidateAndLanguageDto]);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CandidateOtherPersonalInfoEditDto.prototype.id = undefined;

/**
 * @member {Date} dateOfBirth
 */
CandidateOtherPersonalInfoEditDto.prototype.dateOfBirth = undefined;

/**
 * @member {module:model/GenderType} gender
 */
CandidateOtherPersonalInfoEditDto.prototype.gender = undefined;

/**
 * @member {String} bloodGroup
 */
CandidateOtherPersonalInfoEditDto.prototype.bloodGroup = undefined;

/**
 * @member {String} fatherName
 */
CandidateOtherPersonalInfoEditDto.prototype.fatherName = undefined;

/**
 * @member {String} motherName
 */
CandidateOtherPersonalInfoEditDto.prototype.motherName = undefined;

/**
 * @member {String} maritalStatus
 */
CandidateOtherPersonalInfoEditDto.prototype.maritalStatus = undefined;

/**
 * @member {Array.<module:model/CandidateAndLanguageDto>} candidateLanguages
 */
CandidateOtherPersonalInfoEditDto.prototype.candidateLanguages = undefined;

