import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ClarityModule } from "@clr/angular";
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from "@angular/common";
import { RegistrationComponent } from './components/registration/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { L10nConfig, ProviderType, TranslationModule, TranslationService } from '../../node_modules/angular-l10n';
import { ReactiveFormsModule, FormsModule } from '../../node_modules/@angular/forms';
import { HttpModule } from '../../node_modules/@angular/http';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { ServiceModule } from './services/service.module';
import { AppTitleService } from './services/app-title.service';
import { of } from '../../node_modules/rxjs/observable/of';
import { AppLanguageService } from './services/app-language.service';
import { Routes, Router, ROUTES } from '../../node_modules/@angular/router';
import {Location} from "@angular/common";
import { APPROUTES } from './app.routing';
import { By } from '../../node_modules/@angular/platform-browser';
import { BrowserAnimationsModule } from '../../node_modules/@angular/platform-browser/animations';
import { toBase64String } from '../../node_modules/@angular/compiler/src/output/source_map';

describe('AppComponent Testing ', () => {

    let fixture: ComponentFixture<any>;
    let mockAppTitleService;
    let mockLanguageService;
    let translationService;
    let app;
    let router;
    let location;
    let LANGUAGES = {
        "languageList":
        [
            { "name": "ENGLISH", "locale": "en" },
            { "name": "FRENCH", "locale": "fr" }
        ]
    };
   
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

    beforeEach(() => {
        mockAppTitleService = jasmine.createSpyObj(['getTitleObservable']);
        mockLanguageService = jasmine.createSpyObj(['getAppLanguages']);
        
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                LoginComponent,
                RegistrationComponent
           ],
            imports: [
                BrowserAnimationsModule,
                ClarityModule.forRoot(),
                RouterTestingModule.withRoutes(APPROUTES),
                FormsModule,
                ReactiveFormsModule,
                HttpModule,
                TranslationModule.forRoot(l10nConfig),
                HttpClientModule,
                ClarityModule,
                ServiceModule
            ],
            providers: [
                {provide: APP_BASE_HREF, useValue: '/'},
                {provide: AppTitleService , useValue : mockAppTitleService},
                {provide: AppLanguageService , useValue : mockLanguageService},
                TranslationService,
            ]
        }).compileComponents();
        mockAppTitleService.getTitleObservable.and.returnValue(of('Patient Management App'));
        mockLanguageService.getAppLanguages.and.returnValue(of(LANGUAGES));
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
        translationService = TestBed.get(TranslationService);
        router = TestBed.get(Router);
        location = TestBed.get(Location);
        router.initialNavigation();
        fixture.detectChanges();
    });

   

    it('should create the app component', () => {
        expect(app).toBeTruthy();
    });
 
    it(` Should assign title as Patient Management App `, () => {
        expect(app.appTitle).toEqual('Patient Management App');
    });

    it(` Should assign languages to the application `, () => {
        expect(app.languageList).toEqual(LANGUAGES.languageList);
    });

    
    it('navigate to "login" takes you to /login', () => {
        router.navigate(['login']).then(() => {
                expect(location.path()).toBe('/login');
        });
    });
    
    it('navigate to "patient" takes you to /patient', () => {
        router.navigate(['patient']).then(() => {
            expect(location.path()).toBe('/patient');
       });
    }); 


    it('navigate to "registration" takes you to /registration', () => {
        router.navigate(['registration']).then(() => {
            expect(location.path()).toBe('/registration');
       });
    });

    it(' Should open the language modal on language click ', () => {
        let langualeLink = fixture.debugElement.query(By.css('.language-link'));
        langualeLink.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(app.isModalOpen).toBe(true);
    });

    
    it(' Should call the locale function for language set ', () => {
        app.selectLocale('fr');
        expect(app.locale.getCurrentLanguage()).toBe('fr');
    });

    it('Should unsubscribe  the subscription ', () => {
        app.titleSubscription = of({}).subscribe();
        app.languageSubscription = of({}).subscribe();
        fixture.destroy();
        expect(app.titleSubscription._subscriptions).toBeNull()
        expect(app.languageSubscription._subscriptions).toBeNull()
     });

    afterEach(() => {
        fixture.destroy();
    });
});
 