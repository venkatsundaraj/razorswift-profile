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
import {CandidateAndAddressCompactDto} from './CandidateAndAddressCompactDto';
import {EmploymentStatusType} from './EmploymentStatusType';
import {GenderType} from './GenderType';

/**
 * The CandidatePersonalInfoDto model module.
 * @module model/CandidatePersonalInfoDto
 * @version v3.76(UAT)
 */
export class CandidatePersonalInfoDto {
  /**
   * Constructs a new <code>CandidatePersonalInfoDto</code>.
   * @alias module:model/CandidatePersonalInfoDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidatePersonalInfoDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidatePersonalInfoDto} obj Optional instance to populate.
   * @return {module:model/CandidatePersonalInfoDto} The populated <code>CandidatePersonalInfoDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidatePersonalInfoDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('firstName'))
        obj.firstName = ApiClient.convertToType(data['firstName'], 'String');
      if (data.hasOwnProperty('middleName'))
        obj.middleName = ApiClient.convertToType(data['middleName'], 'String');
      if (data.hasOwnProperty('lastName'))
        obj.lastName = ApiClient.convertToType(data['lastName'], 'String');
      if (data.hasOwnProperty('dateOfBirth'))
        obj.dateOfBirth = ApiClient.convertToType(data['dateOfBirth'], 'Date');
      if (data.hasOwnProperty('gender'))
        obj.gender = GenderType.constructFromObject(data['gender']);
      if (data.hasOwnProperty('employmentStatus'))
        obj.employmentStatus = EmploymentStatusType.constructFromObject(data['employmentStatus']);
      if (data.hasOwnProperty('isStudent'))
        obj.isStudent = ApiClient.convertToType(data['isStudent'], 'Boolean');
      if (data.hasOwnProperty('totalExperienceInYears'))
        obj.totalExperienceInYears = ApiClient.convertToType(data['totalExperienceInYears'], 'Number');
      if (data.hasOwnProperty('cityId'))
        obj.cityId = ApiClient.convertToType(data['cityId'], 'Number');
      if (data.hasOwnProperty('stateId'))
        obj.stateId = ApiClient.convertToType(data['stateId'], 'Number');
      if (data.hasOwnProperty('countryId'))
        obj.countryId = ApiClient.convertToType(data['countryId'], 'Number');
      if (data.hasOwnProperty('cityName'))
        obj.cityName = ApiClient.convertToType(data['cityName'], 'String');
      if (data.hasOwnProperty('stateName'))
        obj.stateName = ApiClient.convertToType(data['stateName'], 'String');
      if (data.hasOwnProperty('countryName'))
        obj.countryName = ApiClient.convertToType(data['countryName'], 'String');
      if (data.hasOwnProperty('candidateAddress'))
        obj.candidateAddress = CandidateAndAddressCompactDto.constructFromObject(data['candidateAddress']);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CandidatePersonalInfoDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
CandidatePersonalInfoDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} firstName
 */
CandidatePersonalInfoDto.prototype.firstName = undefined;

/**
 * @member {String} middleName
 */
CandidatePersonalInfoDto.prototype.middleName = undefined;

/**
 * @member {String} lastName
 */
CandidatePersonalInfoDto.prototype.lastName = undefined;

/**
 * @member {Date} dateOfBirth
 */
CandidatePersonalInfoDto.prototype.dateOfBirth = undefined;

/**
 * @member {module:model/GenderType} gender
 */
CandidatePersonalInfoDto.prototype.gender = undefined;

/**
 * @member {module:model/EmploymentStatusType} employmentStatus
 */
CandidatePersonalInfoDto.prototype.employmentStatus = undefined;

/**
 * @member {Boolean} isStudent
 */
CandidatePersonalInfoDto.prototype.isStudent = undefined;

/**
 * @member {Number} totalExperienceInYears
 */
CandidatePersonalInfoDto.prototype.totalExperienceInYears = undefined;

/**
 * @member {Number} cityId
 */
CandidatePersonalInfoDto.prototype.cityId = undefined;

/**
 * @member {Number} stateId
 */
CandidatePersonalInfoDto.prototype.stateId = undefined;

/**
 * @member {Number} countryId
 */
CandidatePersonalInfoDto.prototype.countryId = undefined;

/**
 * @member {String} cityName
 */
CandidatePersonalInfoDto.prototype.cityName = undefined;

/**
 * @member {String} stateName
 */
CandidatePersonalInfoDto.prototype.stateName = undefined;

/**
 * @member {String} countryName
 */
CandidatePersonalInfoDto.prototype.countryName = undefined;

/**
 * @member {module:model/CandidateAndAddressCompactDto} candidateAddress
 */
CandidatePersonalInfoDto.prototype.candidateAddress = undefined;

