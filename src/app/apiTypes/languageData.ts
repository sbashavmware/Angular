export interface ILanguage {
    languageList: Array<language>;
}

interface language {
    name: string;
    locale: string;
}