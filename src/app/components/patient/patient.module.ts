import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { PatientDetailComponent } from '../patient-detail/patient-detail.component';
import { NewPatientComponent } from '../new-patient/new-patient.component';
import { RouterModule ,Routes } from '@angular/router';
import { PatientViewComponent } from '../patient-view/patient-view.component';
import { PatientViewService } from '../../services/patientview.service';
import { ClarityModule } from '@clr/angular';

 const ROUTES: Routes = [
  {path: '', component: PatientComponent} ,
  {path: 'patient-detail', component: PatientDetailComponent},
  {path: 'new-patient', component: NewPatientComponent},
  {path: 'patient-view', component: PatientViewComponent},
];


@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    PatientComponent,
    PatientDetailComponent,
    NewPatientComponent,
    PatientViewComponent
  ],
  exports: [PatientComponent,RouterModule]
})
export class PatientModule { }
