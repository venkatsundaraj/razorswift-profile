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
import {ParserType} from './ParserType';

/**
 * The ParserCreateDto model module.
 * @module model/ParserCreateDto
 * @version v3.76(UAT)
 */
export class ParserCreateDto {
  /**
   * Constructs a new <code>ParserCreateDto</code>.
   * @alias module:model/ParserCreateDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ParserCreateDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ParserCreateDto} obj Optional instance to populate.
   * @return {module:model/ParserCreateDto} The populated <code>ParserCreateDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ParserCreateDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('userName'))
        obj.userName = ApiClient.convertToType(data['userName'], 'String');
      if (data.hasOwnProperty('userKey'))
        obj.userKey = ApiClient.convertToType(data['userKey'], 'String');
      if (data.hasOwnProperty('version'))
        obj.version = ApiClient.convertToType(data['version'], 'String');
      if (data.hasOwnProperty('password'))
        obj.password = ApiClient.convertToType(data['password'], 'String');
      if (data.hasOwnProperty('serviceUrl'))
        obj.serviceUrl = ApiClient.convertToType(data['serviceUrl'], 'String');
      if (data.hasOwnProperty('dataModel'))
        obj.dataModel = ApiClient.convertToType(data['dataModel'], 'String');
      if (data.hasOwnProperty('parserType'))
        obj.parserType = ParserType.constructFromObject(data['parserType']);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
ParserCreateDto.prototype.id = undefined;

/**
 * @member {String} uniqueGuid
 */
ParserCreateDto.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
ParserCreateDto.prototype.name = undefined;

/**
 * @member {String} userName
 */
ParserCreateDto.prototype.userName = undefined;

/**
 * @member {String} userKey
 */
ParserCreateDto.prototype.userKey = undefined;

/**
 * @member {String} version
 */
ParserCreateDto.prototype.version = undefined;

/**
 * @member {String} password
 */
ParserCreateDto.prototype.password = undefined;

/**
 * @member {String} serviceUrl
 */
ParserCreateDto.prototype.serviceUrl = undefined;

/**
 * @member {String} dataModel
 */
ParserCreateDto.prototype.dataModel = undefined;

/**
 * @member {module:model/ParserType} parserType
 */
ParserCreateDto.prototype.parserType = undefined;

