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
 * The CandidateConfigurationEditDto model module.
 * @module model/CandidateConfigurationEditDto
 * @version v3.76(UAT)
 */
export class CandidateConfigurationEditDto {
  /**
   * Constructs a new <code>CandidateConfigurationEditDto</code>.
   * @alias module:model/CandidateConfigurationEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateConfigurationEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateConfigurationEditDto} obj Optional instance to populate.
   * @return {module:model/CandidateConfigurationEditDto} The populated <code>CandidateConfigurationEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateConfigurationEditDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
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
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CandidateConfigurationEditDto.prototype.id = undefined;

/**
 * @member {Number} type
 */
CandidateConfigurationEditDto.prototype.type = undefined;

/**
 * @member {Number} count
 */
CandidateConfigurationEditDto.prototype.count = undefined;

/**
 * @member {Number} processedCount
 */
CandidateConfigurationEditDto.prototype.processedCount = undefined;

/**
 * @member {Number} remainingCount
 */
CandidateConfigurationEditDto.prototype.remainingCount = undefined;

/**
 * @member {Boolean} isActive
 */
CandidateConfigurationEditDto.prototype.isActive = undefined;

/**
 * @member {String} remarks
 */
CandidateConfigurationEditDto.prototype.remarks = undefined;

/**
 * @member {Number} candidateId
 */
CandidateConfigurationEditDto.prototype.candidateId = undefined;

