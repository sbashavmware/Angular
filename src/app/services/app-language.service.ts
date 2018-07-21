import { Injectable } from '@angular/core';
import { Config } from '../config.provider';
import { RestApi } from './restapi.service';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { ILanguage } from '../apiTypes/languageData';

/** Language service used to fetch the list of languages */
@Injectable()
export class AppLanguageService {

   /**
   * Initialize configurations on the load of the language service 
   * @param restApi rest service used to do the api calls 
   * @param config  Config provider to access application config variables
   */
  constructor(private config : Config, private restApi : RestApi) {
  }

  /**
   * Get all the languages list
   * @returns list of languages 
   */
  getAppLanguages():Observable<ILanguage>{
    return this.restApi.get(this.config.apiPaths.languagesList);
  }
}
