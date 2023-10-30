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
 * The SourcingSequenceCompactDto model module.
 * @module model/SourcingSequenceCompactDto
 * @version v3.76(UAT)
 */
export class SourcingSequenceCompactDto {
  /**
   * Constructs a new <code>SourcingSequenceCompactDto</code>.
   * @alias module:model/SourcingSequenceCompactDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>SourcingSequenceCompactDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SourcingSequenceCompactDto} obj Optional instance to populate.
   * @return {module:model/SourcingSequenceCompactDto} The populated <code>SourcingSequenceCompactDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new SourcingSequenceCompactDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('description'))
        obj.description = ApiClient.convertToType(data['description'], 'String');
      if (data.hasOwnProperty('isActive'))
        obj.isActive = ApiClient.convertToType(data['isActive'], 'Boolean');
      if (data.hasOwnProperty('sequenceNumber'))
        obj.sequenceNumber = ApiClient.convertToType(data['sequenceNumber'], 'Number');
      if (data.hasOwnProperty('count'))
        obj.count = ApiClient.convertToType(data['count'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
SourcingSequenceCompactDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
SourcingSequenceCompactDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
SourcingSequenceCompactDto.prototype.name = undefined;

/**
 * @member {String} description
 */
SourcingSequenceCompactDto.prototype.description = undefined;

/**
 * @member {Boolean} isActive
 */
SourcingSequenceCompactDto.prototype.isActive = undefined;

/**
 * @member {Number} sequenceNumber
 */
SourcingSequenceCompactDto.prototype.sequenceNumber = undefined;

/**
 * @member {Number} count
 */
SourcingSequenceCompactDto.prototype.count = undefined;

