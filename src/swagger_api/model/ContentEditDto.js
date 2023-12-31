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
 * The ContentEditDto model module.
 * @module model/ContentEditDto
 * @version v3.76(UAT)
 */
export class ContentEditDto {
  /**
   * Constructs a new <code>ContentEditDto</code>.
   * @alias module:model/ContentEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ContentEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ContentEditDto} obj Optional instance to populate.
   * @return {module:model/ContentEditDto} The populated <code>ContentEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ContentEditDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('type'))
        obj.type = ApiClient.convertToType(data['type'], 'String');
      if (data.hasOwnProperty('description'))
        obj.description = ApiClient.convertToType(data['description'], 'String');
      if (data.hasOwnProperty('documentId'))
        obj.documentId = ApiClient.convertToType(data['documentId'], 'Number');
      if (data.hasOwnProperty('courseId'))
        obj.courseId = ApiClient.convertToType(data['courseId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
ContentEditDto.prototype.id = undefined;

/**
 * @member {String} name
 */
ContentEditDto.prototype.name = undefined;

/**
 * @member {String} type
 */
ContentEditDto.prototype.type = undefined;

/**
 * @member {String} description
 */
ContentEditDto.prototype.description = undefined;

/**
 * @member {Number} documentId
 */
ContentEditDto.prototype.documentId = undefined;

/**
 * @member {Number} courseId
 */
ContentEditDto.prototype.courseId = undefined;

