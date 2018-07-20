 import { TestBed, inject, async } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { TranslationModule, ProviderType, L10nConfig } from '../../../node_modules/angular-l10n';
import { ClarityModule } from '../../../node_modules/@clr/angular';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { HttpModule } from '../../../node_modules/@angular/http';
import { Config } from '../config.provider';
import { RestApi } from './restapi.service';

describe('AuthService for login Testing', () => {
  let authService;

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
      providers: [Config, AuthService,RestApi]
    });
  });

  beforeEach( inject([AuthService], (service) => {
    authService = service;
  }));

  it('Should get the login details on login ',async(() => {
    let loginResponse =  {
                          "emailAddress": "testpatient@vmware.com",
                          "password": "test",
                          "displayName": "TEST PATIENT USER",
                          "message": "Successfully Logged In",
                          "valid": true
                         };
  
                  
                        authService.login().subscribe(jsonLoginResp => {
                          expect(jsonLoginResp.emailAddress).toEqual(loginResponse.emailAddress);
                        }); 
                                             
  }));
});



describe('AuthService for saveUserProfile Testing', () => {
  let authService;
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
      providers: [Config, AuthService,RestApi]
    });
  });

  beforeEach( inject([AuthService], (service) => {
    authService = service;
  }));

  it('Should return the save response for the user details on save operation ',async(() => {
                        let saveProfileResponse =  {
                          "status":"S",
                          "message":"User Profile Updated Successfully!"
                        };
                  
                        authService.saveUserProfile().subscribe(jsonSaveResp => {
                          expect(jsonSaveResp.status).toEqual(saveProfileResponse.status);
                        }); 
                                             
  }));
});
