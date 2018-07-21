import { Component, OnInit } from '@angular/core';
import { PatientViewService } from '../../services/patientview.service';
import { Language, TranslationService } from 'angular-l10n';
import { Config } from '../../config.provider';

/** Patient View  component useful fetching all the patient details */
@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {

   /** flag used to capture the status of the alert */  
  public isAlertVisible = false;

   /** place holder used to store the alert messages */  
  public alertMessage:string;

   /** place holder used to store the alert type */  
  public alertType:string;

   /** place holder to capture the patient details */  
  public patientDetails : any;

   /** place holder to capture the error details */  
  public errorDetails : any;

   /** place holder to capture the user selected users from the patient grid */  
  public selected:any = [];

   /** place holder used to capture the subscription of the patient details */  
  public patientSubscription : any;

   /** Language decorator used for translation of the language in patientview properties */  
  @Language() lang: string;


  /**
   * Initialize configurations on the load of the patient view component 
   * @param _patientViewService  patient view service instance to fetch the patient details 
   * @param translation translation service for translating the messages
   * @param config  Config provider to access application config variables
   */
  constructor(private _patientViewService :PatientViewService,public translation: TranslationService,
     private config: Config ) {
      this.config.showHeader = false;    
    }


   /**
   * Initialisation life cycle hook for the patient view component
   */    
  ngOnInit() {
    this.fetchPatients();
  }


   /**
   * Get the maintained  patient details from the system
   */  
  fetchPatients(){
  this.patientSubscription =   this._patientViewService.fetchPatients().subscribe(
         /**
          * Successful condition for fetching the patient details
          */
         (patientData) => {
            this.patientDetails =  patientData.patientDetails;
            this.showSuccessMsg(this.translation.translate('patientDetailsSuccessMsg'))
         },
          /**
          * Error condition while fetching the patient details 
          */  
         (errorData) => {
          this.errorDetails =  errorData;
          this.showErrorMsg(this.translation.translate('patientDetailsFailureMsg'))
         }
    );
  }


   /**
   * Show the error message in a popup window
   */  
  showErrorMsg(errorMessage: any) {
    this.isAlertVisible = true;
    this.alertMessage = errorMessage;
    this.alertType = 'alert-danger';
    
  }

   /**
   * Show the success Msg in a pop up window
   */  
  showSuccessMsg(successMsg : any) {
    this.isAlertVisible = true;
    this.alertMessage = successMsg ;
    this.alertType = 'alert-success';
  }

  /** unsubscribe subscriptions to prevent possible memory leak*/
  ngOnDestroy() {
    if (this.patientSubscription) { this.patientSubscription.unsubscribe(); }
  }
}
