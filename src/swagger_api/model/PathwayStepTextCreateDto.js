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
 * The PathwayStepTextCreateDto model module.
 * @module model/PathwayStepTextCreateDto
 * @version v3.76(UAT)
 */
export class PathwayStepTextCreateDto {
  /**
   * Constructs a new <code>PathwayStepTextCreateDto</code>.
   * @alias module:model/PathwayStepTextCreateDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>PathwayStepTextCreateDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PathwayStepTextCreateDto} obj Optional instance to populate.
   * @return {module:model/PathwayStepTextCreateDto} The populated <code>PathwayStepTextCreateDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PathwayStepTextCreateDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('text'))
        obj.text = ApiClient.convertToType(data['text'], 'String');
      if (data.hasOwnProperty('stepTextId'))
        obj.stepTextId = ApiClient.convertToType(data['stepTextId'], 'Number');
      if (data.hasOwnProperty('pathwayStepId'))
        obj.pathwayStepId = ApiClient.convertToType(data['pathwayStepId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
PathwayStepTextCreateDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
PathwayStepTextCreateDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} text
 */
PathwayStepTextCreateDto.prototype.text = undefined;

/**
 * @member {Number} stepTextId
 */
PathwayStepTextCreateDto.prototype.stepTextId = undefined;

/**
 * @member {Number} pathwayStepId
 */
PathwayStepTextCreateDto.prototype.pathwayStepId = undefined;

