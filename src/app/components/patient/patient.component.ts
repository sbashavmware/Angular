import { Component, OnInit } from '@angular/core';

/** new patient component useful capturing the  patient details */
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

   /**
   * Initialize configurations on the load of the  patient  component 
   * */
  constructor() { }

  /**
   * Initialisation life cycle hook for the  patient  component
   */
  ngOnInit() {
  }

}
