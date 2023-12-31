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
import {MPathwayAttributeCompactDtoApiResponse} from '../model/MPathwayAttributeCompactDtoApiResponse';
import {MPathwayAttributeCompactDtoIEnumerableApiResponse} from '../model/MPathwayAttributeCompactDtoIEnumerableApiResponse';
import {MPathwayAttributeCompactDtoPagedListApiResponse} from '../model/MPathwayAttributeCompactDtoPagedListApiResponse';
import {MPathwayAttributeCreateDto} from '../model/MPathwayAttributeCreateDto';
import {MPathwayAttributeDtoApiResponse} from '../model/MPathwayAttributeDtoApiResponse';
import {MPathwayAttributeEditDto} from '../model/MPathwayAttributeEditDto';

/**
* MPathwayAttribute service.
* @module api/MPathwayAttributeApi
* @version v3.76(UAT)
*/
export class MPathwayAttributeApi {

    /**
    * Constructs a new MPathwayAttributeApi. 
    * @alias module:api/MPathwayAttributeApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the apiMPathwayAttributeGet operation.
     * @callback moduleapi/MPathwayAttributeApi~apiMPathwayAttributeGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MPathwayAttributeCompactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/MPathwayAttributeApi~apiMPathwayAttributeGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiMPathwayAttributeGet(callback) {
      
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
      let returnType = MPathwayAttributeCompactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/MPathwayAttribute', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiMPathwayAttributeGetAllByPageGet operation.
     * @callback moduleapi/MPathwayAttributeApi~apiMPathwayAttributeGetAllByPageGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MPathwayAttributeCompactDtoPagedListApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {Number} opts.pageNumber 
     * @param {Number} opts.pageSize 
     * @param {module:api/MPathwayAttributeApi~apiMPathwayAttributeGetAllByPageGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiMPathwayAttributeGetAllByPageGet(opts, callback) {
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
      let returnType = MPathwayAttributeCompactDtoPagedListApiResponse;

      return this.apiClient.callApi(
        '/api/MPathwayAttribute/GetAllByPage', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiMPathwayAttributeGetAllMPathwayAttributeByMPathwayTypeIdMPathwayTypeIdGet operation.
     * @callback moduleapi/MPathwayAttributeApi~apiMPathwayAttributeGetAllMPathwayAttributeByMPathwayTypeIdMPathwayTypeIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MPathwayAttributeCompactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} mPathwayTypeId 
     * @param {module:api/MPathwayAttributeApi~apiMPathwayAttributeGetAllMPathwayAttributeByMPathwayTypeIdMPathwayTypeIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiMPathwayAttributeGetAllMPathwayAttributeByMPathwayTypeIdMPathwayTypeIdGet(mPathwayTypeId, callback) {
      
      let postBody = null;
      // verify the required parameter 'mPathwayTypeId' is set
      if (mPathwayTypeId === undefined || mPathwayTypeId === null) {
        throw new Error("Missing the required parameter 'mPathwayTypeId' when calling apiMPathwayAttributeGetAllMPathwayAttributeByMPathwayTypeIdMPathwayTypeIdGet");
      }

      let pathParams = {
        'mPathwayTypeId': mPathwayTypeId
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
      let returnType = MPathwayAttributeCompactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/MPathwayAttribute/GetAllMPathwayAttributeByMPathwayTypeId/{mPathwayTypeId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiMPathwayAttributeGetAllPageByEntityIdEntityIdGet operation.
     * @callback moduleapi/MPathwayAttributeApi~apiMPathwayAttributeGetAllPageByEntityIdEntityIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MPathwayAttributeCompactDtoPagedListApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} entityId 
     * @param {Object} opts Optional parameters
     * @param {Number} opts.pageNumber 
     * @param {Number} opts.pageSize 
     * @param {module:api/MPathwayAttributeApi~apiMPathwayAttributeGetAllPageByEntityIdEntityIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiMPathwayAttributeGetAllPageByEntityIdEntityIdGet(entityId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'entityId' is set
      if (entityId === undefined || entityId === null) {
        throw new Error("Missing the required parameter 'entityId' when calling apiMPathwayAttributeGetAllPageByEntityIdEntityIdGet");
      }

      let pathParams = {
        'entityId': entityId
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
      let returnType = MPathwayAttributeCompactDtoPagedListApiResponse;

      return this.apiClient.callApi(
        '/api/MPathwayAttribute/GetAllPageByEntityId/{entityId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiMPathwayAttributeGetByGuidGuidGet operation.
     * @callback moduleapi/MPathwayAttributeApi~apiMPathwayAttributeGetByGuidGuidGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MPathwayAttributeDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} guid 
     * @param {module:api/MPathwayAttributeApi~apiMPathwayAttributeGetByGuidGuidGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiMPathwayAttributeGetByGuidGuidGet(guid, callback) {
      
      let postBody = null;
      // verify the required parameter 'guid' is set
      if (guid === undefined || guid === null) {
        throw new Error("Missing the required parameter 'guid' when calling apiMPathwayAttributeGetByGuidGuidGet");
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
      let returnType = MPathwayAttributeDtoApiResponse;

      return this.apiClient.callApi(
        '/api/MPathwayAttribute/GetByGuid/{guid}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiMPathwayAttributeIdDelete operation.
     * @callback moduleapi/MPathwayAttributeApi~apiMPathwayAttributeIdDeleteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MPathwayAttributeCompactDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/MPathwayAttributeApi~apiMPathwayAttributeIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiMPathwayAttributeIdDelete(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiMPathwayAttributeIdDelete");
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
      let returnType = MPathwayAttributeCompactDtoApiResponse;

      return this.apiClient.callApi(
        '/api/MPathwayAttribute/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiMPathwayAttributeIdGet operation.
     * @callback moduleapi/MPathwayAttributeApi~apiMPathwayAttributeIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MPathwayAttributeDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/MPathwayAttributeApi~apiMPathwayAttributeIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiMPathwayAttributeIdGet(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiMPathwayAttributeIdGet");
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
      let returnType = MPathwayAttributeDtoApiResponse;

      return this.apiClient.callApi(
        '/api/MPathwayAttribute/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiMPathwayAttributePost operation.
     * @callback moduleapi/MPathwayAttributeApi~apiMPathwayAttributePostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MPathwayAttributeDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/MPathwayAttributeCreateDto} opts.body 
     * @param {module:api/MPathwayAttributeApi~apiMPathwayAttributePostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiMPathwayAttributePost(opts, callback) {
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
      let returnType = MPathwayAttributeDtoApiResponse;

      return this.apiClient.callApi(
        '/api/MPathwayAttribute', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiMPathwayAttributePut operation.
     * @callback moduleapi/MPathwayAttributeApi~apiMPathwayAttributePutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MPathwayAttributeDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/MPathwayAttributeEditDto} opts.body 
     * @param {module:api/MPathwayAttributeApi~apiMPathwayAttributePutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiMPathwayAttributePut(opts, callback) {
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
      let returnType = MPathwayAttributeDtoApiResponse;

      return this.apiClient.callApi(
        '/api/MPathwayAttribute', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}