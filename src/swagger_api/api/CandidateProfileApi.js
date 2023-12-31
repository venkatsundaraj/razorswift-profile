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
import {CandidateProfileViewDtoApiResponse} from '../model/CandidateProfileViewDtoApiResponse';

/**
* CandidateProfile service.
* @module api/CandidateProfileApi
* @version v3.76(UAT)
*/
export class CandidateProfileApi {

    /**
    * Constructs a new CandidateProfileApi. 
    * @alias module:api/CandidateProfileApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the apiCandidateProfileGetByGuidGuidGet operation.
     * @callback moduleapi/CandidateProfileApi~apiCandidateProfileGetByGuidGuidGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CandidateProfileViewDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} guid 
     * @param {module:api/CandidateProfileApi~apiCandidateProfileGetByGuidGuidGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiCandidateProfileGetByGuidGuidGet(guid, callback) {
      
      let postBody = null;
      // verify the required parameter 'guid' is set
      if (guid === undefined || guid === null) {
        throw new Error("Missing the required parameter 'guid' when calling apiCandidateProfileGetByGuidGuidGet");
      }

      let pathParams = {
        'guid': guid
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
      let returnType = CandidateProfileViewDtoApiResponse;

      return this.apiClient.callApi(
        '/api/CandidateProfile/GetByGuid/{guid}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiCandidateProfileGetBySlugSlugGet operation.
     * @callback moduleapi/CandidateProfileApi~apiCandidateProfileGetBySlugSlugGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CandidateProfileViewDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} slug 
     * @param {module:api/CandidateProfileApi~apiCandidateProfileGetBySlugSlugGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiCandidateProfileGetBySlugSlugGet(slug, callback) {
      
      let postBody = null;
      // verify the required parameter 'slug' is set
      if (slug === undefined || slug === null) {
        throw new Error("Missing the required parameter 'slug' when calling apiCandidateProfileGetBySlugSlugGet");
      }

      let pathParams = {
        'slug': slug
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
      let returnType = CandidateProfileViewDtoApiResponse;

      return this.apiClient.callApi(
        '/api/CandidateProfile/GetBySlug/{slug}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}