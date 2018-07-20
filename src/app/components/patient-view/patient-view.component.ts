import { Component, OnInit } from '@angular/core';
import { PatientViewService } from '../../services/patientview.service';
import { Language, TranslationService } from 'angular-l10n';
import { Config } from '../../config.provider';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {

  public isAlertVisible = false;
  public alertMessage:string;
  public alertType:string;
  public patientDetails : any;
  public errorDetails : any;
  public selected:any = [];
  public patientname: string = 'kohli';
  @Language() lang: string;


  constructor(private _patientViewService :PatientViewService,public translation: TranslationService,
     private config: Config ) {
      this.config.showHeader = false;    
    }

  ngOnInit() {
    this.fetchPatients();
  }

  fetchPatients(){
    this._patientViewService.fetchPatients().subscribe(
         (patientData) => {
            this.patientDetails =  patientData.patientDetails;
            this.showSuccessMsg(this.translation.translate('patientDetailsSuccessMsg'))
         },
         (errorData) => {
          this.errorDetails =  errorData;
          this.showErrorMsg(this.translation.translate('patientDetailsFailureMsg'))
         }
    );
  }

  showErrorMsg(errorMessage: any) {
    this.isAlertVisible = true;
    this.alertMessage = errorMessage;
    this.alertType = 'alert-danger';
    
  }


  showSuccessMsg(successMsg : any) {
    this.isAlertVisible = true;
    this.alertMessage = successMsg ;
    this.alertType = 'alert-success';
  }

}
