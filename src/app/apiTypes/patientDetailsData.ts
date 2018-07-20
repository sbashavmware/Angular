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