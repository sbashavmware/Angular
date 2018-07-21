import { Injectable } from '@angular/core';
import { RestApi } from './restapi.service';
import { Observable } from 'rxjs/Observable';
import { Config } from '../config.provider';
import 'rxjs/add/operator/map'
import { IStateList } from '../apiTypes/stateServiceData';

/**
 * This service will retrieve the state lists.
 *
 */

@Injectable()
export class StateService {

    /** Innitialize StateListService  */
    constructor(private _api: RestApi,
        private config: Config) { }

    /** Fetch state  list */
    fetchStates(): Observable<IStateList> { 
        return this._api.get(this.config.apiPaths.getStatesList)
            .map(states => {
                return states;
            });
    }
}
