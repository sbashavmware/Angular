import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientViewComponent } from './patient-view.component';
import { HttpModule } from '@angular/http';
import { TranslationModule, L10nConfig, ProviderType, TranslationService } from 'angular-l10n';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { PatientViewService } from '../../services/patientview.service';
import { of } from "rxjs/observable/of";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Config } from '../../config.provider';

describe('PatientViewComponent', () => {
  let component: PatientViewComponent;
  let fixture: ComponentFixture<PatientViewComponent>;
  let mockPatientViewService;
  const l10nConfig: L10nConfig = {
    locale: {
      languages: [
        { code: 'en', dir: 'ltr' },
        { code: 'fr', dir: 'ltr' }
      ],
      defaultLocale: { languageCode: 'en', countryCode: 'US' },
      language: 'en'
    },
    translation: {
      providers: [
        { type: ProviderType.Static, prefix: './images/i18n/locale-' }
      ],
      caching: true
    }
  };

  let PATIENTDETAILS = {
    "patientDetails" : [
        {
            "id" : 1,
            "name" : "kohli",
           "age" :25,
            "address" :" Greenlands Navi mumbai",
            "city":"Mumbai",
            "email": "kohli@gmail.com",
           "phoneNumber":"123456789",
           "reasonForVisit":"High Fever"
        },
        {
            "id" : 2,
            "name" : "rohit",
           "age" :26,
            "address" :" Greenlands Delhi",
            "city":"delhi",
            "email": "rohit@gmail.com",
           "phoneNumber":"123456789",
           "reasonForVisit":"High Fever"
        },
        {
            "id" : 3,
            "name" : "rahul",
           "age" :28,
            "address" :" Greenlands bangalore",
            "city":"bangalore",
            "email": "rahul@gmail.com",
           "phoneNumber":"123456789",
           "reasonForVisit":"High Fever"
        }
      ]
    };

  beforeEach(async(() => {
    mockPatientViewService =  jasmine.createSpyObj(['fetchPatients']);

    TestBed.configureTestingModule({
      imports: [TranslationModule.forRoot(l10nConfig),ClarityModule, HttpClientModule,
      HttpModule], 
      declarations: [ PatientViewComponent ],
      providers : [ TranslationService , Config, {provide : PatientViewService ,  useValue : mockPatientViewService} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockPatientViewService.fetchPatients.and.returnValue(of(PATIENTDETAILS));
    fixture = TestBed.createComponent(PatientViewComponent);
    component = fixture.componentInstance;
    component.patientDetails = '';
    fixture.detectChanges();
    
  });

  it('Should fetch the patient details', () => {
    expect(component.patientDetails).toBe(PATIENTDETAILS.patientDetails);
  });
 

  it('Should populate alert Type as danger alert and contain error message ', () => {
    let errorMsg =  'test for invalid error msg';
    component.showErrorMsg(errorMsg);
    expect(component.alertType).toBe('alert-danger');
    expect(component.alertMessage).toBe(errorMsg); 
  });

  it('Should populate alert Type as success alert and contain success message ', () => {
    let successMsg =  'test for valid error msg';
    component.showSuccessMsg(successMsg);
    expect(component.alertType).toBe('alert-success');
    expect(component.alertMessage).toBe(successMsg); 
  });

 

});


describe('PatientViewComponent error Msg failure Test', () => {
  let component: PatientViewComponent;
  let fixture: ComponentFixture<PatientViewComponent>;
  let mockPatientViewService1;
  let errorResponse;
  const l10nConfig: L10nConfig = {
    locale: {
      languages: [
        { code: 'en', dir: 'ltr' },
        { code: 'fr', dir: 'ltr' }
      ],
      defaultLocale: { languageCode: 'en', countryCode: 'US' },
      language: 'en'
    },
    translation: {
      providers: [
        { type: ProviderType.Static, prefix: './images/i18n/locale-' }
      ],
      caching: true
    }
  };
   
  errorResponse  = {status: 404}; 
  beforeEach(async(() => {
    mockPatientViewService1 =  jasmine.createSpyObj(['fetchPatients']);
    TestBed.configureTestingModule({
      imports: [TranslationModule.forRoot(l10nConfig),ClarityModule, HttpClientModule,
      HttpModule], 
      declarations: [ PatientViewComponent ],
      providers : [  TranslationService , Config, {provide : PatientViewService ,  useValue : mockPatientViewService1} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientViewComponent);
    component = fixture.componentInstance;
  });

  it('Should fetch the patient details', () => {
    mockPatientViewService1.fetchPatients.and.returnValue(Observable.throw(errorResponse));
    fixture.detectChanges();
    expect(component.errorDetails).toEqual(errorResponse);
  });
 
});
