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
 * The MStepOutcomeCommunicationDto model module.
 * @module model/MStepOutcomeCommunicationDto
 * @version v3.76(UAT)
 */
export class MStepOutcomeCommunicationDto {
  /**
   * Constructs a new <code>MStepOutcomeCommunicationDto</code>.
   * @alias module:model/MStepOutcomeCommunicationDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>MStepOutcomeCommunicationDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MStepOutcomeCommunicationDto} obj Optional instance to populate.
   * @return {module:model/MStepOutcomeCommunicationDto} The populated <code>MStepOutcomeCommunicationDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MStepOutcomeCommunicationDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('type'))
        obj.type = ApiClient.convertToType(data['type'], 'String');
      if (data.hasOwnProperty('message'))
        obj.message = ApiClient.convertToType(data['message'], 'String');
      if (data.hasOwnProperty('mStepOutcomeId'))
        obj.mStepOutcomeId = ApiClient.convertToType(data['mStepOutcomeId'], 'Number');
      if (data.hasOwnProperty('mStepId'))
        obj.mStepId = ApiClient.convertToType(data['mStepId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
MStepOutcomeCommunicationDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
MStepOutcomeCommunicationDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} type
 */
MStepOutcomeCommunicationDto.prototype.type = undefined;

/**
 * @member {String} message
 */
MStepOutcomeCommunicationDto.prototype.message = undefined;

/**
 * @member {Number} mStepOutcomeId
 */
MStepOutcomeCommunicationDto.prototype.mStepOutcomeId = undefined;

/**
 * @member {Number} mStepId
 */
MStepOutcomeCommunicationDto.prototype.mStepId = undefined;

