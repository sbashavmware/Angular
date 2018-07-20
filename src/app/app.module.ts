import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { LoginComponent } from './components/login/login.component';
import { L10nConfig, L10nLoader, TranslationModule, StorageStrategy, ProviderType } from 'angular-l10n';
import { RegistrationComponent } from './components/registration/registration/registration.component';
import { ServiceModule } from "./services/service.module";
import { AppTitleService } from "./services/app-title.service";
import { AppLanguageService } from "./services/app-language.service";

/** Initialize and configure angular-l10n library */
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
        { type: ProviderType.Static, prefix: './i18n/locale-' }
      ],
      caching: true
    }
  }; 

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegistrationComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        TranslationModule.forRoot(l10nConfig),
        HttpClientModule,
        ClarityModule,
        ServiceModule,
        ROUTING
    ],
    providers:[
      AppTitleService,
      AppLanguageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }
}
