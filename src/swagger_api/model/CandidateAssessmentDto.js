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
 * The CandidateAssessmentDto model module.
 * @module model/CandidateAssessmentDto
 * @version v3.76(UAT)
 */
export class CandidateAssessmentDto {
  /**
   * Constructs a new <code>CandidateAssessmentDto</code>.
   * @alias module:model/CandidateAssessmentDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateAssessmentDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateAssessmentDto} obj Optional instance to populate.
   * @return {module:model/CandidateAssessmentDto} The populated <code>CandidateAssessmentDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateAssessmentDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('tpAssessmentId'))
        obj.tpAssessmentId = ApiClient.convertToType(data['tpAssessmentId'], 'Number');
      if (data.hasOwnProperty('assessmentTitle'))
        obj.assessmentTitle = ApiClient.convertToType(data['assessmentTitle'], 'String');
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
      if (data.hasOwnProperty('contactNumber'))
        obj.contactNumber = ApiClient.convertToType(data['contactNumber'], 'String');
      if (data.hasOwnProperty('isSelfInvite'))
        obj.isSelfInvite = ApiClient.convertToType(data['isSelfInvite'], 'Boolean');
      if (data.hasOwnProperty('sentDateTime'))
        obj.sentDateTime = ApiClient.convertToType(data['sentDateTime'], 'Date');
      if (data.hasOwnProperty('beginDateTime'))
        obj.beginDateTime = ApiClient.convertToType(data['beginDateTime'], 'Date');
      if (data.hasOwnProperty('endDateTime'))
        obj.endDateTime = ApiClient.convertToType(data['endDateTime'], 'Date');
      if (data.hasOwnProperty('tpInviteId'))
        obj.tpInviteId = ApiClient.convertToType(data['tpInviteId'], 'String');
      if (data.hasOwnProperty('tpApiResponse'))
        obj.tpApiResponse = ApiClient.convertToType(data['tpApiResponse'], 'String');
      if (data.hasOwnProperty('tpLink'))
        obj.tpLink = ApiClient.convertToType(data['tpLink'], 'String');
      if (data.hasOwnProperty('candidateId'))
        obj.candidateId = ApiClient.convertToType(data['candidateId'], 'Number');
      if (data.hasOwnProperty('integrationId'))
        obj.integrationId = ApiClient.convertToType(data['integrationId'], 'Number');
      if (data.hasOwnProperty('assessmentId'))
        obj.assessmentId = ApiClient.convertToType(data['assessmentId'], 'Number');
      if (data.hasOwnProperty('candidateAssessmentRequestId'))
        obj.candidateAssessmentRequestId = ApiClient.convertToType(data['candidateAssessmentRequestId'], 'Number');
      if (data.hasOwnProperty('jdAndCandidateStatusId'))
        obj.jdAndCandidateStatusId = ApiClient.convertToType(data['jdAndCandidateStatusId'], 'Number');
      if (data.hasOwnProperty('jdId'))
        obj.jdId = ApiClient.convertToType(data['jdId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CandidateAssessmentDto.prototype.id = undefined;

/**
 * @member {Number} tpAssessmentId
 */
CandidateAssessmentDto.prototype.tpAssessmentId = undefined;

/**
 * @member {String} assessmentTitle
 */
CandidateAssessmentDto.prototype.assessmentTitle = undefined;

/**
 * @member {String} email
 */
CandidateAssessmentDto.prototype.email = undefined;

/**
 * @member {String} contactNumber
 */
CandidateAssessmentDto.prototype.contactNumber = undefined;

/**
 * @member {Boolean} isSelfInvite
 */
CandidateAssessmentDto.prototype.isSelfInvite = undefined;

/**
 * @member {Date} sentDateTime
 */
CandidateAssessmentDto.prototype.sentDateTime = undefined;

/**
 * @member {Date} beginDateTime
 */
CandidateAssessmentDto.prototype.beginDateTime = undefined;

/**
 * @member {Date} endDateTime
 */
CandidateAssessmentDto.prototype.endDateTime = undefined;

/**
 * @member {String} tpInviteId
 */
CandidateAssessmentDto.prototype.tpInviteId = undefined;

/**
 * @member {String} tpApiResponse
 */
CandidateAssessmentDto.prototype.tpApiResponse = undefined;

/**
 * @member {String} tpLink
 */
CandidateAssessmentDto.prototype.tpLink = undefined;

/**
 * @member {Number} candidateId
 */
CandidateAssessmentDto.prototype.candidateId = undefined;

/**
 * @member {Number} integrationId
 */
CandidateAssessmentDto.prototype.integrationId = undefined;

/**
 * @member {Number} assessmentId
 */
CandidateAssessmentDto.prototype.assessmentId = undefined;

/**
 * @member {Number} candidateAssessmentRequestId
 */
CandidateAssessmentDto.prototype.candidateAssessmentRequestId = undefined;

/**
 * @member {Number} jdAndCandidateStatusId
 */
CandidateAssessmentDto.prototype.jdAndCandidateStatusId = undefined;

/**
 * @member {Number} jdId
 */
CandidateAssessmentDto.prototype.jdId = undefined;

