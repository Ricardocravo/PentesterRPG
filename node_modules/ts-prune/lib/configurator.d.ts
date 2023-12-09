export interface IConfigInterface {
    project?: string;
    ignore?: string;
    error?: string;
    skip?: string;
}
export declare const getConfig: () => IConfigInterface;
