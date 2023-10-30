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
import {JdInterviewRoundsPanelDto} from './JdInterviewRoundsPanelDto';
import {JobDescriptionDto} from './JobDescriptionDto';

/**
 * The JdInterviewRoundsDto model module.
 * @module model/JdInterviewRoundsDto
 * @version v3.76(UAT)
 */
export class JdInterviewRoundsDto {
  /**
   * Constructs a new <code>JdInterviewRoundsDto</code>.
   * @alias module:model/JdInterviewRoundsDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>JdInterviewRoundsDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/JdInterviewRoundsDto} obj Optional instance to populate.
   * @return {module:model/JdInterviewRoundsDto} The populated <code>JdInterviewRoundsDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new JdInterviewRoundsDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('jobDescriptionId'))
        obj.jobDescriptionId = ApiClient.convertToType(data['jobDescriptionId'], 'Number');
      if (data.hasOwnProperty('jobDescription'))
        obj.jobDescription = JobDescriptionDto.constructFromObject(data['jobDescription']);
      if (data.hasOwnProperty('jdInterviewRoundsPanels'))
        obj.jdInterviewRoundsPanels = ApiClient.convertToType(data['jdInterviewRoundsPanels'], [JdInterviewRoundsPanelDto]);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
JdInterviewRoundsDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
JdInterviewRoundsDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
JdInterviewRoundsDto.prototype.name = undefined;

/**
 * @member {Number} jobDescriptionId
 */
JdInterviewRoundsDto.prototype.jobDescriptionId = undefined;

/**
 * @member {module:model/JobDescriptionDto} jobDescription
 */
JdInterviewRoundsDto.prototype.jobDescription = undefined;

/**
 * @member {Array.<module:model/JdInterviewRoundsPanelDto>} jdInterviewRoundsPanels
 */
JdInterviewRoundsDto.prototype.jdInterviewRoundsPanels = undefined;

