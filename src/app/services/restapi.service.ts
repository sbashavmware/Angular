import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../config.provider';

/**
 * This is Rest Ajax api for all ajax calls. We have defined all the useful methods here.
 * Wrappers on top of Angular's HttpClient
 */

@Injectable()
export class RestApi {

  /**
   * Innitialize RestApi
   * @param _http
   * @param _config
   */
  constructor(private _http: HttpClient) {
  }

  

  /**
    *  Perform HTTP GET request
    *  @param url url of the resource to be fetched
    *  @returns {Observable}
    */
  public get(url: string): Observable<any> {
    return this._http.get(url);
  }

  /**
    *  Perform HTTP POST request
    *  @param url url of the resource
    *  @returns {Observable}
    */
  public post(url: string, body: Object): Observable<any> {
    return this._http.post(url, JSON.stringify(body));
  }

  /**
    *  Perform HTTP PUT request
    *  @param url url of the resource
    *  @returns {Observable}
    */
  public put(url: string, body: Object): Observable<any> {
    return this._http.put(url, JSON.stringify(body));
  }

  /**
    *  Perform HTTP DELETE request
    *  @param url url of the resource to be deleted
    *  @returns {Observable}
    */
  public delete(url: string): Observable<any> {
    return this._http.delete(url);
  }

  

}
