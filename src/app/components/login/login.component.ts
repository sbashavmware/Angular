import { Component, OnInit } from '@angular/core';
import { ILogin } from '../../apiTypes/loginData';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslationService, Language } from 'angular-l10n';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from '../../services/validations.service';
import { ILoginDetails } from '../../apiTypes/loginDetails';
import { Config } from '../../config.provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Language() lang: string;
  public errorMessage :any;
  public loginData : ILogin;
  public loginForm: FormGroup;
  public isError : boolean;
  public loginDetails : ILoginDetails;

  constructor( private _router:Router ,
     private _authService:AuthService,
     public translation: TranslationService,
     private formBuilder: FormBuilder, private config: Config) { 
      this.config.showHeader = true;
      this.loginForm = this.formBuilder.group({
        'loginName': ['', [ValidationService.emailValidator]],
        'loginPassword': ['']
      });
     }

  ngOnInit() {
  }

  login() {
  this.loginDetails = <ILoginDetails>{};
  this.loginDetails.emailAddress = this.loginForm.controls.loginName.value;
  this.loginDetails.password = this.loginForm.controls.loginPassword.value;

  this._authService.login()
      .subscribe( (loginData) =>{
        this.loginData = loginData;
        if(this.loginDetails.emailAddress == this.loginData.emailAddress && this.loginDetails.password == this.loginData.password) 
        {
          this.isError=  false;
          this._router.navigate(['/patient/patient-view']);
        }
      },
     (error) => {
       this.isError = true;
       this.errorMessage = error;
     }
    );
  }
}
