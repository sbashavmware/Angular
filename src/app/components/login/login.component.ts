import { Component, OnInit } from '@angular/core';
import { ILogin } from '../../apiTypes/loginData';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslationService, Language } from 'angular-l10n';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from '../../services/validations.service';
import { ILoginDetails } from '../../apiTypes/loginDetails';
import { Config } from '../../config.provider';

/** Login component useful in the user login */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  /** Language decorator used for translation of the language in login properties */  
  @Language() lang: string;

  /** error messages at the login component will be captured */
  public errorMessage :any;

  /** Login Data which encapsulates all the properties of the user  */
  public loginData : ILogin;

  /** Login Form group to identify the login form */
  public loginForm: FormGroup;

  /** Flag used to capture the error status */

  public isError : boolean;

  /** place holder to hold the login Details */
  public loginDetails : ILoginDetails;

  /** Auth service subscription reference */
  public authSubscription : any ;


  /**
   * Initialize configurations on the load of the login component 
   * @param route Angular router component
   * @param _authenticationService Authentication Service for authentication requests
   * @param formBuilder Angular form builder component for creating form elements
   * @param config  Config provider to access application config variables
   */
  constructor( private _router:Router ,
     private _authService:AuthService,
     public translation: TranslationService,
     private formBuilder: FormBuilder, private config: Config) { 
      /**
     * User will land on to  the login Form and then has to 
     * enter the email and password then he will be 
     * logged into the patient management system
     */
      this.config.showHeader = true;
      this.loginForm = this.formBuilder.group({
        'loginName': ['', [ValidationService.emailValidator]],
        'loginPassword': ['']
      });
     }


   /**
   * Initialisation life cycle hook for the login component
   */   
  ngOnInit() {
  }

  /**
   * Login function used for login 
   *  1. User enter the email  
   *  2. User enter the password 
   *  Clicks on login after successful authentication patient details will be loaded 
   * 
   */
  login() {
  this.loginDetails = <ILoginDetails>{};
  this.loginDetails.emailAddress = this.loginForm.controls.loginName.value;
  this.loginDetails.password = this.loginForm.controls.loginPassword.value;

  /**
   * Authentication service used to login the user 
   */
 this.authSubscription =  this._authService.login()
      .subscribe( 
        /** Success condition for authentication service call*/ 
        (loginData) =>{
        this.loginData = loginData;
         /**validate user details for successful authentication */
        if(this.loginDetails.emailAddress == this.loginData.emailAddress && this.loginDetails.password == this.loginData.password) 
        {
          this.isError=  false;
          this._router.navigate(['/patient/patient-view']);
        }
      },
     /** Error condition for authentication service call*/ 
     (error) => {
       this.isError = true;
       this.errorMessage = error;
     }
    );
  }

   /** unsubscribe subscriptions to prevent possible memory leak*/
   ngOnDestroy() {
    if (this.authSubscription) { this.authSubscription.unsubscribe(); }
  }
}
