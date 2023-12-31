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
import {FileType} from './FileType';

/**
 * The Document model module.
 * @module model/Document
 * @version v3.76(UAT)
 */
export class Document {
  /**
   * Constructs a new <code>Document</code>.
   * @alias module:model/Document
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>Document</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Document} obj Optional instance to populate.
   * @return {module:model/Document} The populated <code>Document</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Document();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('isDeleted'))
        obj.isDeleted = ApiClient.convertToType(data['isDeleted'], 'Boolean');
      if (data.hasOwnProperty('createdBy'))
        obj.createdBy = ApiClient.convertToType(data['createdBy'], 'Number');
      if (data.hasOwnProperty('createdDate'))
        obj.createdDate = ApiClient.convertToType(data['createdDate'], 'Date');
      if (data.hasOwnProperty('istCreatedDate'))
        obj.istCreatedDate = ApiClient.convertToType(data['istCreatedDate'], 'Date');
      if (data.hasOwnProperty('modifiedBy'))
        obj.modifiedBy = ApiClient.convertToType(data['modifiedBy'], 'Number');
      if (data.hasOwnProperty('modifiedDate'))
        obj.modifiedDate = ApiClient.convertToType(data['modifiedDate'], 'Date');
      if (data.hasOwnProperty('istModifiedDate'))
        obj.istModifiedDate = ApiClient.convertToType(data['istModifiedDate'], 'Date');
      if (data.hasOwnProperty('uniqueGuid'))
        obj.uniqueGuid = ApiClient.convertToType(data['uniqueGuid'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('path'))
        obj.path = ApiClient.convertToType(data['path'], 'String');
      if (data.hasOwnProperty('tags'))
        obj.tags = ApiClient.convertToType(data['tags'], 'String');
      if (data.hasOwnProperty('source'))
        obj.source = ApiClient.convertToType(data['source'], 'String');
      if (data.hasOwnProperty('length'))
        obj.length = ApiClient.convertToType(data['length'], 'Number');
      if (data.hasOwnProperty('savedFileName'))
        obj.savedFileName = ApiClient.convertToType(data['savedFileName'], 'String');
      if (data.hasOwnProperty('actualFileName'))
        obj.actualFileName = ApiClient.convertToType(data['actualFileName'], 'String');
      if (data.hasOwnProperty('fileType'))
        obj.fileType = FileType.constructFromObject(data['fileType']);
      if (data.hasOwnProperty('sthreeKey'))
        obj.sthreeKey = ApiClient.convertToType(data['sthreeKey'], 'String');
      if (data.hasOwnProperty('url'))
        obj.url = ApiClient.convertToType(data['url'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
Document.prototype.id = undefined;

/**
 * @member {Boolean} isDeleted
 */
Document.prototype.isDeleted = undefined;

/**
 * @member {Number} createdBy
 */
Document.prototype.createdBy = undefined;

/**
 * @member {Date} createdDate
 */
Document.prototype.createdDate = undefined;

/**
 * @member {Date} istCreatedDate
 */
Document.prototype.istCreatedDate = undefined;

/**
 * @member {Number} modifiedBy
 */
Document.prototype.modifiedBy = undefined;

/**
 * @member {Date} modifiedDate
 */
Document.prototype.modifiedDate = undefined;

/**
 * @member {Date} istModifiedDate
 */
Document.prototype.istModifiedDate = undefined;

/**
 * @member {String} uniqueGuid
 */
Document.prototype.uniqueGuid = undefined;

/**
 * @member {String} name
 */
Document.prototype.name = undefined;

/**
 * @member {String} path
 */
Document.prototype.path = undefined;

/**
 * @member {String} tags
 */
Document.prototype.tags = undefined;

/**
 * @member {String} source
 */
Document.prototype.source = undefined;

/**
 * @member {Number} length
 */
Document.prototype.length = undefined;

/**
 * @member {String} savedFileName
 */
Document.prototype.savedFileName = undefined;

/**
 * @member {String} actualFileName
 */
Document.prototype.actualFileName = undefined;

/**
 * @member {module:model/FileType} fileType
 */
Document.prototype.fileType = undefined;

/**
 * @member {String} sthreeKey
 */
Document.prototype.sthreeKey = undefined;

/**
 * @member {String} url
 */
Document.prototype.url = undefined;

