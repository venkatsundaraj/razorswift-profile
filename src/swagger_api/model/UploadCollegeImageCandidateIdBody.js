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
 * The UploadCollegeImageCandidateIdBody model module.
 * @module model/UploadCollegeImageCandidateIdBody
 * @version v3.76(UAT)
 */
export class UploadCollegeImageCandidateIdBody {
  /**
   * Constructs a new <code>UploadCollegeImageCandidateIdBody</code>.
   * @alias module:model/UploadCollegeImageCandidateIdBody
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>UploadCollegeImageCandidateIdBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UploadCollegeImageCandidateIdBody} obj Optional instance to populate.
   * @return {module:model/UploadCollegeImageCandidateIdBody} The populated <code>UploadCollegeImageCandidateIdBody</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new UploadCollegeImageCandidateIdBody();
      if (data.hasOwnProperty('uploadedFile'))
        obj.uploadedFile = ApiClient.convertToType(data['uploadedFile'], 'Blob');
    }
    return obj;
  }
}

/**
 * @member {Blob} uploadedFile
 */
UploadCollegeImageCandidateIdBody.prototype.uploadedFile = undefined;

