import { Injectable } from '@angular/core';
import { Config } from '../config.provider';
import { Subject } from 'rxjs/Subject';
import { RestApi } from './restapi.service';

@Injectable()
export class AppTitleService {


  private titleSource =  new Subject<string>();
  public appTitleResp;
  public isError:any =  false;
  constructor(private config : Config, private _restApi : RestApi) {

  this.getAppTitle().subscribe(
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

  getTitleObservable() {
    return this.titleSource.asObservable();
  }
 

  getAppTitle() {
       return this._restApi.get(this.config.apiPaths.getAppTitle);
  }

  emitTitle(title:string) {
      this.titleSource.next(title);
  }

}
