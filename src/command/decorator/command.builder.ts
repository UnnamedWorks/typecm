import Command from "../command";
import {CommandMethod} from "./command.method.scanner";

export default interface ICommandBuilder {

    build(commandHolder: any, commandMethodName: string, commandMethod: CommandMethod): Command;

    buildMany(commandHolder: any): Command[];

}