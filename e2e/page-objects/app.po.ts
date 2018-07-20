/**
 * Application Page Object for protractor e2e
 */
import { browser, by, element } from 'protractor';

/**
 * Application Page Object Class
 */
export class AppPage {

  /**
   * Navigate to root application page
   */
  navigateTo() {
    return browser.get('/login');
  }

  /**
   * Get application title from app page header
   */
  getHeaderText() {
    return element(by.css('my-app .title')).getText();
  }

  /**
   * Get application title from browser
   */

  getBrowserTitle() {
      return browser.getTitle();
  }
}
