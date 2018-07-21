
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";

/**
 * Config provider holds all the default configurations and properties 
 */
@Injectable()
export class Config {
 
  /** api paths property */
  public apiPaths : any;

  /**flag to capture the header display boolean value */
  public showHeader : boolean =  false;

  /**Default App title value */
  public appTitle = 'Patient Managemnet';

  /**
   * Loads all the configurations for the config
   */
  constructor() {
      this.apiPaths = environment.apiUrls;
  }

}