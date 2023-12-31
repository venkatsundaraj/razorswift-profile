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
import {CandidateSkillDto} from './CandidateSkillDto';

/**
 * The CandidateSkillsEditDto model module.
 * @module model/CandidateSkillsEditDto
 * @version v3.76(UAT)
 */
export class CandidateSkillsEditDto {
  /**
   * Constructs a new <code>CandidateSkillsEditDto</code>.
   * @alias module:model/CandidateSkillsEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateSkillsEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateSkillsEditDto} obj Optional instance to populate.
   * @return {module:model/CandidateSkillsEditDto} The populated <code>CandidateSkillsEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateSkillsEditDto();
      if (data.hasOwnProperty('skills'))
        obj.skills = ApiClient.convertToType(data['skills'], [CandidateSkillDto]);
    }
    return obj;
  }
}

/**
 * @member {Array.<module:model/CandidateSkillDto>} skills
 */
CandidateSkillsEditDto.prototype.skills = undefined;

