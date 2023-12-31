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
import {MPathwayOutcomeAttributeEditDto} from './MPathwayOutcomeAttributeEditDto';

/**
 * The MPathwayOutcomeEditDto model module.
 * @module model/MPathwayOutcomeEditDto
 * @version v3.76(UAT)
 */
export class MPathwayOutcomeEditDto {
  /**
   * Constructs a new <code>MPathwayOutcomeEditDto</code>.
   * @alias module:model/MPathwayOutcomeEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>MPathwayOutcomeEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MPathwayOutcomeEditDto} obj Optional instance to populate.
   * @return {module:model/MPathwayOutcomeEditDto} The populated <code>MPathwayOutcomeEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MPathwayOutcomeEditDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('mPathwayOutcomeAttribute'))
        obj.mPathwayOutcomeAttribute = ApiClient.convertToType(data['mPathwayOutcomeAttribute'], [MPathwayOutcomeAttributeEditDto]);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
MPathwayOutcomeEditDto.prototype.id = undefined;

/**
 * @member {String} name
 */
MPathwayOutcomeEditDto.prototype.name = undefined;

/**
 * @member {Array.<module:model/MPathwayOutcomeAttributeEditDto>} mPathwayOutcomeAttribute
 */
MPathwayOutcomeEditDto.prototype.mPathwayOutcomeAttribute = undefined;

