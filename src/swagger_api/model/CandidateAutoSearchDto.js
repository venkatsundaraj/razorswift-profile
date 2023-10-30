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
import {SkillList} from './SkillList';

/**
 * The CandidateAutoSearchDto model module.
 * @module model/CandidateAutoSearchDto
 * @version v3.76(UAT)
 */
export class CandidateAutoSearchDto {
  /**
   * Constructs a new <code>CandidateAutoSearchDto</code>.
   * @alias module:model/CandidateAutoSearchDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateAutoSearchDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateAutoSearchDto} obj Optional instance to populate.
   * @return {module:model/CandidateAutoSearchDto} The populated <code>CandidateAutoSearchDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateAutoSearchDto();
      if (data.hasOwnProperty('must_have'))
        obj.mustHave = ApiClient.convertToType(data['must_have'], [SkillList]);
      if (data.hasOwnProperty('good_to_have'))
        obj.goodToHave = ApiClient.convertToType(data['good_to_have'], [SkillList]);
      if (data.hasOwnProperty('isprod'))
        obj.isprod = ApiClient.convertToType(data['isprod'], 'Boolean');
      if (data.hasOwnProperty('jobDescriptionId'))
        obj.jobDescriptionId = ApiClient.convertToType(data['jobDescriptionId'], 'Number');
      if (data.hasOwnProperty('minExperience'))
        obj.minExperience = ApiClient.convertToType(data['minExperience'], 'Number');
      if (data.hasOwnProperty('maxExperience'))
        obj.maxExperience = ApiClient.convertToType(data['maxExperience'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Array.<module:model/SkillList>} mustHave
 */
CandidateAutoSearchDto.prototype.mustHave = undefined;

/**
 * @member {Array.<module:model/SkillList>} goodToHave
 */
CandidateAutoSearchDto.prototype.goodToHave = undefined;

/**
 * @member {Boolean} isprod
 */
CandidateAutoSearchDto.prototype.isprod = undefined;

/**
 * @member {Number} jobDescriptionId
 */
CandidateAutoSearchDto.prototype.jobDescriptionId = undefined;

/**
 * @member {Number} minExperience
 */
CandidateAutoSearchDto.prototype.minExperience = undefined;

/**
 * @member {Number} maxExperience
 */
CandidateAutoSearchDto.prototype.maxExperience = undefined;

