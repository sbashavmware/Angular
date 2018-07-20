import { Component } from '@angular/core';
import { AppTitleService } from './services/app-title.service';
import { Title } from '@angular/platform-browser';
import { Config } from './config.provider';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import { AppLanguageService } from './services/app-language.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    
    @Language() lang: string;
    
    /** the list of languages available in the app*/
    public languageList = [];
    /** the default selected language */
    public selectedLang: any;

    public  appTitle: string;

    public isModalOpen = false;
    constructor(private config: Config ,
         public locale: LocaleService,
         public translation: TranslationService,
         private _appService: AppTitleService , 
         private titleService : Title,
         private appLangService : AppLanguageService ) {
       }

    ngOnInit(): void {
      this._appService.getTitleObservable().subscribe(
          (title) => {
              this.config.appTitle = title;
              this.config.showHeader = true;
              this.appTitle = title;
              this.setTitle(title);
          }
      );
      this.appLangService.getAppLanguages().subscribe(
            (languages) => {
                this.languageList = languages.languageList;
            }
        );
       this.selectedLang = this.languageList[0] ;  
    }


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
}
