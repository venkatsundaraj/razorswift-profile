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
 * The JdTraitCreateDto model module.
 * @module model/JdTraitCreateDto
 * @version v3.76(UAT)
 */
export class JdTraitCreateDto {
  /**
   * Constructs a new <code>JdTraitCreateDto</code>.
   * @alias module:model/JdTraitCreateDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>JdTraitCreateDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/JdTraitCreateDto} obj Optional instance to populate.
   * @return {module:model/JdTraitCreateDto} The populated <code>JdTraitCreateDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new JdTraitCreateDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('weight'))
        obj.weight = ApiClient.convertToType(data['weight'], 'String');
      if (data.hasOwnProperty('jobDescriptionId'))
        obj.jobDescriptionId = ApiClient.convertToType(data['jobDescriptionId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
JdTraitCreateDto.prototype.id = undefined;

/**
 * @member {String} name
 */
JdTraitCreateDto.prototype.name = undefined;

/**
 * @member {String} weight
 */
JdTraitCreateDto.prototype.weight = undefined;

/**
 * @member {Number} jobDescriptionId
 */
JdTraitCreateDto.prototype.jobDescriptionId = undefined;

