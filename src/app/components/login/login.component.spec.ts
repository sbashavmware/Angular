import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { L10nConfig, ProviderType, TranslationModule, TranslationService } from '../../../../node_modules/angular-l10n';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { ClarityModule } from '../../../../node_modules/@clr/angular';
import { HttpModule } from '../../../../node_modules/@angular/http';
import { HttpClientModule } from '../../../../node_modules/@angular/common/http';
import { ServiceModule } from '../../services/service.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { of } from '../../../../node_modules/rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



describe('LoginComponent Testing', () => {
  let component: LoginComponent;
  let mockAuthService;
  let loginResponse = {
    "emailAddress": "testpatient@vmware.com",
    "password": "test",
    "displayName": "TEST PATIENT USER",
    "message": "Successfully Logged In",
    "valid": true
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
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    mockAuthService = jasmine.createSpyObj(['login','saveUserProfile']);
    TestBed.configureTestingModule({
      imports: [ClarityModule.forRoot(),
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpModule,
        TranslationModule.forRoot(l10nConfig),
        HttpClientModule,
        ServiceModule],

        providers : [TranslationService,FormBuilder,
          { provide : AuthService , useValue: mockAuthService}
        ],

        declarations: [ LoginComponent ]
    })
    .compileComponents();
    
    mockAuthService.login.and.returnValue(of(loginResponse));
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should contain the initial state of login form as invalid because the form is empty', () => {
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('Should throw error if invalid email is provided  ', () => {
    let errors = {};
    let emailField = component.loginForm.controls['loginName'];
    emailField.setValue("test");
    errors = emailField.errors || {};
    expect(errors['invalidEmailAddress']).toBeTruthy(); 
  });

  it('Should not error if valid email is provided  ', () => {
    let errors = {};
    let emailField = component.loginForm.controls['loginName'];
    emailField.setValue("test@gmail.com");
    errors = emailField.errors || {};
    expect(errors['invalidEmailAddress']).toBeFalsy(); 
  });


  it('Should validate if user login is successful  ', () => {
      let emailField = component.loginForm.controls['loginName'];
      let passwordField =  component.loginForm.controls['loginPassword'];
      emailField.setValue('testpatient@vmware.com');
      passwordField.setValue('test');
      component.login();
      expect(component.loginDetails.emailAddress).toBe(loginResponse.emailAddress);
      expect(component.loginDetails.password).toBe(loginResponse.password);
  });

  it('Should show error message is user login response is failure', () => {
    let errorResponse  = {status: 404};
    mockAuthService.login.and.returnValue(Observable.throw(errorResponse));
    let emailField = component.loginForm.controls['loginName'];
    let passwordField =  component.loginForm.controls['loginPassword'];
    emailField.setValue('invaliduser@vmware.com');
    passwordField.setValue('test');
    component.login();
    expect(component.errorMessage).toBe(errorResponse);
  });

  it('Should unsubscribe  the subscription ', () => {
     component.authSubscription = of({}).subscribe();
     fixture.destroy();
     expect(component.authSubscription._subscriptions).toBeNull()
  });

  afterEach(() => {
    fixture.destroy();
  });
});
 