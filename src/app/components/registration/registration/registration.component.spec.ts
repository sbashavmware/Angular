import { RegistrationComponent } from "./registration.component";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { L10nConfig, ProviderType, TranslationModule } from "angular-l10n";
import { ClarityModule } from "@clr/angular";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from "../../../services/auth.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpModule } from "@angular/http";
import { CountryListService } from "../../../services/countryList.service";
import { StateService } from "../../../services/state.service";
import { of } from "rxjs/observable/of";
import { By } from "@angular/platform-browser";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

describe('Testing registration component', () => {

  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let mockAuthService;
  let mockCountryService;
  let mockStateService;
  let COUNTRIES;
  let STATES;
  let USER_PROFILE_SAVE 
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
    mockAuthService =  jasmine.createSpyObj(['login','saveUserProfile']);
    mockCountryService =  jasmine.createSpyObj(['getCountryList']);
    mockStateService = jasmine.createSpyObj(['fetchStates']);
    COUNTRIES = {
      "status": "S",
      "traceid": "946a012647de0a76",
      "countryList": [
          {
              "countryCode": "AF",
              "countryName": "Afghanistan",
              "isRestricted": false
          },
          {
              "countryCode": "AL",
              "countryName": "Albania",
              "isRestricted": false
          },
          {
              "countryCode": "DZ",
              "countryName": "Algeria",
              "isRestricted": false
          },
        ]
      };  

     STATES = {
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
            }
          ]
        }

        USER_PROFILE_SAVE = {
          "status":"S",
          "message":"User Profile Updated Successfully!"
       };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule,TranslationModule.forRoot(l10nConfig),ClarityModule, HttpClientModule,
        HttpModule], 
      declarations: [RegistrationComponent],
      providers: [
        { provide : AuthService , useValue: mockAuthService },
        { provide : CountryListService , useValue : mockCountryService },
        { provide : StateService , useValue: mockStateService}
      ],
    });

    // create component and test fixture
    fixture = TestBed.createComponent(RegistrationComponent);
    mockAuthService.saveUserProfile.and.returnValue(of(USER_PROFILE_SAVE));
    mockCountryService.getCountryList.and.returnValue(of(COUNTRIES));
    
    // get test component from the fixture
    component = fixture.componentInstance;
    
  });

  it('Should contain the initial state of registration form as invalid because the form is empty', () => {
    fixture.detectChanges();
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('Should have required validation as the first Name field is empty ', () => {
    let errors = {};
    let firatNameField = component.registrationForm.controls['firstName'];
    errors = firatNameField.errors || {};
    expect(errors['required']).toBeTruthy(); 
  });

  it('Should not have required validation as the first Name field value is testForNotEmpty ', () => {
    let errors = {};
    let firstNameField = component.registrationForm.controls['firstName'];
    firstNameField.setValue("test");
    errors = firstNameField.errors || {};
    expect(errors['required']).toBeFalsy(); 
  });


  it('Should call error msg when country list response failure  ', () => {
    let errorResponse = {status: 404}; 
    mockCountryService.getCountryList.and.returnValue(Observable.throw(errorResponse));
    fixture.detectChanges();
    expect(component.countryApiResp).toBe(errorResponse);
  });


  it('Should fetch the states when we change the country  ', () => {
    mockStateService.fetchStates.and.returnValue(of(STATES));
    let  countrySelectBox = fixture.debugElement.query(By.css('#country'));   
    let  countrySelectBoxElement =  countrySelectBox.nativeElement;
    countrySelectBoxElement.dispatchEvent(new Event('change'));
    expect(component.states).toBe(STATES.stateList);
  });

  it('Should call error msg when state list response failure  ', () => {
    let errorResponse = {status: 404}; 
    mockStateService.fetchStates.and.returnValue(Observable.throw(errorResponse));
    let  countrySelectBox = fixture.debugElement.query(By.css('#country'));   
    let  countrySelectBoxElement =  countrySelectBox.nativeElement;
    countrySelectBoxElement.dispatchEvent(new Event('change'));
    expect(component.states).toBe(errorResponse);
  });


  it('Should contain invalidPhoneNumber error when we set the invalid phone number ', () => {
    let errors = {};
    let phoneNumberField = component.registrationForm.controls['phone'];
    phoneNumberField.setValue("invalidno");
    errors = phoneNumberField.errors || {};
    expect(errors['invalidPhoneNumber']).toBeTruthy(); 
  });

  it('Should not contain invalidPhoneNumber error when we set the valid phone number ', () => {
    let errors = {};
    let phoneNumberField = component.registrationForm.controls['phone'];
    phoneNumberField.setValue("9849689364");
    errors = phoneNumberField.errors || {};
    expect(errors).toEqual({}); 
  });



  it('Should populate alert Type as danger alert and contain error message ', () => {
    let errorMsg =  'test for invalid error msg';
    component.showErrorMsg(errorMsg);
    expect(component.alertType).toBe('alert-danger');
    expect(component.alertMessage).toBe(errorMsg); 
  });

  it('Should populate alert Type as success alert and contain success message ', () => {
    let successMsg =  'test for valid error msg';
    component.showSuccessMsg(successMsg);
    expect(component.alertType).toBe('alert-success');
    expect(component.alertMessage).toBe(successMsg); 
  });

  it('Should save the User Profile on save operation  ', () => {
     
    component.registrationForm.controls.firstName.setValue('virat'); 
    component.registrationForm.controls.lastName.setValue('kohli');
    component.registrationForm.controls.company.setValue('BCCI');
    component.registrationForm.controls.country.setValue('INDIA');
    component.registrationForm.controls.address1.setValue('NEW DELHI');
    component.registrationForm.controls.address2.setValue('NEW DELHI');
    component.registrationForm.controls.city.setValue('NEW DELHI');
    component.registrationForm.controls.state.setValue('DELHI');
    

    component.saveUserProfile();


    expect(component.saveResponse).toEqual(USER_PROFILE_SAVE);
  });


  it('Should capture error Response for User Profile on save operation  ', () => {
    
    let errorResponse = {status: 404}; 
    mockAuthService.saveUserProfile.and.returnValue(Observable.throw(errorResponse));

    component.registrationForm.controls.firstName.setValue('virat'); 
    component.registrationForm.controls.lastName.setValue('kohli');
    component.registrationForm.controls.company.setValue('BCCI');
    component.registrationForm.controls.country.setValue('INDIA');
    component.registrationForm.controls.address1.setValue('NEW DELHI');
    component.registrationForm.controls.address2.setValue('NEW DELHI');
    component.registrationForm.controls.city.setValue('NEW DELHI');
    component.registrationForm.controls.state.setValue('DELHI');
    

    component.saveUserProfile();


    expect(component.saveResponse).toEqual(errorResponse);
  });

  it('Should do not show the alert on close operation  ', () => {
    
     component.onClose();
     expect(component.isAlertVisible).toBe(false);
  })

  it('Should unsubscribe  the subscription ', () => {
    component.statesSubscription = of({}).subscribe();
    component.countryListSubscription = of({}).subscribe();
    component.saveProfileSubscription = of({}).subscribe();
    
    fixture.destroy();
    expect(component.statesSubscription._subscriptions).toBeNull();
    expect(component.countryListSubscription._subscriptions).toBeNull();
    expect(component.saveProfileSubscription._subscriptions).toBeNull();
 });

  afterEach(() => {
    fixture.destroy();
  });
 
});