export interface CommandMethod {
    readonly methodName: string;
    readonly names: string[];
    readonly method: Function;
}

export default interface ICommandMethodScanner {

    scan(object: any, filter?: (fun: Function) => boolean): CommandMethod[];

}