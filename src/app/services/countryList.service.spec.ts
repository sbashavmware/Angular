 import { TestBed, inject, async } from '@angular/core/testing';

import { CountryListService } from './countryList.service';
import { TranslationModule, ProviderType, L10nConfig } from '../../../node_modules/angular-l10n';
import { ClarityModule } from '../../../node_modules/@clr/angular';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { HttpModule } from '../../../node_modules/@angular/http';
import { Config } from '../config.provider';
import { RestApi } from './restapi.service';


describe('CountryListService testing', () => {
  let countryService;
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
      providers: [Config, CountryListService,RestApi]
    });
  });

  beforeEach( inject([CountryListService], (service ) => {
    countryService = service;
  }));

  it('Should get the country details ',async(() => {
    let countryResponse =  {
      "status": "S",
      "countryList": [
          {
              "countryCode": "AF",
              "countryName": "Afghanistan",
              "isRestricted": false
          },
        ]
      };  
  
                  
      countryService.getCountryList().subscribe(jsonCountryResp => {
          expect(jsonCountryResp.status).toEqual(countryResponse.status);
      }); 
                                             
  }));
});

