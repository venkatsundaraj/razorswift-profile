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
import {ParserCompactDtoApiResponse} from '../model/ParserCompactDtoApiResponse';
import {ParserCompactDtoIEnumerableApiResponse} from '../model/ParserCompactDtoIEnumerableApiResponse';
import {ParserCompactDtoPagedListApiResponse} from '../model/ParserCompactDtoPagedListApiResponse';
import {ParserCreateDto} from '../model/ParserCreateDto';
import {ParserDtoApiResponse} from '../model/ParserDtoApiResponse';
import {ParserEditDto} from '../model/ParserEditDto';

/**
* Parser service.
* @module api/ParserApi
* @version v3.76(UAT)
*/
export class ParserApi {

    /**
    * Constructs a new ParserApi. 
    * @alias module:api/ParserApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the apiParserGet operation.
     * @callback moduleapi/ParserApi~apiParserGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ParserCompactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/ParserApi~apiParserGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiParserGet(callback) {
      
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
      let returnType = ParserCompactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/Parser', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiParserGetAllParserPageGet operation.
     * @callback moduleapi/ParserApi~apiParserGetAllParserPageGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ParserCompactDtoPagedListApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {Number} opts.pageNumber 
     * @param {Number} opts.pageSize 
     * @param {module:api/ParserApi~apiParserGetAllParserPageGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiParserGetAllParserPageGet(opts, callback) {
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
      let returnType = ParserCompactDtoPagedListApiResponse;

      return this.apiClient.callApi(
        '/api/Parser/GetAllParserPage', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiParserGetByGuidGuidGet operation.
     * @callback moduleapi/ParserApi~apiParserGetByGuidGuidGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ParserDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} guid 
     * @param {module:api/ParserApi~apiParserGetByGuidGuidGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiParserGetByGuidGuidGet(guid, callback) {
      
      let postBody = null;
      // verify the required parameter 'guid' is set
      if (guid === undefined || guid === null) {
        throw new Error("Missing the required parameter 'guid' when calling apiParserGetByGuidGuidGet");
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
      let returnType = ParserDtoApiResponse;

      return this.apiClient.callApi(
        '/api/Parser/GetByGuid/{guid}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiParserIdDelete operation.
     * @callback moduleapi/ParserApi~apiParserIdDeleteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ParserCompactDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/ParserApi~apiParserIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiParserIdDelete(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiParserIdDelete");
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
      let returnType = ParserCompactDtoApiResponse;

      return this.apiClient.callApi(
        '/api/Parser/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiParserIdGet operation.
     * @callback moduleapi/ParserApi~apiParserIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ParserDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/ParserApi~apiParserIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiParserIdGet(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiParserIdGet");
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
      let returnType = ParserDtoApiResponse;

      return this.apiClient.callApi(
        '/api/Parser/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiParserPost operation.
     * @callback moduleapi/ParserApi~apiParserPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ParserDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/ParserCreateDto} opts.body 
     * @param {module:api/ParserApi~apiParserPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiParserPost(opts, callback) {
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
      let returnType = ParserDtoApiResponse;

      return this.apiClient.callApi(
        '/api/Parser', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiParserPut operation.
     * @callback moduleapi/ParserApi~apiParserPutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ParserDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/ParserEditDto} opts.body 
     * @param {module:api/ParserApi~apiParserPutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiParserPut(opts, callback) {
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
      let returnType = ParserDtoApiResponse;

      return this.apiClient.callApi(
        '/api/Parser', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}