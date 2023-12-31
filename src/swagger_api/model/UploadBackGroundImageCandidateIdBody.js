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
 * The UploadBackGroundImageCandidateIdBody model module.
 * @module model/UploadBackGroundImageCandidateIdBody
 * @version v3.76(UAT)
 */
export class UploadBackGroundImageCandidateIdBody {
  /**
   * Constructs a new <code>UploadBackGroundImageCandidateIdBody</code>.
   * @alias module:model/UploadBackGroundImageCandidateIdBody
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>UploadBackGroundImageCandidateIdBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UploadBackGroundImageCandidateIdBody} obj Optional instance to populate.
   * @return {module:model/UploadBackGroundImageCandidateIdBody} The populated <code>UploadBackGroundImageCandidateIdBody</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new UploadBackGroundImageCandidateIdBody();
      if (data.hasOwnProperty('uploadedFile'))
        obj.uploadedFile = ApiClient.convertToType(data['uploadedFile'], 'Blob');
    }
    return obj;
  }
}

/**
 * @member {Blob} uploadedFile
 */
UploadBackGroundImageCandidateIdBody.prototype.uploadedFile = undefined;

