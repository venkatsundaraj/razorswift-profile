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
import {JobTitleAndSkillCompactDtoApiResponse} from '../model/JobTitleAndSkillCompactDtoApiResponse';
import {JobTitleAndSkillCompactDtoIEnumerableApiResponse} from '../model/JobTitleAndSkillCompactDtoIEnumerableApiResponse';
import {JobTitleAndSkillCompactDtoPagedListApiResponse} from '../model/JobTitleAndSkillCompactDtoPagedListApiResponse';
import {JobTitleAndSkillCreateDto} from '../model/JobTitleAndSkillCreateDto';
import {JobTitleAndSkillDtoApiResponse} from '../model/JobTitleAndSkillDtoApiResponse';
import {JobTitleAndSkillEditDto} from '../model/JobTitleAndSkillEditDto';

/**
* JobTitleAndSkill service.
* @module api/JobTitleAndSkillApi
* @version v3.76(UAT)
*/
export class JobTitleAndSkillApi {

    /**
    * Constructs a new JobTitleAndSkillApi. 
    * @alias module:api/JobTitleAndSkillApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the apiJobTitleAndSkillGet operation.
     * @callback moduleapi/JobTitleAndSkillApi~apiJobTitleAndSkillGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/JobTitleAndSkillCompactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/JobTitleAndSkillApi~apiJobTitleAndSkillGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiJobTitleAndSkillGet(callback) {
      
      let postBody = null;

      let pathParams = {
        
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
      let returnType = JobTitleAndSkillCompactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/JobTitleAndSkill', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiJobTitleAndSkillGetAllByPageGet operation.
     * @callback moduleapi/JobTitleAndSkillApi~apiJobTitleAndSkillGetAllByPageGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/JobTitleAndSkillCompactDtoPagedListApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {Number} opts.pageNumber 
     * @param {Number} opts.pageSize 
     * @param {module:api/JobTitleAndSkillApi~apiJobTitleAndSkillGetAllByPageGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiJobTitleAndSkillGetAllByPageGet(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        'PageNumber': opts['pageNumber'],'PageSize': opts['pageSize']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['Bearer', 'X-RS-Key'];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = JobTitleAndSkillCompactDtoPagedListApiResponse;

      return this.apiClient.callApi(
        '/api/JobTitleAndSkill/GetAllByPage', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiJobTitleAndSkillGetByGuidGuidGet operation.
     * @callback moduleapi/JobTitleAndSkillApi~apiJobTitleAndSkillGetByGuidGuidGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/JobTitleAndSkillDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} guid 
     * @param {module:api/JobTitleAndSkillApi~apiJobTitleAndSkillGetByGuidGuidGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiJobTitleAndSkillGetByGuidGuidGet(guid, callback) {
      
      let postBody = null;
      // verify the required parameter 'guid' is set
      if (guid === undefined || guid === null) {
        throw new Error("Missing the required parameter 'guid' when calling apiJobTitleAndSkillGetByGuidGuidGet");
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
      let returnType = JobTitleAndSkillDtoApiResponse;

      return this.apiClient.callApi(
        '/api/JobTitleAndSkill/GetByGuid/{guid}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiJobTitleAndSkillIdDelete operation.
     * @callback moduleapi/JobTitleAndSkillApi~apiJobTitleAndSkillIdDeleteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/JobTitleAndSkillCompactDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/JobTitleAndSkillApi~apiJobTitleAndSkillIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiJobTitleAndSkillIdDelete(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiJobTitleAndSkillIdDelete");
      }

      let pathParams = {
        'id': id
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
      let returnType = JobTitleAndSkillCompactDtoApiResponse;

      return this.apiClient.callApi(
        '/api/JobTitleAndSkill/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiJobTitleAndSkillIdGet operation.
     * @callback moduleapi/JobTitleAndSkillApi~apiJobTitleAndSkillIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/JobTitleAndSkillDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/JobTitleAndSkillApi~apiJobTitleAndSkillIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiJobTitleAndSkillIdGet(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiJobTitleAndSkillIdGet");
      }

      let pathParams = {
        'id': id
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
      let returnType = JobTitleAndSkillDtoApiResponse;

      return this.apiClient.callApi(
        '/api/JobTitleAndSkill/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiJobTitleAndSkillPost operation.
     * @callback moduleapi/JobTitleAndSkillApi~apiJobTitleAndSkillPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/JobTitleAndSkillDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/JobTitleAndSkillCreateDto} opts.body 
     * @param {module:api/JobTitleAndSkillApi~apiJobTitleAndSkillPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiJobTitleAndSkillPost(opts, callback) {
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
      let returnType = JobTitleAndSkillDtoApiResponse;

      return this.apiClient.callApi(
        '/api/JobTitleAndSkill', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiJobTitleAndSkillPut operation.
     * @callback moduleapi/JobTitleAndSkillApi~apiJobTitleAndSkillPutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/JobTitleAndSkillDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/JobTitleAndSkillEditDto} opts.body 
     * @param {module:api/JobTitleAndSkillApi~apiJobTitleAndSkillPutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiJobTitleAndSkillPut(opts, callback) {
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
      let returnType = JobTitleAndSkillDtoApiResponse;

      return this.apiClient.callApi(
        '/api/JobTitleAndSkill', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}