import { Component, OnInit } from '@angular/core';

/** new patient component useful capturing the new patient details */
@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {

  /**
   * Initialize configurations on the load of the new patient  component 
   * */
  constructor() { }

  /**
   * Initialisation life cycle hook for the new patient  component
   */
  ngOnInit() {
  }

}
