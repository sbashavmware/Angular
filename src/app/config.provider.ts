//Config provider holds all the default configurations and properties
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";

@Injectable()
export class Config {
 

  public apiPaths : any;
  public showHeader : boolean =  false;
  public appTitle = 'Patient Managemnet';
  constructor() {
      this.apiPaths = environment.apiUrls;
  }

}