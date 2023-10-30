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

/**
 * The CandidateConfigurationDto model module.
 * @module model/CandidateConfigurationDto
 * @version v3.76(UAT)
 */
export class CandidateConfigurationDto {
  /**
   * Constructs a new <code>CandidateConfigurationDto</code>.
   * @alias module:model/CandidateConfigurationDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateConfigurationDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateConfigurationDto} obj Optional instance to populate.
   * @return {module:model/CandidateConfigurationDto} The populated <code>CandidateConfigurationDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateConfigurationDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('type'))
        obj.type = ApiClient.convertToType(data['type'], 'Number');
      if (data.hasOwnProperty('count'))
        obj.count = ApiClient.convertToType(data['count'], 'Number');
      if (data.hasOwnProperty('processedCount'))
        obj.processedCount = ApiClient.convertToType(data['processedCount'], 'Number');
      if (data.hasOwnProperty('remainingCount'))
        obj.remainingCount = ApiClient.convertToType(data['remainingCount'], 'Number');
      if (data.hasOwnProperty('isActive'))
        obj.isActive = ApiClient.convertToType(data['isActive'], 'Boolean');
      if (data.hasOwnProperty('remarks'))
        obj.remarks = ApiClient.convertToType(data['remarks'], 'String');
      if (data.hasOwnProperty('candidateId'))
        obj.candidateId = ApiClient.convertToType(data['candidateId'], 'Number');
      if (data.hasOwnProperty('candidate'))
        obj.candidate = CandidateDto.constructFromObject(data['candidate']);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CandidateConfigurationDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
CandidateConfigurationDto.prototype.uniqueGuid = undefined;

/**
 * @member {Number} type
 */
CandidateConfigurationDto.prototype.type = undefined;

/**
 * @member {Number} count
 */
CandidateConfigurationDto.prototype.count = undefined;

/**
 * @member {Number} processedCount
 */
CandidateConfigurationDto.prototype.processedCount = undefined;

/**
 * @member {Number} remainingCount
 */
CandidateConfigurationDto.prototype.remainingCount = undefined;

/**
 * @member {Boolean} isActive
 */
CandidateConfigurationDto.prototype.isActive = undefined;

/**
 * @member {String} remarks
 */
CandidateConfigurationDto.prototype.remarks = undefined;

/**
 * @member {Number} candidateId
 */
CandidateConfigurationDto.prototype.candidateId = undefined;

/**
 * @member {module:model/CandidateDto} candidate
 */
CandidateConfigurationDto.prototype.candidate = undefined;

