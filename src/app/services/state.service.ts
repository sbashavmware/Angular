import { Injectable } from '@angular/core';
import { RestApi } from './restapi.service';
import { Observable } from 'rxjs/Observable';
import { Config } from '../config.provider';
import 'rxjs/add/operator/map'
import { IStateList } from '../apiTypes/stateServiceData';

/**
 * This service will retrieve the country and state lists.
 *
 */

@Injectable()
export class StateService {

    /** Innitialize CountryListService  */
    constructor(private _api: RestApi,
        private config: Config) { }

    /** Fetch country list */
    fetchStates(): Observable<IStateList> { 
        return this._api.get(this.config.apiPaths.getStatesList)
            .map(states => {
                return states;
            });
    }
}
