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
import {JdInterviewRoundsPanelCompactDto} from './JdInterviewRoundsPanelCompactDto';

/**
 * The JdInterviewRoundsCompactDto model module.
 * @module model/JdInterviewRoundsCompactDto
 * @version v3.76(UAT)
 */
export class JdInterviewRoundsCompactDto {
  /**
   * Constructs a new <code>JdInterviewRoundsCompactDto</code>.
   * @alias module:model/JdInterviewRoundsCompactDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>JdInterviewRoundsCompactDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/JdInterviewRoundsCompactDto} obj Optional instance to populate.
   * @return {module:model/JdInterviewRoundsCompactDto} The populated <code>JdInterviewRoundsCompactDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new JdInterviewRoundsCompactDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('jobDescriptionId'))
        obj.jobDescriptionId = ApiClient.convertToType(data['jobDescriptionId'], 'Number');
      if (data.hasOwnProperty('jdInterviewRoundsPanels'))
        obj.jdInterviewRoundsPanels = ApiClient.convertToType(data['jdInterviewRoundsPanels'], [JdInterviewRoundsPanelCompactDto]);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
JdInterviewRoundsCompactDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
JdInterviewRoundsCompactDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
JdInterviewRoundsCompactDto.prototype.name = undefined;

/**
 * @member {Number} jobDescriptionId
 */
JdInterviewRoundsCompactDto.prototype.jobDescriptionId = undefined;

/**
 * @member {Array.<module:model/JdInterviewRoundsPanelCompactDto>} jdInterviewRoundsPanels
 */
JdInterviewRoundsCompactDto.prototype.jdInterviewRoundsPanels = undefined;

