import { browser, by, element, Key } from 'protractor';
import { isNullOrUndefined } from 'util';

export class RegisterProfilePage {

    navigateTo() {
        return browser.get('/registration');
    }

    getHeadingText() {
        return element(by.css('.reg-page-container h1')).getText();
    }

    setInputFieldText(inputField, value) {
        return inputField.sendKeys(value);
    }
   
    

    isSubmitButtonDisabled() {
        return element(by.css('.submitdisabled')).isPresent();
    }
    
    getFirstNameInput() {
        return element(by.id('firstName'));
    }

    getLastNameInput() {
        return element(by.id('lastName'));
    }
    getCompanyInput() {
        return element(by.id('company'));
    }
    getCountryInput() {
        return element(by.id('country'));
    }
    getAddressInput() {
        return element(by.id('address1'));
    }
    getAddressTwoInput() {
        return element(by.id('address2'));
    }

    getCityInput() {
        return element(by.id('city'));
    }
    getStateInput() {
        return element(by.id('state'));
    }
    getPhoneInput() {
        return element(by.id('phone'));
    }

    getSubmitButton() {
        return element(by.id('saveUserDet'));
    }
    

    clickSubmitButton() {
        return this.getSubmitButton().click();
    }

    getCurrentUrl() {
        return browser.getCurrentUrl();
    }

    getTermsCheckBox() {
        return element(by.id('termsCheckbox'));
    }

    getAlert() {
        return element(by.css('.reg-page-container .alert'));
    }

    getAlertSuccess() {
        return element(by.css('.reg-page-container .alert-success'));
    }

    getAlertFailure() {
        return element(by.css('.reg-page-container .alert-danger'));
    }

    getAlertText() {
        return this.getAlert().getText();
    }
}
