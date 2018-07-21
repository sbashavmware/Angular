import { Injectable } from '@angular/core';
import { Config } from '../config.provider';
import { Subject } from 'rxjs/Subject';
import { RestApi } from './restapi.service';

/** AppTitle service used to fetch the title */
@Injectable()
export class AppTitleService {

  /** Subject place holder to set the title value aysnchronously */
  private titleSource =  new Subject<string>();

  /**get the title response */
  public appTitleResp;

  /**place holder to capture the title subscription */
  public appTitleSubscription : any;

  /** Flag to hold the state of error */
  public isError:any =  false;

     /**
   * Initialize configurations on the load of the title service 
   * @param restApi rest service used to do the api calls 
   * @param config  Config provider to access application config variables
   */
  constructor(private config : Config, private _restApi : RestApi) {

  /**
   * Get the app title 
   * */  
 this.appTitleSubscription =  this.getAppTitle().subscribe(
      (response) => {
         this.appTitleResp = response.appTitle;
         if(this.appTitleResp) {
           this.emitTitle(this.appTitleResp);
         }
         else {
          this.appTitleResp = this.config.appTitle;
          this.emitTitle(this.appTitleResp);
         }
      },
      (error) => {
        this.appTitleResp = this.config.appTitle;
        this.emitTitle(this.appTitleResp);
      }
    );
  }

  /**
   * get the title observable 
   */
  getTitleObservable() {
    return this.titleSource.asObservable();
  }
 

  /**
   * Get the app title from the service call
   */
  getAppTitle() {
       return this._restApi.get(this.config.apiPaths.getAppTitle);
  }


  /**
   * Emit the title value as async operation
   */
  emitTitle(title:string) {
      this.titleSource.next(title);
  }


}
