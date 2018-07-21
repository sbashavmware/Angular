import { Component, OnInit } from '@angular/core';

/**  patient detail component useful capturing the new patient details */
@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

  /**
   * Initialize configurations on the load of the  patient detail component 
   * */
  constructor() { }

  /**
   * Initialisation life cycle hook for the  patient  detail component
   */
  ngOnInit() {
  }

}
