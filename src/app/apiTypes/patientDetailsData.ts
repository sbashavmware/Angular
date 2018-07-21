/*
 * IpatientDetails inteface used to capture the information about the list of patients
 */
export interface IPatientDetails {
    /**array list of patient details */
    patientDetails : Array<IPatientData>;
}

/**Patient Type */
interface IPatientData {
    /**id property */
    id : number;

    /**name property */
    name : string;

    /** age property */
    age : number;

    /**address property */
    address : string;

    /**city property */
    city : string;

    /**email property */
    email : string;

    /**phone number property */
    phoneNumber : number;

    /**reason for visit property */
    reasonForVisit : string;
}