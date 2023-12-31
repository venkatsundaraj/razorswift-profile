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
 * The SalaryDto model module.
 * @module model/SalaryDto
 * @version v3.76(UAT)
 */
export class SalaryDto {
  /**
   * Constructs a new <code>SalaryDto</code>.
   * @alias module:model/SalaryDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>SalaryDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SalaryDto} obj Optional instance to populate.
   * @return {module:model/SalaryDto} The populated <code>SalaryDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new SalaryDto();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('amount'))
        obj.amount = ApiClient.convertToType(data['amount'], 'String');
      if (data.hasOwnProperty('symbol'))
        obj.symbol = ApiClient.convertToType(data['symbol'], 'String');
      if (data.hasOwnProperty('currency'))
        obj.currency = ApiClient.convertToType(data['currency'], 'String');
      if (data.hasOwnProperty('unit'))
        obj.unit = ApiClient.convertToType(data['unit'], 'String');
      if (data.hasOwnProperty('text'))
        obj.text = ApiClient.convertToType(data['text'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
SalaryDto.prototype.id = undefined;

/**
 * @member {String} amount
 */
SalaryDto.prototype.amount = undefined;

/**
 * @member {String} symbol
 */
SalaryDto.prototype.symbol = undefined;

/**
 * @member {String} currency
 */
SalaryDto.prototype.currency = undefined;

/**
 * @member {String} unit
 */
SalaryDto.prototype.unit = undefined;

/**
 * @member {String} text
 */
SalaryDto.prototype.text = undefined;

