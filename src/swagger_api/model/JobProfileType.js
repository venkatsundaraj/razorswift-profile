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
 * Enum class JobProfileType.
 * @enum {Number}
 * @readonly
 */
const JobProfileType = {
  /**
   * value: 1
   * @const
   */
  _1: 1,

  /**
   * value: 2
   * @const
   */
  _2: 2,

  /**
   * value: 3
   * @const
   */
  _3: 3,

  /**
   * Returns a <code>JobProfileType</code> enum value from a JavaScript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/JobProfileType} The enum <code>JobProfileType</code> value.
   */
  constructFromObject: function(object) {
    return object;
  }
};

export {JobProfileType};