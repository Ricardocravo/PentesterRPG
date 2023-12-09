import { ImportDeclaration, Project, SourceFile } from "ts-morph";
declare type OnResultType = (result: IAnalysedResult) => void;
export declare enum AnalysisResultTypeEnum {
    POTENTIALLY_UNUSED = 0,
    DEFINITELY_USED = 1
}
export declare type ResultSymbol = {
    name: string;
    line?: number;
    usedInModule: boolean;
};
export declare type IAnalysedResult = {
    file: string;
    type: AnalysisResultTypeEnum;
    symbols: ResultSymbol[];
};
export declare const trackWildcardUses: (node: ImportDeclaration) => string[];
export declare const getExported: (file: SourceFile) => {
    name: string;
    line: number;
}[];
export declare const importsForSideEffects: (file: SourceFile) => IAnalysedResult[];
export declare const getPotentiallyUnused: (file: SourceFile, skipper?: RegExp) => IAnalysedResult;
export declare const analyze: (project: Project, onResult: OnResultType, entrypoints: string[], skipPattern?: string) => void;
export {};
