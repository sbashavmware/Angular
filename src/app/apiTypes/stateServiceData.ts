export interface IStateList {
    stateList : Array<IStateData>;
}

interface IStateData {
        stateCode: string,
        stateCodeNumber: number;
        stateName: string
}
