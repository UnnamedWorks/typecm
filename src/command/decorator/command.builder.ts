import Command from "../command";
import {CommandMethod} from "./command.method.scanner";
import ICommandHolder from "../command.holder";

export default interface ICommandBuilder {

    build(commandHolder: ICommandHolder, commandMethodName: string, commandMethod: CommandMethod): Command;

    buildMany(commandHolder: ICommandHolder): Command[];

}