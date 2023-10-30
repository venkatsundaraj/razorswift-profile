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
import {ContactType} from './ContactType';
import {GenderType} from './GenderType';

/**
 * The ContactEditDto model module.
 * @module model/ContactEditDto
 * @version v3.76(UAT)
 */
export class ContactEditDto {
  /**
   * Constructs a new <code>ContactEditDto</code>.
   * @alias module:model/ContactEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ContactEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ContactEditDto} obj Optional instance to populate.
   * @return {module:model/ContactEditDto} The populated <code>ContactEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ContactEditDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('contactType'))
        obj.contactType = ContactType.constructFromObject(data['contactType']);
      if (data.hasOwnProperty('firstName'))
        obj.firstName = ApiClient.convertToType(data['firstName'], 'String');
      if (data.hasOwnProperty('middleName'))
        obj.middleName = ApiClient.convertToType(data['middleName'], 'String');
      if (data.hasOwnProperty('lastName'))
        obj.lastName = ApiClient.convertToType(data['lastName'], 'String');
      if (data.hasOwnProperty('contactNumber'))
        obj.contactNumber = ApiClient.convertToType(data['contactNumber'], 'String');
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
      if (data.hasOwnProperty('designation'))
        obj.designation = ApiClient.convertToType(data['designation'], 'String');
      if (data.hasOwnProperty('department'))
        obj.department = ApiClient.convertToType(data['department'], 'String');
      if (data.hasOwnProperty('dateOfBirth'))
        obj.dateOfBirth = ApiClient.convertToType(data['dateOfBirth'], 'Date');
      if (data.hasOwnProperty('gender'))
        obj.gender = GenderType.constructFromObject(data['gender']);
      if (data.hasOwnProperty('bloodGroup'))
        obj.bloodGroup = ApiClient.convertToType(data['bloodGroup'], 'String');
      if (data.hasOwnProperty('sourceId'))
        obj.sourceId = ApiClient.convertToType(data['sourceId'], 'Number');
      if (data.hasOwnProperty('clientId'))
        obj.clientId = ApiClient.convertToType(data['clientId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
ContactEditDto.prototype.id = undefined;

/**
 * @member {module:model/ContactType} contactType
 */
ContactEditDto.prototype.contactType = undefined;

/**
 * @member {String} firstName
 */
ContactEditDto.prototype.firstName = undefined;

/**
 * @member {String} middleName
 */
ContactEditDto.prototype.middleName = undefined;

/**
 * @member {String} lastName
 */
ContactEditDto.prototype.lastName = undefined;

/**
 * @member {String} contactNumber
 */
ContactEditDto.prototype.contactNumber = undefined;

/**
 * @member {String} email
 */
ContactEditDto.prototype.email = undefined;

/**
 * @member {String} designation
 */
ContactEditDto.prototype.designation = undefined;

/**
 * @member {String} department
 */
ContactEditDto.prototype.department = undefined;

/**
 * @member {Date} dateOfBirth
 */
ContactEditDto.prototype.dateOfBirth = undefined;

/**
 * @member {module:model/GenderType} gender
 */
ContactEditDto.prototype.gender = undefined;

/**
 * @member {String} bloodGroup
 */
ContactEditDto.prototype.bloodGroup = undefined;

/**
 * @member {Number} sourceId
 */
ContactEditDto.prototype.sourceId = undefined;

/**
 * @member {Number} clientId
 */
ContactEditDto.prototype.clientId = undefined;

