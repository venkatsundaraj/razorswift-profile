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
import {CandidateDto} from './CandidateDto';
import {ClientDto} from './ClientDto';
import {JobDescriptionDto} from './JobDescriptionDto';
import {SourcingSequenceDto} from './SourcingSequenceDto';

/**
 * The JdAndCandidateStatusDto model module.
 * @module model/JdAndCandidateStatusDto
 * @version v3.76(UAT)
 */
export class JdAndCandidateStatusDto {
  /**
   * Constructs a new <code>JdAndCandidateStatusDto</code>.
   * @alias module:model/JdAndCandidateStatusDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>JdAndCandidateStatusDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/JdAndCandidateStatusDto} obj Optional instance to populate.
   * @return {module:model/JdAndCandidateStatusDto} The populated <code>JdAndCandidateStatusDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new JdAndCandidateStatusDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('status'))
        obj.status = ApiClient.convertToType(data['status'], 'Number');
      if (data.hasOwnProperty('remarks'))
        obj.remarks = ApiClient.convertToType(data['remarks'], 'String');
      if (data.hasOwnProperty('createdDate'))
        obj.createdDate = ApiClient.convertToType(data['createdDate'], 'Date');
      if (data.hasOwnProperty('jdAndTaggedCandidateId'))
        obj.jdAndTaggedCandidateId = ApiClient.convertToType(data['jdAndTaggedCandidateId'], 'Number');
      if (data.hasOwnProperty('sourcingSequenceId'))
        obj.sourcingSequenceId = ApiClient.convertToType(data['sourcingSequenceId'], 'Number');
      if (data.hasOwnProperty('sourcingSequence'))
        obj.sourcingSequence = SourcingSequenceDto.constructFromObject(data['sourcingSequence']);
      if (data.hasOwnProperty('candidateId'))
        obj.candidateId = ApiClient.convertToType(data['candidateId'], 'Number');
      if (data.hasOwnProperty('candidate'))
        obj.candidate = CandidateDto.constructFromObject(data['candidate']);
      if (data.hasOwnProperty('jobDescriptionId'))
        obj.jobDescriptionId = ApiClient.convertToType(data['jobDescriptionId'], 'Number');
      if (data.hasOwnProperty('jobDescription'))
        obj.jobDescription = JobDescriptionDto.constructFromObject(data['jobDescription']);
      if (data.hasOwnProperty('clientId'))
        obj.clientId = ApiClient.convertToType(data['clientId'], 'Number');
      if (data.hasOwnProperty('client'))
        obj.client = ClientDto.constructFromObject(data['client']);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
JdAndCandidateStatusDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
JdAndCandidateStatusDto.prototype.uniqueGuid = undefined;

/**
 * @member {Number} status
 */
JdAndCandidateStatusDto.prototype.status = undefined;

/**
 * @member {String} remarks
 */
JdAndCandidateStatusDto.prototype.remarks = undefined;

/**
 * @member {Date} createdDate
 */
JdAndCandidateStatusDto.prototype.createdDate = undefined;

/**
 * @member {Number} jdAndTaggedCandidateId
 */
JdAndCandidateStatusDto.prototype.jdAndTaggedCandidateId = undefined;

/**
 * @member {Number} sourcingSequenceId
 */
JdAndCandidateStatusDto.prototype.sourcingSequenceId = undefined;

/**
 * @member {module:model/SourcingSequenceDto} sourcingSequence
 */
JdAndCandidateStatusDto.prototype.sourcingSequence = undefined;

/**
 * @member {Number} candidateId
 */
JdAndCandidateStatusDto.prototype.candidateId = undefined;

/**
 * @member {module:model/CandidateDto} candidate
 */
JdAndCandidateStatusDto.prototype.candidate = undefined;

/**
 * @member {Number} jobDescriptionId
 */
JdAndCandidateStatusDto.prototype.jobDescriptionId = undefined;

/**
 * @member {module:model/JobDescriptionDto} jobDescription
 */
JdAndCandidateStatusDto.prototype.jobDescription = undefined;

/**
 * @member {Number} clientId
 */
JdAndCandidateStatusDto.prototype.clientId = undefined;

/**
 * @member {module:model/ClientDto} client
 */
JdAndCandidateStatusDto.prototype.client = undefined;

