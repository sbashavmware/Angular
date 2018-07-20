/*
 * ILogin interface used to capture the login details of used
 */
export interface ILogin {
    emailAddress: string,
    password: string,
    displayName: string,
    message: string,
    valid: boolean
}