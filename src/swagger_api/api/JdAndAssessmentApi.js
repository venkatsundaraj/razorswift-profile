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
import {ApiClient} from "../ApiClient";
import {JdAndAssessmentCompactDtoIEnumerableApiResponse} from '../model/JdAndAssessmentCompactDtoIEnumerableApiResponse';
import {JdAndAssessmentCreateDto} from '../model/JdAndAssessmentCreateDto';
import {JdAndAssessmentDtoIEnumerableApiResponse} from '../model/JdAndAssessmentDtoIEnumerableApiResponse';

/**
* JdAndAssessment service.
* @module api/JdAndAssessmentApi
* @version v3.76(UAT)
*/
export class JdAndAssessmentApi {

    /**
    * Constructs a new JdAndAssessmentApi. 
    * @alias module:api/JdAndAssessmentApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the apiJdAndAssessmentGetAssessmentByIdJdIdGet operation.
     * @callback moduleapi/JdAndAssessmentApi~apiJdAndAssessmentGetAssessmentByIdJdIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/JdAndAssessmentCompactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} jdId 
     * @param {Object} opts Optional parameters
     * @param {String} opts.title 
     * @param {module:api/JdAndAssessmentApi~apiJdAndAssessmentGetAssessmentByIdJdIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiJdAndAssessmentGetAssessmentByIdJdIdGet(jdId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'jdId' is set
      if (jdId === undefined || jdId === null) {
        throw new Error("Missing the required parameter 'jdId' when calling apiJdAndAssessmentGetAssessmentByIdJdIdGet");
      }

      let pathParams = {
        'jdId': jdId
      };
      let queryParams = {
        'title': opts['title']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['Bearer', 'X-RS-Key'];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = JdAndAssessmentCompactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/JdAndAssessment/GetAssessmentById/{jdId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiJdAndAssessmentPost operation.
     * @callback moduleapi/JdAndAssessmentApi~apiJdAndAssessmentPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/JdAndAssessmentDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/JdAndAssessmentCreateDto} opts.body 
     * @param {module:api/JdAndAssessmentApi~apiJdAndAssessmentPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiJdAndAssessmentPost(opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['Bearer', 'X-RS-Key'];
      let contentTypes = ['application/json', 'text/json', 'application/_*+json'];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = JdAndAssessmentDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/JdAndAssessment', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}