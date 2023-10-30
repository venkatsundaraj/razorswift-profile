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
import {CandidatePersonalInfoDtoApiResponse} from '../model/CandidatePersonalInfoDtoApiResponse';
import {CandidatePersonalInfoEditDto} from '../model/CandidatePersonalInfoEditDto';

/**
* CandidatePersonalInfo service.
* @module api/CandidatePersonalInfoApi
* @version v3.76(UAT)
*/
export class CandidatePersonalInfoApi {

    /**
    * Constructs a new CandidatePersonalInfoApi. 
    * @alias module:api/CandidatePersonalInfoApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the apiCandidatePersonalInfoGetPersonalInfoCandidateIdGet operation.
     * @callback moduleapi/CandidatePersonalInfoApi~apiCandidatePersonalInfoGetPersonalInfoCandidateIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CandidatePersonalInfoDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} candidateId 
     * @param {module:api/CandidatePersonalInfoApi~apiCandidatePersonalInfoGetPersonalInfoCandidateIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiCandidatePersonalInfoGetPersonalInfoCandidateIdGet(candidateId, callback) {
      
      let postBody = null;
      // verify the required parameter 'candidateId' is set
      if (candidateId === undefined || candidateId === null) {
        throw new Error("Missing the required parameter 'candidateId' when calling apiCandidatePersonalInfoGetPersonalInfoCandidateIdGet");
      }

      let pathParams = {
        'candidateId': candidateId
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['Bearer', 'X-RS-Key'];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = CandidatePersonalInfoDtoApiResponse;

      return this.apiClient.callApi(
        '/api/CandidatePersonalInfo/GetPersonalInfo/{candidateId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiCandidatePersonalInfoUpdatePersonalInfoPost operation.
     * @callback moduleapi/CandidatePersonalInfoApi~apiCandidatePersonalInfoUpdatePersonalInfoPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CandidatePersonalInfoDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/CandidatePersonalInfoEditDto} opts.body 
     * @param {module:api/CandidatePersonalInfoApi~apiCandidatePersonalInfoUpdatePersonalInfoPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiCandidatePersonalInfoUpdatePersonalInfoPost(opts, callback) {
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
      let returnType = CandidatePersonalInfoDtoApiResponse;

      return this.apiClient.callApi(
        '/api/CandidatePersonalInfo/UpdatePersonalInfo', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}