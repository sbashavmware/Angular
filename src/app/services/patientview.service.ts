import { Injectable } from '@angular/core';
import { RestApi } from './restapi.service';
import { Observable } from 'rxjs/Observable';
import { Config } from '../config.provider';
import 'rxjs/add/operator/map'
import { IPatientDetails } from '../apiTypes/patientDetailsData';

/**
 * This service will retrieve the country and state lists.
 *
 */

@Injectable()
export class PatientViewService {

    /** Innitialize CountryListService  */
    constructor(private _api: RestApi,
        private config: Config) { }

    /** Fetch country list */
    fetchPatients(): Observable<IPatientDetails> { 
        
        return this._api.get(this.config.apiPaths.fetchPatientDetails);
    }

    
}
