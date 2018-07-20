import { TestBed, inject, async } from '@angular/core/testing';
import { TranslationModule, ProviderType, L10nConfig } from '../../../node_modules/angular-l10n';
import { ClarityModule } from '../../../node_modules/@clr/angular';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { HttpModule } from '../../../node_modules/@angular/http';
import { Config } from '../config.provider';
import { RestApi } from './restapi.service';
import { StateService } from './state.service';


describe('StateService testing', () => {
  let stateService;
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
      providers: [Config, StateService,RestApi]
    });
  });

  beforeEach( inject([StateService], (service ) => {
    stateService = service;
  }));

  it('Should get the state details ',async(() => {
    let stateResponse =  {
      "stateList": [
          {
             "stateCode":"AND",
             "stateCodeNumber":0,
             "stateName":"Andhra Pradesh"
          },
          {
             "stateCode":"ANN",
             "stateCodeNumber":0,
             "stateName":"Andaman & Nicobar"
          },
          {
             "stateCode":"ARU",
             "stateCodeNumber":0,
             "stateName":"Arunachal Pradesh"
          },
          {
             "stateCode":"ASM",
             "stateCodeNumber":0,
             "stateName":"Assam"
          },
          {
             "stateCode":"BIH",
             "stateCodeNumber":0,
             "stateName":"Bihar"
          },
          {
             "stateCode":"CHA",
             "stateCodeNumber":0,
             "stateName":"Chandigarh"
          },
          {
             "stateCode":"CHH",
             "stateCodeNumber":0,
             "stateName":"Chhattisgarh"
          },
          {
             "stateCode":"DAM",
             "stateCodeNumber":0,
             "stateName":"Daman & Diu"
          },
          {
             "stateCode":"DAN",
             "stateCodeNumber":0,
             "stateName":"Dadra and Nagar Haveli"
          },
          {
             "stateCode":"DEL",
             "stateCodeNumber":0,
             "stateName":"Delhi"
          },
          {
             "stateCode":"GOA",
             "stateCodeNumber":0,
             "stateName":"Goa"
          },
          {
             "stateCode":"GUJ",
             "stateCodeNumber":0,
             "stateName":"Gujarat"
          },
          {
             "stateCode":"HAR",
             "stateCodeNumber":0,
             "stateName":"Haryana"
          },
          {
             "stateCode":"HP",
             "stateCodeNumber":0,
             "stateName":"Himachal Pradesh"
          },
          {
             "stateCode":"JHA",
             "stateCodeNumber":0,
             "stateName":"Jharkhand"
          },
          {
             "stateCode":"JK",
             "stateCodeNumber":0,
             "stateName":"Jammu and Kashmir"
          },
          {
             "stateCode":"KAR",
             "stateCodeNumber":0,
             "stateName":"Karnataka"
          },
          {
             "stateCode":"KER",
             "stateCodeNumber":0,
             "stateName":"Kerala"
          },
          {
             "stateCode":"LAK",
             "stateCodeNumber":0,
             "stateName":"Lakshadweep"
          },
          {
             "stateCode":"MAH",
             "stateCodeNumber":0,
             "stateName":"Maharashtra"
          },
          {
             "stateCode":"MAN",
             "stateCodeNumber":0,
             "stateName":"Manipur"
          },
          {
             "stateCode":"MAP",
             "stateCodeNumber":0,
             "stateName":"Madhya Pradesh"
          },
          {
             "stateCode":"MEG",
             "stateCodeNumber":0,
             "stateName":"Meghalaya"
          },
          {
             "stateCode":"MIZ",
             "stateCodeNumber":0,
             "stateName":"Mizoram"
          },
          {
             "stateCode":"NAG",
             "stateCodeNumber":0,
             "stateName":"Nagaland"
          },
          {
             "stateCode":"ORR",
             "stateCodeNumber":0,
             "stateName":"Orissa"
          },
          {
             "stateCode":"PON",
             "stateCodeNumber":0,
             "stateName":"Pondicherry"
          },
          {
             "stateCode":"PUN",
             "stateCodeNumber":0,
             "stateName":"Punjab"
          },
          {
             "stateCode":"RAJ",
             "stateCodeNumber":0,
             "stateName":"Rajasthan"
          },
          {
             "stateCode":"SIK",
             "stateCodeNumber":0,
             "stateName":"Sikkim"
          },
          {
             "stateCode":"TAN",
             "stateCodeNumber":0,
             "stateName":"Tamil Nadu"
          },
          {
             "stateCode":"TIR",
             "stateCodeNumber":0,
             "stateName":"Tripura"
          },
          {
             "stateCode":"UTP",
             "stateCodeNumber":0,
             "stateName":"Uttar Pradesh"
          },
          {
             "stateCode":"UTT",
             "stateCodeNumber":0,
             "stateName":"Uttarakhand"
          },
          {
             "stateCode":"WEB",
             "stateCodeNumber":0,
             "stateName":"West Bengal"
          }
       ]
    };  
  
                  
      stateService.fetchStates().subscribe(jsonStateResp => {
          expect(jsonStateResp.stateList).toEqual(stateResponse.stateList);
      }); 
                                             
  }));
});

