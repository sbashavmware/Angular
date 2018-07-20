/*
 * IStateList interface used to capture the list of state details
 */
export interface IStateList {
    stateList : Array<IStateData>;
}

interface IStateData {
        stateCode: string,
        stateCodeNumber: number;
        stateName: string
}
