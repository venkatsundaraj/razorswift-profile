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
import {SkillPlatformCompactDtoApiResponse} from '../model/SkillPlatformCompactDtoApiResponse';
import {SkillPlatformCompactDtoIEnumerableApiResponse} from '../model/SkillPlatformCompactDtoIEnumerableApiResponse';
import {SkillPlatformCompactDtoPagedListApiResponse} from '../model/SkillPlatformCompactDtoPagedListApiResponse';
import {SkillPlatformCreateDto} from '../model/SkillPlatformCreateDto';
import {SkillPlatformDtoApiResponse} from '../model/SkillPlatformDtoApiResponse';
import {SkillPlatformEditDto} from '../model/SkillPlatformEditDto';

/**
* SkillPlatform service.
* @module api/SkillPlatformApi
* @version v3.76(UAT)
*/
export class SkillPlatformApi {

    /**
    * Constructs a new SkillPlatformApi. 
    * @alias module:api/SkillPlatformApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the apiSkillPlatformGet operation.
     * @callback moduleapi/SkillPlatformApi~apiSkillPlatformGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SkillPlatformCompactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/SkillPlatformApi~apiSkillPlatformGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSkillPlatformGet(callback) {
      
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
      let returnType = SkillPlatformCompactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/SkillPlatform', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSkillPlatformGetAllByEntityIdEntityIdGet operation.
     * @callback moduleapi/SkillPlatformApi~apiSkillPlatformGetAllByEntityIdEntityIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SkillPlatformCompactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} entityId 
     * @param {module:api/SkillPlatformApi~apiSkillPlatformGetAllByEntityIdEntityIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSkillPlatformGetAllByEntityIdEntityIdGet(entityId, callback) {
      
      let postBody = null;
      // verify the required parameter 'entityId' is set
      if (entityId === undefined || entityId === null) {
        throw new Error("Missing the required parameter 'entityId' when calling apiSkillPlatformGetAllByEntityIdEntityIdGet");
      }

      let pathParams = {
        'entityId': entityId
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
      let returnType = SkillPlatformCompactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/SkillPlatform/GetAllByEntityId/{entityId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSkillPlatformGetAllByNameEntityIdGet operation.
     * @callback moduleapi/SkillPlatformApi~apiSkillPlatformGetAllByNameEntityIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SkillPlatformCompactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} entityId 
     * @param {Object} opts Optional parameters
     * @param {String} opts.name 
     * @param {module:api/SkillPlatformApi~apiSkillPlatformGetAllByNameEntityIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSkillPlatformGetAllByNameEntityIdGet(entityId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'entityId' is set
      if (entityId === undefined || entityId === null) {
        throw new Error("Missing the required parameter 'entityId' when calling apiSkillPlatformGetAllByNameEntityIdGet");
      }

      let pathParams = {
        'entityId': entityId
      };
      let queryParams = {
        'name': opts['name']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['Bearer', 'X-RS-Key'];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = SkillPlatformCompactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/SkillPlatform/GetAllByName/{entityId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSkillPlatformGetAllByNameGet operation.
     * @callback moduleapi/SkillPlatformApi~apiSkillPlatformGetAllByNameGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SkillPlatformCompactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.name 
     * @param {module:api/SkillPlatformApi~apiSkillPlatformGetAllByNameGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSkillPlatformGetAllByNameGet(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        'name': opts['name']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['Bearer', 'X-RS-Key'];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = SkillPlatformCompactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/SkillPlatform/GetAllByName', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSkillPlatformGetAllByPageGet operation.
     * @callback moduleapi/SkillPlatformApi~apiSkillPlatformGetAllByPageGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SkillPlatformCompactDtoPagedListApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {Number} opts.pageNumber 
     * @param {Number} opts.pageSize 
     * @param {module:api/SkillPlatformApi~apiSkillPlatformGetAllByPageGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSkillPlatformGetAllByPageGet(opts, callback) {
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
      let returnType = SkillPlatformCompactDtoPagedListApiResponse;

      return this.apiClient.callApi(
        '/api/SkillPlatform/GetAllByPage', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSkillPlatformGetAllPageByEntityGuidEntityGuidGet operation.
     * @callback moduleapi/SkillPlatformApi~apiSkillPlatformGetAllPageByEntityGuidEntityGuidGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SkillPlatformCompactDtoPagedListApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} entityGuid 
     * @param {Object} opts Optional parameters
     * @param {Number} opts.pageNumber 
     * @param {Number} opts.pageSize 
     * @param {module:api/SkillPlatformApi~apiSkillPlatformGetAllPageByEntityGuidEntityGuidGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSkillPlatformGetAllPageByEntityGuidEntityGuidGet(entityGuid, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'entityGuid' is set
      if (entityGuid === undefined || entityGuid === null) {
        throw new Error("Missing the required parameter 'entityGuid' when calling apiSkillPlatformGetAllPageByEntityGuidEntityGuidGet");
      }

      let pathParams = {
        'entityGuid': entityGuid
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
      let returnType = SkillPlatformCompactDtoPagedListApiResponse;

      return this.apiClient.callApi(
        '/api/SkillPlatform/GetAllPageByEntityGuid/{entityGuid}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSkillPlatformGetByGuidGuidGet operation.
     * @callback moduleapi/SkillPlatformApi~apiSkillPlatformGetByGuidGuidGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SkillPlatformDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} guid 
     * @param {module:api/SkillPlatformApi~apiSkillPlatformGetByGuidGuidGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSkillPlatformGetByGuidGuidGet(guid, callback) {
      
      let postBody = null;
      // verify the required parameter 'guid' is set
      if (guid === undefined || guid === null) {
        throw new Error("Missing the required parameter 'guid' when calling apiSkillPlatformGetByGuidGuidGet");
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
      let returnType = SkillPlatformDtoApiResponse;

      return this.apiClient.callApi(
        '/api/SkillPlatform/GetByGuid/{guid}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSkillPlatformIdDelete operation.
     * @callback moduleapi/SkillPlatformApi~apiSkillPlatformIdDeleteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SkillPlatformCompactDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/SkillPlatformApi~apiSkillPlatformIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSkillPlatformIdDelete(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiSkillPlatformIdDelete");
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
      let returnType = SkillPlatformCompactDtoApiResponse;

      return this.apiClient.callApi(
        '/api/SkillPlatform/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSkillPlatformIdGet operation.
     * @callback moduleapi/SkillPlatformApi~apiSkillPlatformIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SkillPlatformDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/SkillPlatformApi~apiSkillPlatformIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSkillPlatformIdGet(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiSkillPlatformIdGet");
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
      let returnType = SkillPlatformDtoApiResponse;

      return this.apiClient.callApi(
        '/api/SkillPlatform/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSkillPlatformPost operation.
     * @callback moduleapi/SkillPlatformApi~apiSkillPlatformPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SkillPlatformDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/SkillPlatformCreateDto} opts.body 
     * @param {module:api/SkillPlatformApi~apiSkillPlatformPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSkillPlatformPost(opts, callback) {
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
      let returnType = SkillPlatformDtoApiResponse;

      return this.apiClient.callApi(
        '/api/SkillPlatform', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSkillPlatformPut operation.
     * @callback moduleapi/SkillPlatformApi~apiSkillPlatformPutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SkillPlatformDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/SkillPlatformEditDto} opts.body 
     * @param {module:api/SkillPlatformApi~apiSkillPlatformPutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSkillPlatformPut(opts, callback) {
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
      let returnType = SkillPlatformDtoApiResponse;

      return this.apiClient.callApi(
        '/api/SkillPlatform', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}