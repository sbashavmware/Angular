import { AppPage } from '../page-objects/app.po';
import { TestConstants } from '../test-constants';
import { browser, element, by } from 'protractor';

describe('Patient Management App', () => {
  let page: AppPage;
  const ngApimock: any = browser['ngApimock'];

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display patient managemnt title in browser title fetched from title service ', function () {
    page.navigateTo();
    expect(page.getBrowserTitle()).toEqual(TestConstants.APP_TITLE_TEST);
  });


  it('should display patient management title in page header', () => {
    page.navigateTo();
    expect(page.getHeaderText()).toEqual(TestConstants.APP_TITLE);
    
  });

});
