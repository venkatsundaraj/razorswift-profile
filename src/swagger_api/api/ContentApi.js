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
import {ContentCompactDtoApiResponse} from '../model/ContentCompactDtoApiResponse';
import {ContentCompactDtoIEnumerableApiResponse} from '../model/ContentCompactDtoIEnumerableApiResponse';
import {ContentCompactDtoPagedListApiResponse} from '../model/ContentCompactDtoPagedListApiResponse';
import {ContentCreateDto} from '../model/ContentCreateDto';
import {ContentDtoApiResponse} from '../model/ContentDtoApiResponse';
import {ContentEditDto} from '../model/ContentEditDto';

/**
* Content service.
* @module api/ContentApi
* @version v3.76(UAT)
*/
export class ContentApi {

    /**
    * Constructs a new ContentApi. 
    * @alias module:api/ContentApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the apiContentGet operation.
     * @callback moduleapi/ContentApi~apiContentGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContentCompactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/ContentApi~apiContentGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiContentGet(callback) {
      
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
      let returnType = ContentCompactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/Content', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiContentGetAllByPageGet operation.
     * @callback moduleapi/ContentApi~apiContentGetAllByPageGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContentCompactDtoPagedListApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {Number} opts.pageNumber 
     * @param {Number} opts.pageSize 
     * @param {module:api/ContentApi~apiContentGetAllByPageGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiContentGetAllByPageGet(opts, callback) {
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
      let returnType = ContentCompactDtoPagedListApiResponse;

      return this.apiClient.callApi(
        '/api/Content/GetAllByPage', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiContentGetAllContentByCourseIdCourseIdGet operation.
     * @callback moduleapi/ContentApi~apiContentGetAllContentByCourseIdCourseIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContentCompactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} courseId 
     * @param {module:api/ContentApi~apiContentGetAllContentByCourseIdCourseIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiContentGetAllContentByCourseIdCourseIdGet(courseId, callback) {
      
      let postBody = null;
      // verify the required parameter 'courseId' is set
      if (courseId === undefined || courseId === null) {
        throw new Error("Missing the required parameter 'courseId' when calling apiContentGetAllContentByCourseIdCourseIdGet");
      }

      let pathParams = {
        'courseId': courseId
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
      let returnType = ContentCompactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/Content/GetAllContentByCourseId/{courseId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiContentGetAllPageByEntityIdEntityIdGet operation.
     * @callback moduleapi/ContentApi~apiContentGetAllPageByEntityIdEntityIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContentCompactDtoPagedListApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} entityId 
     * @param {Object} opts Optional parameters
     * @param {Number} opts.pageNumber 
     * @param {Number} opts.pageSize 
     * @param {module:api/ContentApi~apiContentGetAllPageByEntityIdEntityIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiContentGetAllPageByEntityIdEntityIdGet(entityId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'entityId' is set
      if (entityId === undefined || entityId === null) {
        throw new Error("Missing the required parameter 'entityId' when calling apiContentGetAllPageByEntityIdEntityIdGet");
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
      let returnType = ContentCompactDtoPagedListApiResponse;

      return this.apiClient.callApi(
        '/api/Content/GetAllPageByEntityId/{entityId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiContentGetByGuidGuidGet operation.
     * @callback moduleapi/ContentApi~apiContentGetByGuidGuidGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContentDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} guid 
     * @param {module:api/ContentApi~apiContentGetByGuidGuidGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiContentGetByGuidGuidGet(guid, callback) {
      
      let postBody = null;
      // verify the required parameter 'guid' is set
      if (guid === undefined || guid === null) {
        throw new Error("Missing the required parameter 'guid' when calling apiContentGetByGuidGuidGet");
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
      let returnType = ContentDtoApiResponse;

      return this.apiClient.callApi(
        '/api/Content/GetByGuid/{guid}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiContentIdDelete operation.
     * @callback moduleapi/ContentApi~apiContentIdDeleteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContentCompactDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/ContentApi~apiContentIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiContentIdDelete(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiContentIdDelete");
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
      let returnType = ContentCompactDtoApiResponse;

      return this.apiClient.callApi(
        '/api/Content/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiContentIdGet operation.
     * @callback moduleapi/ContentApi~apiContentIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContentDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/ContentApi~apiContentIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiContentIdGet(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiContentIdGet");
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
      let returnType = ContentDtoApiResponse;

      return this.apiClient.callApi(
        '/api/Content/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiContentPost operation.
     * @callback moduleapi/ContentApi~apiContentPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContentDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/ContentCreateDto} opts.body 
     * @param {module:api/ContentApi~apiContentPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiContentPost(opts, callback) {
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
      let returnType = ContentDtoApiResponse;

      return this.apiClient.callApi(
        '/api/Content', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiContentPut operation.
     * @callback moduleapi/ContentApi~apiContentPutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContentDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/ContentEditDto} opts.body 
     * @param {module:api/ContentApi~apiContentPutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiContentPut(opts, callback) {
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
      let returnType = ContentDtoApiResponse;

      return this.apiClient.callApi(
        '/api/Content', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}