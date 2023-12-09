import { IAnalysedResult } from "./analyzer";
export declare class State {
    private results;
    private resultsOfType;
    onResult: (result: IAnalysedResult) => void;
    definitelyUnused: () => IAnalysedResult[];
}
