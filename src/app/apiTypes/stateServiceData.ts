/*
 * IStateList interface used to capture the list of state details
 */
export interface IStateList {
    /**Array list of state details */
    stateList : Array<IStateData>;
}

/** State interface type */
interface IStateData {
       /**state code property */
        stateCode: string,
        /**statecode number property */
        stateCodeNumber: number;
        /**state name property */
        stateName: string
}
