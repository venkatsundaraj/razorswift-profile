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
import {GlobalConfigrationCompactDtoApiResponse} from '../model/GlobalConfigrationCompactDtoApiResponse';
import {GlobalConfigrationCompactDtoIEnumerableApiResponse} from '../model/GlobalConfigrationCompactDtoIEnumerableApiResponse';
import {GlobalConfigrationCreateDto} from '../model/GlobalConfigrationCreateDto';
import {GlobalConfigrationEditDto} from '../model/GlobalConfigrationEditDto';
import {GlobalConfigurationDtoApiResponse} from '../model/GlobalConfigurationDtoApiResponse';

/**
* GlobalConfigration service.
* @module api/GlobalConfigrationApi
* @version v3.76(UAT)
*/
export class GlobalConfigrationApi {

    /**
    * Constructs a new GlobalConfigrationApi. 
    * @alias module:api/GlobalConfigrationApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the apiGlobalConfigrationGet operation.
     * @callback moduleapi/GlobalConfigrationApi~apiGlobalConfigrationGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GlobalConfigrationCompactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/GlobalConfigrationApi~apiGlobalConfigrationGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiGlobalConfigrationGet(callback) {
      
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
      let returnType = GlobalConfigrationCompactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/GlobalConfigration', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiGlobalConfigrationGetByGuidGuidGet operation.
     * @callback moduleapi/GlobalConfigrationApi~apiGlobalConfigrationGetByGuidGuidGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GlobalConfigurationDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} guid 
     * @param {module:api/GlobalConfigrationApi~apiGlobalConfigrationGetByGuidGuidGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiGlobalConfigrationGetByGuidGuidGet(guid, callback) {
      
      let postBody = null;
      // verify the required parameter 'guid' is set
      if (guid === undefined || guid === null) {
        throw new Error("Missing the required parameter 'guid' when calling apiGlobalConfigrationGetByGuidGuidGet");
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
      let returnType = GlobalConfigurationDtoApiResponse;

      return this.apiClient.callApi(
        '/api/GlobalConfigration/GetByGuid/{guid}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiGlobalConfigrationIdDelete operation.
     * @callback moduleapi/GlobalConfigrationApi~apiGlobalConfigrationIdDeleteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GlobalConfigrationCompactDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/GlobalConfigrationApi~apiGlobalConfigrationIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiGlobalConfigrationIdDelete(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiGlobalConfigrationIdDelete");
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
      let returnType = GlobalConfigrationCompactDtoApiResponse;

      return this.apiClient.callApi(
        '/api/GlobalConfigration/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiGlobalConfigrationIdGet operation.
     * @callback moduleapi/GlobalConfigrationApi~apiGlobalConfigrationIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GlobalConfigurationDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/GlobalConfigrationApi~apiGlobalConfigrationIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiGlobalConfigrationIdGet(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiGlobalConfigrationIdGet");
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
      let returnType = GlobalConfigurationDtoApiResponse;

      return this.apiClient.callApi(
        '/api/GlobalConfigration/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiGlobalConfigrationPost operation.
     * @callback moduleapi/GlobalConfigrationApi~apiGlobalConfigrationPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GlobalConfigurationDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/GlobalConfigrationCreateDto} opts.body 
     * @param {module:api/GlobalConfigrationApi~apiGlobalConfigrationPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiGlobalConfigrationPost(opts, callback) {
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
      let returnType = GlobalConfigurationDtoApiResponse;

      return this.apiClient.callApi(
        '/api/GlobalConfigration', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiGlobalConfigrationPut operation.
     * @callback moduleapi/GlobalConfigrationApi~apiGlobalConfigrationPutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GlobalConfigurationDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/GlobalConfigrationEditDto} opts.body 
     * @param {module:api/GlobalConfigrationApi~apiGlobalConfigrationPutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiGlobalConfigrationPut(opts, callback) {
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
      let returnType = GlobalConfigurationDtoApiResponse;

      return this.apiClient.callApi(
        '/api/GlobalConfigration', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}