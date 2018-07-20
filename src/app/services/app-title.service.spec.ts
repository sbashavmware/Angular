 import { TestBed, inject } from '@angular/core/testing';

import { AppTitleService } from './app-title.service';
import { Config } from '../config.provider';
import { RestApi } from './restapi.service';
import { TranslationModule, ProviderType, L10nConfig } from '../../../node_modules/angular-l10n';
import { ClarityModule } from '../../../node_modules/@clr/angular';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { HttpModule } from '../../../node_modules/@angular/http';
import { of } from '../../../node_modules/rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


describe('AppTitleService for successful config response', () => {
let mockRestApi;
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
let titleResponse = {
  "appTitle": "Patient Management App"
};
  beforeEach(() => {
    mockRestApi =  jasmine.createSpyObj(['get','post','put','delete']);
    TestBed.configureTestingModule({
      imports: [TranslationModule.forRoot(l10nConfig),ClarityModule, HttpClientModule,
        HttpModule], 
      providers: [Config, AppTitleService,
       { provide : RestApi , useValue: mockRestApi}
      ]
    });
    mockRestApi.get.and.returnValue(of(titleResponse));
  });

  it('Should Assign the title of the application with successful config title response ', inject([AppTitleService], (service: AppTitleService) => {
     service.getAppTitle();
     expect(service.appTitleResp).toBe(titleResponse.appTitle);
  }));

});
 

describe('AppTitleService with invalid config response', () => {
  let mockRestApi;
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
  let titleResponse = {};
    beforeEach(() => {
      mockRestApi =  jasmine.createSpyObj(['get','post','put','delete']);
      TestBed.configureTestingModule({
        imports: [TranslationModule.forRoot(l10nConfig),ClarityModule, HttpClientModule,
          HttpModule], 
        providers: [Config, AppTitleService,
         { provide : RestApi , useValue: mockRestApi}
        ]
      });
      mockRestApi.get.and.returnValue(of(titleResponse));
    });
  
    it('Should Assign the title of the application with invalid response and assign default title to app', inject([AppTitleService], (service: AppTitleService) => {
      mockRestApi.get.and.returnValue(of(titleResponse));
      service.getAppTitle();
      expect(service.appTitleResp).toBe('Patient Managemnet');
   })); 
  });




describe('AppTitleService Error response', () => {
  let mockRestApi;
  let config;
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
  let errorResponse  = {status: 404}; 
  
  beforeEach(() => {
      mockRestApi =  jasmine.createSpyObj(['get','post','put','delete']);
      TestBed.configureTestingModule({
        imports: [TranslationModule.forRoot(l10nConfig),ClarityModule, HttpClientModule,
          HttpModule], 
        providers: [Config, AppTitleService,
         { provide : RestApi , useValue: mockRestApi}
        ]
      });
      mockRestApi.get.and.returnValue(Observable.throw(errorResponse));
      config = TestBed.get(Config);
    });
  
  
    it('Should Assign the title of the application with error response and assign the default title to app ', inject([AppTitleService], (service: AppTitleService) => {
      service.getAppTitle();
      expect(service.appTitleResp).toBe(config.appTitle);
   })); 

   
   it('Should return the observable when we call the getTitle Observable method ', inject([AppTitleService], (service: AppTitleService) => {
    spyOn(service,'getTitleObservable').and.returnValue(of('test')); 
    let titleOnsResp = service.getTitleObservable();
    expect(titleOnsResp).toEqual(of('test'));
 })); 
});