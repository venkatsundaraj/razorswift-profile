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
import {SourcingSequenceCompactDtoApiResponse} from '../model/SourcingSequenceCompactDtoApiResponse';
import {SourcingSequenceCompactDtoIEnumerableApiResponse} from '../model/SourcingSequenceCompactDtoIEnumerableApiResponse';
import {SourcingSequenceCompactDtoPagedListApiResponse} from '../model/SourcingSequenceCompactDtoPagedListApiResponse';
import {SourcingSequenceCreateDto} from '../model/SourcingSequenceCreateDto';
import {SourcingSequenceDtoApiResponse} from '../model/SourcingSequenceDtoApiResponse';
import {SourcingSequenceEditDto} from '../model/SourcingSequenceEditDto';
import {SourcingSequenceFilterDtoIEnumerableApiResponse} from '../model/SourcingSequenceFilterDtoIEnumerableApiResponse';

/**
* SourcingSequence service.
* @module api/SourcingSequenceApi
* @version v3.76(UAT)
*/
export class SourcingSequenceApi {

    /**
    * Constructs a new SourcingSequenceApi. 
    * @alias module:api/SourcingSequenceApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the apiSourcingSequenceGet operation.
     * @callback moduleapi/SourcingSequenceApi~apiSourcingSequenceGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SourcingSequenceCompactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/SourcingSequenceApi~apiSourcingSequenceGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSourcingSequenceGet(callback) {
      
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
      let returnType = SourcingSequenceCompactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/SourcingSequence', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSourcingSequenceGetAllByNameGet operation.
     * @callback moduleapi/SourcingSequenceApi~apiSourcingSequenceGetAllByNameGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SourcingSequenceFilterDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.name 
     * @param {module:api/SourcingSequenceApi~apiSourcingSequenceGetAllByNameGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSourcingSequenceGetAllByNameGet(opts, callback) {
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
      let returnType = SourcingSequenceFilterDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/SourcingSequence/GetAllByName', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSourcingSequenceGetAllByPageGet operation.
     * @callback moduleapi/SourcingSequenceApi~apiSourcingSequenceGetAllByPageGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SourcingSequenceCompactDtoPagedListApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {Number} opts.pageNumber 
     * @param {Number} opts.pageSize 
     * @param {module:api/SourcingSequenceApi~apiSourcingSequenceGetAllByPageGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSourcingSequenceGetAllByPageGet(opts, callback) {
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
      let returnType = SourcingSequenceCompactDtoPagedListApiResponse;

      return this.apiClient.callApi(
        '/api/SourcingSequence/GetAllByPage', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSourcingSequenceGetAllSourcingSequenceCountByJdIdJdIdGet operation.
     * @callback moduleapi/SourcingSequenceApi~apiSourcingSequenceGetAllSourcingSequenceCountByJdIdJdIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SourcingSequenceCompactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} jdId 
     * @param {module:api/SourcingSequenceApi~apiSourcingSequenceGetAllSourcingSequenceCountByJdIdJdIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSourcingSequenceGetAllSourcingSequenceCountByJdIdJdIdGet(jdId, callback) {
      
      let postBody = null;
      // verify the required parameter 'jdId' is set
      if (jdId === undefined || jdId === null) {
        throw new Error("Missing the required parameter 'jdId' when calling apiSourcingSequenceGetAllSourcingSequenceCountByJdIdJdIdGet");
      }

      let pathParams = {
        'JdId': jdId
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
      let returnType = SourcingSequenceCompactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/SourcingSequence/GetAllSourcingSequenceCountByJdId/{JdId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSourcingSequenceGetByGuidGuidGet operation.
     * @callback moduleapi/SourcingSequenceApi~apiSourcingSequenceGetByGuidGuidGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SourcingSequenceDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} guid 
     * @param {module:api/SourcingSequenceApi~apiSourcingSequenceGetByGuidGuidGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSourcingSequenceGetByGuidGuidGet(guid, callback) {
      
      let postBody = null;
      // verify the required parameter 'guid' is set
      if (guid === undefined || guid === null) {
        throw new Error("Missing the required parameter 'guid' when calling apiSourcingSequenceGetByGuidGuidGet");
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
      let returnType = SourcingSequenceDtoApiResponse;

      return this.apiClient.callApi(
        '/api/SourcingSequence/GetByGuid/{guid}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSourcingSequenceIdDelete operation.
     * @callback moduleapi/SourcingSequenceApi~apiSourcingSequenceIdDeleteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SourcingSequenceCompactDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/SourcingSequenceApi~apiSourcingSequenceIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSourcingSequenceIdDelete(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiSourcingSequenceIdDelete");
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
      let returnType = SourcingSequenceCompactDtoApiResponse;

      return this.apiClient.callApi(
        '/api/SourcingSequence/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSourcingSequenceIdGet operation.
     * @callback moduleapi/SourcingSequenceApi~apiSourcingSequenceIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SourcingSequenceDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/SourcingSequenceApi~apiSourcingSequenceIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSourcingSequenceIdGet(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiSourcingSequenceIdGet");
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
      let returnType = SourcingSequenceDtoApiResponse;

      return this.apiClient.callApi(
        '/api/SourcingSequence/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSourcingSequencePost operation.
     * @callback moduleapi/SourcingSequenceApi~apiSourcingSequencePostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SourcingSequenceDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/SourcingSequenceCreateDto} opts.body 
     * @param {module:api/SourcingSequenceApi~apiSourcingSequencePostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSourcingSequencePost(opts, callback) {
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
      let returnType = SourcingSequenceDtoApiResponse;

      return this.apiClient.callApi(
        '/api/SourcingSequence', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiSourcingSequencePut operation.
     * @callback moduleapi/SourcingSequenceApi~apiSourcingSequencePutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SourcingSequenceDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/SourcingSequenceEditDto} opts.body 
     * @param {module:api/SourcingSequenceApi~apiSourcingSequencePutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiSourcingSequencePut(opts, callback) {
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
      let returnType = SourcingSequenceDtoApiResponse;

      return this.apiClient.callApi(
        '/api/SourcingSequence', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}