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
import {MStepOutcomeCommunicationCreateDto} from './MStepOutcomeCommunicationCreateDto';

/**
 * The MStepOutcomeCreateDto model module.
 * @module model/MStepOutcomeCreateDto
 * @version v3.76(UAT)
 */
export class MStepOutcomeCreateDto {
  /**
   * Constructs a new <code>MStepOutcomeCreateDto</code>.
   * @alias module:model/MStepOutcomeCreateDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>MStepOutcomeCreateDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MStepOutcomeCreateDto} obj Optional instance to populate.
   * @return {module:model/MStepOutcomeCreateDto} The populated <code>MStepOutcomeCreateDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MStepOutcomeCreateDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('mStepId'))
        obj.mStepId = ApiClient.convertToType(data['mStepId'], 'Number');
      if (data.hasOwnProperty('mStepOutcomeCommunication'))
        obj.mStepOutcomeCommunication = ApiClient.convertToType(data['mStepOutcomeCommunication'], [MStepOutcomeCommunicationCreateDto]);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
MStepOutcomeCreateDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
MStepOutcomeCreateDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
MStepOutcomeCreateDto.prototype.name = undefined;

/**
 * @member {Number} mStepId
 */
MStepOutcomeCreateDto.prototype.mStepId = undefined;

/**
 * @member {Array.<module:model/MStepOutcomeCommunicationCreateDto>} mStepOutcomeCommunication
 */
MStepOutcomeCreateDto.prototype.mStepOutcomeCommunication = undefined;

