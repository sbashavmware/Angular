/*
 * Language Interface used to capture the list of languages 
 */
export interface ILanguage {
    languageList: Array<language>;
}

interface language {
    name: string;
    locale: string;
}