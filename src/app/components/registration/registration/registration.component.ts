import { Component, OnInit, ViewChild } from '@angular/core';
import { Language, TranslationService } from 'angular-l10n';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CountryListService } from '../../../services/countryList.service';
import { StateService } from '../../../services/state.service';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validations.service';


/** registration component useful in the user profile registration */
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  /** place holder to capture the alert Messages*/
  public alertMessage : string;

  /** flag to capture the status of the alert visibility */
  public isAlertVisible : boolean;

  /**Decorator used in the language translations  */
  @Language() lang: string;

  /**Form Builder used in defining the registration forms */
  registrationForm: FormGroup;

  /**place holder to capture the list of countries  */
  public countries: any;

  /** place holder to capture the alert Types  */
  public alertType: string;

  /**place holder to capture the selected country */
  public selectedCountry: any = null;

  /** place holder to capture the  data response of countries */
  public countryApiResp: any;

  /** place holder to capture the states details */
  public states : any;

  /**place holder to capture the registration details of the users  */
  private updateUserDetails : any;

  /**flag to capture the process of fetching state list  */
  public isStateFetching : boolean =  false;

  /**place holder to capture the success message */
  public successAlertMsg : string ;

  /**Flag used to capture the status of the registration response  */
  public regRespisFetching : boolean;

  /**flag used to capture the terms agreement status */
  public termsAgreement = false;

  /** place holder to capture the response of registration process */
  public saveResponse : any;

  /**template reference for the submit btn */
  @ViewChild('submiterrormsgele') submiterrormsgele: any;

  /**place holder for the state subscription */
  public statesSubscription : any;

  /**place holder for the country list subscription */
  public countryListSubscription : any;

  /**place holder for the save profile subscription */
  public saveProfileSubscription : any;  
  

  /**
   * Initialize configurations on the load of the registration component 
   * @param translation translation service for the translation of the messages
   * @param _authenticationService Authentication Service for authentication requests
   * @param formBuilder Angular form builder component for creating form elements
   * @param _countryListService  country service to fetch the country list
   * @param _stateService  state service to fetch the state list
   */
  constructor(public translation: TranslationService,private formBuilder: FormBuilder,
    private authService:AuthService , private _countryListService: CountryListService,
    private _stateService:StateService
    ) {   
     /**
      * User lands to the registration form and then enters all
      * the registration details and registers his profile
      */
    this.registrationForm = this.formBuilder.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'company': ['', [Validators.required]],
      'country': ['',[Validators.required]],
      'address1' : ['',[Validators.required, Validators.minLength(2)]],
      'address2' : ['',[Validators.required]],
      'city' : ['',Validators.required],
      'state' : ['',Validators.required],
      'termsCheckbox':[false,Validators.required],
      'phone': ['', [Validators.required, ValidationService.phoneValidator]],
    });
  }

   /**
   * Initialisation life cycle hook for the registration component 
   */ 
  ngOnInit() {
    this.getCountryList();
  }

   /**
   * used to close the language pop up modal
   */ 
  onClose(){
    this.isAlertVisible = false;
  }


   /**
   * fetch the state details 
   */ 
   fetchstates() {
    this.isStateFetching = true;
    this.statesSubscription = this._stateService.fetchStates().subscribe(data => {
      this.isStateFetching =  false;
      this.states = data.stateList;
    },
    (error) => {
      this.isStateFetching = false;
      this.states = error;
      this.showErrorMsg(this.translation.translate('stateListFailureMsg'));
    } 
  );
  } 


  /**
   * fetch the country details
   */ 
   getCountryList() {
    this.countryListSubscription = this._countryListService.getCountryList().subscribe(data => {
    
      this.countryApiResp = data;
      if (this.countryApiResp.status === 'S') {
        this.countries = this.countryApiResp.countryList;
        this.selectedCountry = 'AF';
      }
    },
      (error) => {
        this.countryApiResp = error;
        this.showErrorMsg(this.translation.translate('countryListFailureMsg'));
      });
  } 


  /**
   * Show the error message in a alert modal
   */ 
  showErrorMsg(errorMessage: string) {
    this.isAlertVisible = true;
    this.alertMessage = errorMessage;
    this.alertType = 'alert-danger';
    if (this.submiterrormsgele) {
      this.submiterrormsgele.nativeElement.setAttribute('tabindex', '-1');
      this.submiterrormsgele.nativeElement.focus();
    }
  }


   /**
   * Show the success message in a alert modal
   */ 
  showSuccessMsg(successMsg : any) {
    this.isAlertVisible = true;
    this.alertMessage = successMsg ;
    this.alertType = 'alert-success';
    if (this.submiterrormsgele) {
      this.submiterrormsgele.nativeElement.setAttribute('tabindex', '-1');
      this.submiterrormsgele.nativeElement.focus();
    }
  }


   /**
   * Capture all the user registration details and register the same
   * in the system
   */ 
  saveUserProfile() {
     this.updateUserDetails = {
       'firstName' : this.registrationForm.controls.firstName.value,
       'lastName' : this.registrationForm.controls.lastName.value,
       'company' : this.registrationForm.controls.company.value,
       'country' : this.registrationForm.controls.country.value,
       'address1' : this.registrationForm.controls.address1.value,
       'address2' : this.registrationForm.controls.address2.value,
       'city' : this.registrationForm.controls.city.value,
       'state': this.registrationForm.controls.state.value
     };
     this.regRespisFetching =  true;
      this.saveProfileSubscription = this.authService.saveUserProfile(this.updateUserDetails).subscribe(
      (success) => {
        this.saveResponse =  success;
        if(this.saveResponse.status == 'S'){
          this.regRespisFetching = false;
          this.showSuccessMsg(success.message);
        }
      } ,
      (error) => {
        this.saveResponse =  error;
        this.showErrorMsg(this.translation.translate('saveErrorProfile'));
      }
    ); 
  }

   /** unsubscribe subscriptions to prevent possible memory leak*/
   ngOnDestroy() {
    if (this.statesSubscription) { this.statesSubscription.unsubscribe(); }
    if (this.countryListSubscription) { this.countryListSubscription.unsubscribe(); }
    if (this.saveProfileSubscription) { this.saveProfileSubscription.unsubscribe(); }
  }
}
 