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
 * The MPathwayOutcomeFilterDto model module.
 * @module model/MPathwayOutcomeFilterDto
 * @version v3.76(UAT)
 */
export class MPathwayOutcomeFilterDto {
  /**
   * Constructs a new <code>MPathwayOutcomeFilterDto</code>.
   * @alias module:model/MPathwayOutcomeFilterDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>MPathwayOutcomeFilterDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MPathwayOutcomeFilterDto} obj Optional instance to populate.
   * @return {module:model/MPathwayOutcomeFilterDto} The populated <code>MPathwayOutcomeFilterDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MPathwayOutcomeFilterDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
MPathwayOutcomeFilterDto.prototype.id = undefined;

/**
 * @member {String} name
 */
MPathwayOutcomeFilterDto.prototype.name = undefined;

