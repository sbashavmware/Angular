/*
 * IpatientDetails inteface used to capture the information about the list of patients
 */
export interface IPatientDetails {
    patientDetails : Array<IPatientData>;
}

interface IPatientData {
    id : number;
    name : string;
    age : number;
    address : string;
    city : string;
    email : string;
    phoneNumber : number;
    reasonForVisit : string;
}