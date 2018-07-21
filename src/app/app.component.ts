import { Component } from '@angular/core';
import { AppTitleService } from './services/app-title.service';
import { Title } from '@angular/platform-browser';
import { Config } from './config.provider';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import { AppLanguageService } from './services/app-language.service';

/** App component for the patient Management Module */
@Component({
    selector: 'patient-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    /** Decorator for the language translations*/
    @Language() lang: string;
    
    /** the list of languages available in the app*/
    public languageList = [];

    /** the default selected language */
    public selectedLang: any;

    /** place holder for the app Title*/
    public  appTitle: string;

    /** flag to hold the modal status */
    public isModalOpen = false;

    /**Subscription for the title */
    public titleSubscription ;

    /**Subscription for the language */
    public languageSubscription ; 

     /**
   * Initialize configurations on the load of the App Component 
   * @param locale set default locale for the application
   * @param translation translation service for the languages translations
   * @param _appService appService for fetching the title observable
   * @param titleService titleservice for setting the application title
   * @param appLangService appLangService for getting the list of languages 
   * @param config  Config provider to access application config variables
   */
    constructor(private config: Config ,
         public locale: LocaleService,
         public translation: TranslationService,
         private _appService: AppTitleService , 
         private titleService : Title,
         private appLangService : AppLanguageService ) {
       }


   /**
   * Initialisation life cycle hook for the App component
   */      
    ngOnInit(): void {
      this.titleSubscription = this._appService.getTitleObservable().subscribe(
          (title) => {
              this.config.appTitle = title;
              this.config.showHeader = true;
              this.appTitle = title;
              this.setTitle(title);
          }
      );
     this.languageSubscription =  this.appLangService.getAppLanguages().subscribe(
            (languages) => {
                this.languageList = languages.languageList;
            }
        );
       this.selectedLang = this.languageList[0] ;  
    }

    /**
   * Show the language modal
   */
    showLanguageModal(){
        this.isModalOpen = true;
    }

    
    /** Set the default locale for the app */
    selectLocale(locale: string): void {
        this.locale.setDefaultLocale(locale);
    }

   /** Set the title for the app **/
    setTitle(appTitle : string){
        this.titleService.setTitle(appTitle);
    }

   /** unsubscribe subscriptions to prevent possible memory leak*/
   ngOnDestroy() {
    if (this.titleSubscription) { this.titleSubscription.unsubscribe(); }
    if (this.languageSubscription) { this.languageSubscription.unsubscribe(); }
  }
}
