import ACommand from "./command.decorator";
import ICommandHolder from "../command.holder";

/**
 * A wrapper for command functions
 */
export interface CommandMethod {

    readonly methodName: string;
    readonly names: string[]; // Command names
    readonly method: Function;

}

/**
 * Scans object methods, returns methods decorated with {@link ACommand},
 * returns an array of {@link CommandMethod}
 * @see CommandMethod
 */
export default interface ICommandMethodScanner {

    /**
     * Scans object methods, returns methods decorated with {@link ACommand}
     * returns an array of {@link CommandMethod}
     * @param object The command holder
     * @param filter An extra filter for check methods
     */
    scan(object: ICommandHolder, filter?: (fun: Function) => boolean): CommandMethod[];

}