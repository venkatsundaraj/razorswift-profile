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
 * The JdTraitDto model module.
 * @module model/JdTraitDto
 * @version v3.76(UAT)
 */
export class JdTraitDto {
  /**
   * Constructs a new <code>JdTraitDto</code>.
   * @alias module:model/JdTraitDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>JdTraitDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/JdTraitDto} obj Optional instance to populate.
   * @return {module:model/JdTraitDto} The populated <code>JdTraitDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new JdTraitDto();
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
JdTraitDto.prototype.id = undefined;

/**
 * @member {String} name
 */
JdTraitDto.prototype.name = undefined;

/**
 * @member {String} weight
 */
JdTraitDto.prototype.weight = undefined;

/**
 * @member {Number} jobDescriptionId
 */
JdTraitDto.prototype.jobDescriptionId = undefined;

