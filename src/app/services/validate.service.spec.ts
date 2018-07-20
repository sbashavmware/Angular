import { TestBed } from "@angular/core/testing";
import { RegistrationComponent } from "../components/registration/registration/registration.component";
import { ValidationService } from "./validations.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TranslationModule, L10nConfig, ProviderType } from "angular-l10n";
import { ClarityModule } from "@clr/angular";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { CountryListService } from "./countryList.service";
import { StateService } from "./state.service";
import { HttpModule } from "@angular/http";
import { RestApi } from "./restapi.service";
import { Config } from "../config.provider";
import { LoginComponent } from "../components/login/login.component";
import { RouterTestingModule } from "../../../node_modules/@angular/router/testing";
describe('Testing the validation Service ',() => {
    let regComponent;
    let loginComponent;
    
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
    let mockAuthService;
    let mockCountryService ;
    let mockStateService ;
    let regComponentFixture;
    let loginComponetFixture;

    beforeEach(()=>{
    mockAuthService =  jasmine.createSpyObj(['login','saveUserProfile']);
    mockCountryService =  jasmine.createSpyObj(['getCountryList']);
    mockStateService = jasmine.createSpyObj(['fetchStates']);
        TestBed.configureTestingModule({ 
            imports: [ReactiveFormsModule,RouterTestingModule, FormsModule,TranslationModule.forRoot(l10nConfig),ClarityModule, HttpClientModule,
                HttpModule], 
              declarations: [RegistrationComponent,LoginComponent],
              providers: [
                ValidationService, Config,
                { provide : AuthService , useValue: mockAuthService },
                { provide : CountryListService , useValue : mockCountryService },
                { provide : StateService , useValue : mockStateService }
              ]        
        });
        regComponentFixture =  TestBed.createComponent(RegistrationComponent);
        regComponent =  regComponentFixture.componentInstance;
        loginComponetFixture =  TestBed.createComponent(LoginComponent);
        loginComponent = loginComponetFixture.componentInstance;
        
    })


    it('Should validate the phone number and return the response as null ', () => {
        let isValid;
        let phoneNumberField = regComponent.registrationForm.controls['phone'];
        phoneNumberField.setValue("9849689364");
        isValid =  ValidationService.phoneValidator(phoneNumberField);
        expect(isValid).toBe(null);  
    });

    it('Should validate the phone number and return the response as invalid ', () => {
        let isValid;
        let phoneNumberField = regComponent.registrationForm.controls['phone'];
        phoneNumberField.setValue("invalid");
        isValid =  ValidationService.phoneValidator(phoneNumberField);
        expect(isValid.invalidPhoneNumber).toBe(true);  
    });

    it('Should validate the email and return the response as null ', () => {
      let isValid;
      let emailField = loginComponent.loginForm.controls['loginName'];
      emailField.setValue("validemail@vmware.com");
      isValid =  ValidationService.emailValidator(emailField);
      expect(isValid).toBe(null);  
  });

  it('Should validate the email  and return the response as invalid ', () => {
      let isValid;
      let emailField = loginComponent.loginForm.controls['loginName'];
      emailField.setValue("invalidEmail");
      isValid =  ValidationService.emailValidator(emailField);
      expect(isValid.invalidEmailAddress).toBe(true);  
  });
});