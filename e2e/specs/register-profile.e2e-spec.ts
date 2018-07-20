import { RegisterProfilePage } from '../page-objects/register-profile.po';
import { TestConstants } from '../test-constants';
import { browser } from 'protractor';

describe('Patient Management Complete Profile', () => {
   let page: RegisterProfilePage;
    const ngApimock: any = browser['ngApimock'];

    beforeEach(() => {
        page = new RegisterProfilePage();
    });

    it('should display Complete Profile heading', () => {
        page.navigateTo();
        expect(page.getHeadingText()).toEqual(TestConstants.REGISTER_PROFILE_HEADER);
    }); 

 
    it('should contain firt name,last name,Company,Country,Address,Address 2,City,State,Zip,Phone Fields', () => {
            page.navigateTo();
            expect(page.getFirstNameInput().isDisplayed()).toBe(true);
            expect(page.getLastNameInput().isDisplayed()).toBe(true);
            expect(page.getCompanyInput().isDisplayed()).toBe(true);
            expect(page.getCountryInput().isDisplayed()).toBe(true);
            expect(page.getAddressInput().isDisplayed()).toBe(true);
            expect(page.getAddressTwoInput().isDisplayed()).toBe(true);
            expect(page.getCityInput().isDisplayed()).toBe(true);
            expect(page.getStateInput().isDisplayed()).toBe(true);
            expect(page.getPhoneInput().isDisplayed()).toBe(true);
    }); 



   it('should enable "Submit" button when all mandatory fields are entered', () => {
       
                page.setInputFieldText(page.getFirstNameInput(), TestConstants.FIRST_NAME);
                page.setInputFieldText(page.getLastNameInput(), TestConstants.LAST_NAME);
                page.setInputFieldText(page.getCompanyInput(), TestConstants.COMPANY);
                page.setInputFieldText(page.getAddressInput(), TestConstants.ADDRESS1);
                page.setInputFieldText(page.getAddressTwoInput(), TestConstants.ADDRESS1);
                page.setInputFieldText(page.getCountryInput(), TestConstants.COUNTRY);
                page.setInputFieldText(page.getStateInput(), TestConstants.STATE);
                page.setInputFieldText(page.getCityInput(), TestConstants.CITY);
                page.setInputFieldText(page.getPhoneInput(), TestConstants.PHONE_NUMBER);
                page.getTermsCheckBox().click();
                
                expect(page.isSubmitButtonDisabled()).toEqual(false);
           

    }); 

   

   it('should show success message when save profile api fails', () => {
                page.setInputFieldText(page.getFirstNameInput(), TestConstants.FIRST_NAME);
                page.setInputFieldText(page.getLastNameInput(), TestConstants.LAST_NAME);
                page.setInputFieldText(page.getCompanyInput(), TestConstants.COMPANY);
                page.setInputFieldText(page.getAddressInput(), TestConstants.ADDRESS1);
                page.setInputFieldText(page.getAddressTwoInput(), TestConstants.ADDRESS1);
                page.setInputFieldText(page.getCountryInput(), TestConstants.COUNTRY);
                page.setInputFieldText(page.getStateInput(), TestConstants.STATE);
                page.setInputFieldText(page.getCityInput(), TestConstants.CITY);
                page.setInputFieldText(page.getPhoneInput(), TestConstants.PHONE_NUMBER);
                page.getTermsCheckBox().click();
          
                page.clickSubmitButton();

                expect(page.getAlertSuccess().isPresent()).toBe(true);
                expect(page.getAlertText()).toEqual(TestConstants.SAVE_PROFILE_SUCCESS);
            
    });
});
