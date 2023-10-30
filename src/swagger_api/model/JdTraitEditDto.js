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
 * The JdTraitEditDto model module.
 * @module model/JdTraitEditDto
 * @version v3.76(UAT)
 */
export class JdTraitEditDto {
  /**
   * Constructs a new <code>JdTraitEditDto</code>.
   * @alias module:model/JdTraitEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>JdTraitEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/JdTraitEditDto} obj Optional instance to populate.
   * @return {module:model/JdTraitEditDto} The populated <code>JdTraitEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new JdTraitEditDto();
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
JdTraitEditDto.prototype.id = undefined;

/**
 * @member {String} name
 */
JdTraitEditDto.prototype.name = undefined;

/**
 * @member {String} weight
 */
JdTraitEditDto.prototype.weight = undefined;

/**
 * @member {Number} jobDescriptionId
 */
JdTraitEditDto.prototype.jobDescriptionId = undefined;

