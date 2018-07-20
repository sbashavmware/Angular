import { TestBed, inject, async } from '@angular/core/testing';
import { AppLanguageService } from './app-language.service';
import { TranslationModule, L10nConfig, ProviderType } from '../../../node_modules/angular-l10n';
import { ClarityModule } from '../../../node_modules/@clr/angular';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { RestApi } from './restapi.service';
import { HttpModule } from '../../../node_modules/@angular/http';
import { Config } from '../config.provider';

describe('AppLanguageService testing', () => {
  let languageService;
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
      providers: [Config, AppLanguageService,RestApi]
    });
  });

  beforeEach( inject([AppLanguageService], (service) => {
    languageService = service;
  }));

  it('Should get all the default languages assigned ',async(() => {
    let response = {
      "languageList":
      [
          { "name": "ENGLISH", "locale": "en" },
          { "name": "FRENCH", "locale": "fr" }
      ]
  };
    
     languageService.getAppLanguages().subscribe(languages => {
       expect(languages.languageList).toEqual(response.languageList);
    }); 
  }));

 
});
