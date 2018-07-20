import { TestBed, inject, async } from '@angular/core/testing';
import { TranslationModule, ProviderType, L10nConfig } from '../../../node_modules/angular-l10n';
import { ClarityModule } from '../../../node_modules/@clr/angular';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { HttpModule } from '../../../node_modules/@angular/http';
import { Config } from '../config.provider';
import { RestApi } from './restapi.service';
import { PatientViewService } from './patientview.service';


describe('PatientView Service testing', () => {
  let patientService;

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
        { type: ProviderType.Static, prefix: '/i18n/locale-' }
      ],
      caching: true
    }
  };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslationModule.forRoot(l10nConfig),ClarityModule, HttpClientModule,
        HttpModule],
      providers: [Config, PatientViewService,RestApi]
    });
  });

  beforeEach( inject([PatientViewService], (service) => {
    patientService = service;
  }));

  it('Should get the patient details ',async(() => {
    let patientResponse = {
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
          },
          {
              "id" : 4,
              "name" : "naidu",
             "age" :25,
              "address" :" Greenlands hyderabad",
              "city":"Hyderabad",
              "email": "naidu@gmail.com",
             "phoneNumber":"123456789",
             "reasonForVisit":"High Fever"
          },
          {
              "id" : 5,
              "name" : "dhawan",
             "age" :29,
              "address" :" Greenlands Dhawan",
              "city":"dhawan",
              "email": "dhawan@gmail.com",
             "phoneNumber":"123456789",
             "reasonForVisit":"High Fever"
          }
      ]
  }; 
  
                  
      patientService.fetchPatients().subscribe(jsonPatientResp => {
          expect(jsonPatientResp.patientDetails).toEqual(patientResponse.patientDetails);
      }); 
                                             
  }));
});

