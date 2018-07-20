import { Component, OnInit, ViewChild } from '@angular/core';
import { Language, TranslationService } from 'angular-l10n';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CountryListService } from '../../../services/countryList.service';
import { StateService } from '../../../services/state.service';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validations.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public alertMessage : string;
  public isAlertVisible : boolean;
  @Language() lang: string;
  registrationForm: FormGroup;
  public countries: any;
  public alertType: string;
  public selectedCountry: any = null;
  public countryApiResp: any;
  public states : any;
  private updateUserDetails : any;
  public isStateFetching : boolean =  false;
  public successAlertMsg : string ;
  public isSuccessVisible : boolean;
  public submitBtnState : any;
  public regRespisFetching : boolean;
  public termsAgreement = false;
  public saveResponse : any;
  @ViewChild('submiterrormsgele') submiterrormsgele: any;
  

  constructor(public translation: TranslationService,private formBuilder: FormBuilder,
    private authService:AuthService , private _countryListService: CountryListService,
    private _stateService:StateService
    ) {   
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

  ngOnInit() {
    this.getCountryList();
  }

  onClose(){
    this.isAlertVisible = false;
  }

   fetchstates() {
    this.isStateFetching = true;
    this._stateService.fetchStates().subscribe(data => {
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

   getCountryList() {
    this._countryListService.getCountryList().subscribe(data => {
    
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



  showErrorMsg(errorMessage: string) {
    this.isAlertVisible = true;
    this.alertMessage = errorMessage;
    this.alertType = 'alert-danger';
    if (this.submiterrormsgele) {
      this.submiterrormsgele.nativeElement.setAttribute('tabindex', '-1');
      this.submiterrormsgele.nativeElement.focus();
    }
  }


  showSuccessMsg(successMsg : any) {
    this.isAlertVisible = true;
    this.alertMessage = successMsg ;
    this.alertType = 'alert-success';
    if (this.submiterrormsgele) {
      this.submiterrormsgele.nativeElement.setAttribute('tabindex', '-1');
      this.submiterrormsgele.nativeElement.focus();
    }
  }


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
      this.authService.saveUserProfile(this.updateUserDetails).subscribe(
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
}
 