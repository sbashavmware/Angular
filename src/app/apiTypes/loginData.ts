/*
 * ILogin interface used to capture the login details of used
 */
export interface ILogin {
    /**email address property */
    emailAddress: string,

    /**password property */
    password: string,

    /**display name property */
    displayName: string,

    /**mesage property */
    message: string,

    /**valid boolean property */
    valid: boolean
}