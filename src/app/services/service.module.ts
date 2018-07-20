import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config } from '../config.provider';
import { AuthService } from './auth.service';
import { AppTitleService } from './app-title.service';
import { CountryListService } from './countryList.service';
import { RestApi } from './restapi.service';
import { StateService } from './state.service';
import { ValidationService } from './validations.service';
import { PatientViewService } from './patientview.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [Config,
    AuthService,
    CountryListService,
    RestApi,
    StateService,
    ValidationService,
    PatientViewService]
})
export class ServiceModule { }
