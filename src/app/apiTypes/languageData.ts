/*
 * Language Interface used to capture the list of languages 
 */
export interface ILanguage {
    /**
     *  list of languages
     */
    languageList: Array<language>;
}

/** Language interface type */
interface language {
    /** property for name
     * 
     */
    name: string;
    
    /** property for locale
     * 
     */
    locale: string;
}