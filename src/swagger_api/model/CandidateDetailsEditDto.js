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
import {SalaryDto} from './SalaryDto';

/**
 * The CandidateDetailsEditDto model module.
 * @module model/CandidateDetailsEditDto
 * @version v3.76(UAT)
 */
export class CandidateDetailsEditDto {
  /**
   * Constructs a new <code>CandidateDetailsEditDto</code>.
   * @alias module:model/CandidateDetailsEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateDetailsEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateDetailsEditDto} obj Optional instance to populate.
   * @return {module:model/CandidateDetailsEditDto} The populated <code>CandidateDetailsEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateDetailsEditDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('note'))
        obj.note = ApiClient.convertToType(data['note'], 'String');
      if (data.hasOwnProperty('isMentor'))
        obj.isMentor = ApiClient.convertToType(data['isMentor'], 'Boolean');
      if (data.hasOwnProperty('isApplicableForJDSearch'))
        obj.isApplicableForJDSearch = ApiClient.convertToType(data['isApplicableForJDSearch'], 'Boolean');
      if (data.hasOwnProperty('currentEmployer'))
        obj.currentEmployer = ApiClient.convertToType(data['currentEmployer'], 'String');
      if (data.hasOwnProperty('totalExperienceInMonths'))
        obj.totalExperienceInMonths = ApiClient.convertToType(data['totalExperienceInMonths'], 'String');
      if (data.hasOwnProperty('totalExperienceInYears'))
        obj.totalExperienceInYears = ApiClient.convertToType(data['totalExperienceInYears'], 'String');
      if (data.hasOwnProperty('totalExperienceRange'))
        obj.totalExperienceRange = ApiClient.convertToType(data['totalExperienceRange'], 'String');
      if (data.hasOwnProperty('gapPeriod'))
        obj.gapPeriod = ApiClient.convertToType(data['gapPeriod'], 'String');
      if (data.hasOwnProperty('averageStay'))
        obj.averageStay = ApiClient.convertToType(data['averageStay'], 'String');
      if (data.hasOwnProperty('longestStay'))
        obj.longestStay = ApiClient.convertToType(data['longestStay'], 'String');
      if (data.hasOwnProperty('summary'))
        obj.summary = ApiClient.convertToType(data['summary'], 'String');
      if (data.hasOwnProperty('executiveSummary'))
        obj.executiveSummary = ApiClient.convertToType(data['executiveSummary'], 'String');
      if (data.hasOwnProperty('managementSummary'))
        obj.managementSummary = ApiClient.convertToType(data['managementSummary'], 'String');
      if (data.hasOwnProperty('currentDesignation'))
        obj.currentDesignation = ApiClient.convertToType(data['currentDesignation'], 'String');
      if (data.hasOwnProperty('noticePeriodDuration'))
        obj.noticePeriodDuration = ApiClient.convertToType(data['noticePeriodDuration'], 'String');
      if (data.hasOwnProperty('currentSalaryId'))
        obj.currentSalaryId = ApiClient.convertToType(data['currentSalaryId'], 'Number');
      if (data.hasOwnProperty('currentSalary'))
        obj.currentSalary = SalaryDto.constructFromObject(data['currentSalary']);
      if (data.hasOwnProperty('expectedSalaryId'))
        obj.expectedSalaryId = ApiClient.convertToType(data['expectedSalaryId'], 'Number');
      if (data.hasOwnProperty('expectedSalary'))
        obj.expectedSalary = SalaryDto.constructFromObject(data['expectedSalary']);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CandidateDetailsEditDto.prototype.id = undefined;

/**
 * @member {String} note
 */
CandidateDetailsEditDto.prototype.note = undefined;

/**
 * @member {Boolean} isMentor
 */
CandidateDetailsEditDto.prototype.isMentor = undefined;

/**
 * @member {Boolean} isApplicableForJDSearch
 */
CandidateDetailsEditDto.prototype.isApplicableForJDSearch = undefined;

/**
 * @member {String} currentEmployer
 */
CandidateDetailsEditDto.prototype.currentEmployer = undefined;

/**
 * @member {String} totalExperienceInMonths
 */
CandidateDetailsEditDto.prototype.totalExperienceInMonths = undefined;

/**
 * @member {String} totalExperienceInYears
 */
CandidateDetailsEditDto.prototype.totalExperienceInYears = undefined;

/**
 * @member {String} totalExperienceRange
 */
CandidateDetailsEditDto.prototype.totalExperienceRange = undefined;

/**
 * @member {String} gapPeriod
 */
CandidateDetailsEditDto.prototype.gapPeriod = undefined;

/**
 * @member {String} averageStay
 */
CandidateDetailsEditDto.prototype.averageStay = undefined;

/**
 * @member {String} longestStay
 */
CandidateDetailsEditDto.prototype.longestStay = undefined;

/**
 * @member {String} summary
 */
CandidateDetailsEditDto.prototype.summary = undefined;

/**
 * @member {String} executiveSummary
 */
CandidateDetailsEditDto.prototype.executiveSummary = undefined;

/**
 * @member {String} managementSummary
 */
CandidateDetailsEditDto.prototype.managementSummary = undefined;

/**
 * @member {String} currentDesignation
 */
CandidateDetailsEditDto.prototype.currentDesignation = undefined;

/**
 * @member {String} noticePeriodDuration
 */
CandidateDetailsEditDto.prototype.noticePeriodDuration = undefined;

/**
 * @member {Number} currentSalaryId
 */
CandidateDetailsEditDto.prototype.currentSalaryId = undefined;

/**
 * @member {module:model/SalaryDto} currentSalary
 */
CandidateDetailsEditDto.prototype.currentSalary = undefined;

/**
 * @member {Number} expectedSalaryId
 */
CandidateDetailsEditDto.prototype.expectedSalaryId = undefined;

/**
 * @member {module:model/SalaryDto} expectedSalary
 */
CandidateDetailsEditDto.prototype.expectedSalary = undefined;

