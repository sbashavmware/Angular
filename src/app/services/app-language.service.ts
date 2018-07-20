import { Injectable } from '@angular/core';
import { Config } from '../config.provider';
import { RestApi } from './restapi.service';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { ILanguage } from '../apiTypes/languageData';

@Injectable()
export class AppLanguageService {

  constructor(private config : Config, private restApi : RestApi) {
  }
  getAppLanguages():Observable<ILanguage>{
    return this.restApi.get(this.config.apiPaths.languagesList);
  }
}
