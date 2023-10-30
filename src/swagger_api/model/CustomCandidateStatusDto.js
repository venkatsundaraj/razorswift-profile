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
import {CandidateSourcingSequenceDto} from './CandidateSourcingSequenceDto';

/**
 * The CustomCandidateStatusDto model module.
 * @module model/CustomCandidateStatusDto
 * @version v3.76(UAT)
 */
export class CustomCandidateStatusDto {
  /**
   * Constructs a new <code>CustomCandidateStatusDto</code>.
   * @alias module:model/CustomCandidateStatusDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CustomCandidateStatusDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomCandidateStatusDto} obj Optional instance to populate.
   * @return {module:model/CustomCandidateStatusDto} The populated <code>CustomCandidateStatusDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CustomCandidateStatusDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('candidateId'))
        obj.candidateId = ApiClient.convertToType(data['candidateId'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
      if (data.hasOwnProperty('phone'))
        obj.phone = ApiClient.convertToType(data['phone'], 'String');
      if (data.hasOwnProperty('jobDescriptionId'))
        obj.jobDescriptionId = ApiClient.convertToType(data['jobDescriptionId'], 'Number');
      if (data.hasOwnProperty('clientId'))
        obj.clientId = ApiClient.convertToType(data['clientId'], 'Number');
      if (data.hasOwnProperty('clientName'))
        obj.clientName = ApiClient.convertToType(data['clientName'], 'String');
      if (data.hasOwnProperty('jdCode'))
        obj.jdCode = ApiClient.convertToType(data['jdCode'], 'String');
      if (data.hasOwnProperty('sourcingSequence'))
        obj.sourcingSequence = ApiClient.convertToType(data['sourcingSequence'], [CandidateSourcingSequenceDto]);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CustomCandidateStatusDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
CustomCandidateStatusDto.prototype.uniqueGuid = undefined;

/**
 * @member {Number} candidateId
 */
CustomCandidateStatusDto.prototype.candidateId = undefined;

/**
 * @member {String} name
 */
CustomCandidateStatusDto.prototype.name = undefined;

/**
 * @member {String} email
 */
CustomCandidateStatusDto.prototype.email = undefined;

/**
 * @member {String} phone
 */
CustomCandidateStatusDto.prototype.phone = undefined;

/**
 * @member {Number} jobDescriptionId
 */
CustomCandidateStatusDto.prototype.jobDescriptionId = undefined;

/**
 * @member {Number} clientId
 */
CustomCandidateStatusDto.prototype.clientId = undefined;

/**
 * @member {String} clientName
 */
CustomCandidateStatusDto.prototype.clientName = undefined;

/**
 * @member {String} jdCode
 */
CustomCandidateStatusDto.prototype.jdCode = undefined;

/**
 * @member {Array.<module:model/CandidateSourcingSequenceDto>} sourcingSequence
 */
CustomCandidateStatusDto.prototype.sourcingSequence = undefined;

