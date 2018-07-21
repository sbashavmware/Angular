import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import { ILogin } from '../apiTypes/loginData';
import { Config } from '../config.provider';
import { RestApi } from './restapi.service';
import { ISaveUserProfile } from '../apiTypes/saveUserProfileData';

/** Auth service used for authentication */
@Injectable()
export class AuthService {

   /**
   * Initialize configurations on the load of the authentication service 
   * @param restApi rest service used to do the api calls 
   * @param config  Config provider to access application config variables
   */
  constructor(private config: Config, private _apiCall : RestApi) {}


  /**
   * Authentication for login 
   */
  login() : Observable<ILogin> {
    return this._apiCall.get(this.config.apiPaths.loginUrl);
  }

  /**
   * save transaction operation
   */
  saveUserProfile(updatedUserDetails : any) : Observable<ISaveUserProfile> {
    return this._apiCall.get(this.config.apiPaths.submitUserDet);
 }


}
