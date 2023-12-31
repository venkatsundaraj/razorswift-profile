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
import {CandidateProjectsDto} from './CandidateProjectsDto';
import {CompanyDto} from './CompanyDto';

/**
 * The CandidateEmployerProjectDto model module.
 * @module model/CandidateEmployerProjectDto
 * @version v3.76(UAT)
 */
export class CandidateEmployerProjectDto {
  /**
   * Constructs a new <code>CandidateEmployerProjectDto</code>.
   * @alias module:model/CandidateEmployerProjectDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CandidateEmployerProjectDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CandidateEmployerProjectDto} obj Optional instance to populate.
   * @return {module:model/CandidateEmployerProjectDto} The populated <code>CandidateEmployerProjectDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CandidateEmployerProjectDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('companyName'))
        obj.companyName = ApiClient.convertToType(data['companyName'], 'String');
      if (data.hasOwnProperty('companyId'))
        obj.companyId = ApiClient.convertToType(data['companyId'], 'Number');
      if (data.hasOwnProperty('company'))
        obj.company = CompanyDto.constructFromObject(data['company']);
      if (data.hasOwnProperty('projects'))
        obj.projects = ApiClient.convertToType(data['projects'], [CandidateProjectsDto]);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CandidateEmployerProjectDto.prototype.id = undefined;

/**
 * @member {String} companyName
 */
CandidateEmployerProjectDto.prototype.companyName = undefined;

/**
 * @member {Number} companyId
 */
CandidateEmployerProjectDto.prototype.companyId = undefined;

/**
 * @member {module:model/CompanyDto} company
 */
CandidateEmployerProjectDto.prototype.company = undefined;

/**
 * @member {Array.<module:model/CandidateProjectsDto>} projects
 */
CandidateEmployerProjectDto.prototype.projects = undefined;

