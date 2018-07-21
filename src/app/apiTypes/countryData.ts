/*
 * ICountry interface used to capture the list of countries 
 */
export interface ICountry {
    /** status of response */
    status : string;
    /** list of countries */
    countryList : Array<country>;
}

/*
 * country interface to captue the country properties
 */
interface country {
     /** property for country code */
    countryCode: string;
     /** property for country name */
    countryName: string;
     /** flag to hold the status for restricted  */
    isRestricted: boolean;
}