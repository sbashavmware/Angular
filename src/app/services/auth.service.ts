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

@Injectable()
export class AuthService {


  constructor(private config: Config, private _apiCall : RestApi) {}


  login() : Observable<ILogin> {
    return this._apiCall.get(this.config.apiPaths.loginUrl);
  }


  saveUserProfile(updatedUserDetails : any) : Observable<ISaveUserProfile> {
    return this._apiCall.get(this.config.apiPaths.submitUserDet);
 }


}
