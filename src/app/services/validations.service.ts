import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/**
 *  Static validation class for All Form Validations 
 *
 *
 */
@Injectable()
export class ValidationService {
    
    /**
    * Phone Number validator
    * @param input form control field 
    * @returns boolean form validation state
    */
    static phoneValidator(control: FormControl) {

        if (control.value && control.value.match(/^[0-9\-\+\.\(..\)\s]+$/i)) {
            return null;
        } else {
            return { 'invalidPhoneNumber': true };
        }
    }

    /**
    * Email validator 
    * @param input form control field 
    * @returns boolean form validation state
    */
    static emailValidator(control: FormControl) {
        if (control.value && control.value.toLowerCase().match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }
}
