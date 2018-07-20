/*
 * ICountry interface used to capture the list of countries 
 */
export interface ICountry {
    status : string;
    countryList : Array<country>;
}

interface country {
    countryCode: string;
    countryName: string;
    isRestricted: boolean;
}