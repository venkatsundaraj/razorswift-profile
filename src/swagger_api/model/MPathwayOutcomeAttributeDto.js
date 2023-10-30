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
import {AttributeType} from './AttributeType';

/**
 * The MPathwayOutcomeAttributeDto model module.
 * @module model/MPathwayOutcomeAttributeDto
 * @version v3.76(UAT)
 */
export class MPathwayOutcomeAttributeDto {
  /**
   * Constructs a new <code>MPathwayOutcomeAttributeDto</code>.
   * @alias module:model/MPathwayOutcomeAttributeDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>MPathwayOutcomeAttributeDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MPathwayOutcomeAttributeDto} obj Optional instance to populate.
   * @return {module:model/MPathwayOutcomeAttributeDto} The populated <code>MPathwayOutcomeAttributeDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MPathwayOutcomeAttributeDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('attributeName'))
        obj.attributeName = ApiClient.convertToType(data['attributeName'], 'String');
      if (data.hasOwnProperty('attributeValue'))
        obj.attributeValue = ApiClient.convertToType(data['attributeValue'], 'String');
      if (data.hasOwnProperty('attributeType'))
        obj.attributeType = AttributeType.constructFromObject(data['attributeType']);
      if (data.hasOwnProperty('isCustomizable'))
        obj.isCustomizable = ApiClient.convertToType(data['isCustomizable'], 'Boolean');
      if (data.hasOwnProperty('mPathwayOutcomeId'))
        obj.mPathwayOutcomeId = ApiClient.convertToType(data['mPathwayOutcomeId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
MPathwayOutcomeAttributeDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
MPathwayOutcomeAttributeDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} attributeName
 */
MPathwayOutcomeAttributeDto.prototype.attributeName = undefined;

/**
 * @member {String} attributeValue
 */
MPathwayOutcomeAttributeDto.prototype.attributeValue = undefined;

/**
 * @member {module:model/AttributeType} attributeType
 */
MPathwayOutcomeAttributeDto.prototype.attributeType = undefined;

/**
 * @member {Boolean} isCustomizable
 */
MPathwayOutcomeAttributeDto.prototype.isCustomizable = undefined;

/**
 * @member {Number} mPathwayOutcomeId
 */
MPathwayOutcomeAttributeDto.prototype.mPathwayOutcomeId = undefined;

