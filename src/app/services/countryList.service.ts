import { Injectable } from '@angular/core';
import { RestApi } from './restapi.service';
import { Observable } from 'rxjs/Observable';
import { Config } from '../config.provider';
import 'rxjs/add/operator/map'
import { ICountry } from '../apiTypes/countryData';

/**
 * This service will retrieve the country and state lists.
 *
 */

@Injectable()
export class CountryListService {

    /** Innitialize CountryListService  */
    constructor(private _api: RestApi,
        private config: Config) { }

    /** Fetch country list */
    getCountryList(): Observable<ICountry> { 
        return this._api.get(this.config.apiPaths.getCountryList)
            .map(res => {
                return res;
            });
    }

  
}
