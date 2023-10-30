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
import {BooleanApiResponse} from '../model/BooleanApiResponse';
import {ContactCompactDtoIEnumerableApiResponse} from '../model/ContactCompactDtoIEnumerableApiResponse';
import {ContactCreateDto} from '../model/ContactCreateDto';
import {ContactDtoApiResponse} from '../model/ContactDtoApiResponse';
import {ContactDtoIEnumerableApiResponse} from '../model/ContactDtoIEnumerableApiResponse';
import {ContactEditDto} from '../model/ContactEditDto';

/**
* Contact service.
* @module api/ContactApi
* @version v3.76(UAT)
*/
export class ContactApi {

    /**
    * Constructs a new ContactApi. 
    * @alias module:api/ContactApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the apiContactGet operation.
     * @callback moduleapi/ContactApi~apiContactGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContactCompactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/ContactApi~apiContactGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiContactGet(callback) {
      
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
      let returnType = ContactCompactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/Contact', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiContactGetByClientIdclientidGet operation.
     * @callback moduleapi/ContactApi~apiContactGetByClientIdclientidGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContactDtoIEnumerableApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} clientid 
     * @param {module:api/ContactApi~apiContactGetByClientIdclientidGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiContactGetByClientIdclientidGet(clientid, callback) {
      
      let postBody = null;
      // verify the required parameter 'clientid' is set
      if (clientid === undefined || clientid === null) {
        throw new Error("Missing the required parameter 'clientid' when calling apiContactGetByClientIdclientidGet");
      }

      let pathParams = {
        'clientid': clientid
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
      let returnType = ContactDtoIEnumerableApiResponse;

      return this.apiClient.callApi(
        '/api/Contact/GetByClientId{clientid}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiContactIdDelete operation.
     * @callback moduleapi/ContactApi~apiContactIdDeleteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/BooleanApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/ContactApi~apiContactIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiContactIdDelete(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiContactIdDelete");
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
      let returnType = BooleanApiResponse;

      return this.apiClient.callApi(
        '/api/Contact/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiContactIdGet operation.
     * @callback moduleapi/ContactApi~apiContactIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContactDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/ContactApi~apiContactIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiContactIdGet(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiContactIdGet");
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
      let returnType = ContactDtoApiResponse;

      return this.apiClient.callApi(
        '/api/Contact/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiContactPost operation.
     * @callback moduleapi/ContactApi~apiContactPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContactDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/ContactCreateDto} opts.body 
     * @param {module:api/ContactApi~apiContactPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiContactPost(opts, callback) {
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
      let returnType = ContactDtoApiResponse;

      return this.apiClient.callApi(
        '/api/Contact', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiContactPut operation.
     * @callback moduleapi/ContactApi~apiContactPutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContactDtoApiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/ContactEditDto} opts.body 
     * @param {module:api/ContactApi~apiContactPutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiContactPut(opts, callback) {
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
      let returnType = ContactDtoApiResponse;

      return this.apiClient.callApi(
        '/api/Contact', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}