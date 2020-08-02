import Command from "../command";
import {CommandMethod} from "./command.method.scanner";
import ICommandHolder from "../command.holder";
import ACommand from "./command.decorator";
import ICommandMethodScanner from "./command.method.scanner";

/**
 * It is responsible for converting commands that have
 * been defined using decorators to commands-as-objects.
 * The command manager never knows about these commands
 * defined with decorators, it only handles commands-as-objects.
 */
export default interface ICommandBuilder {

    /**
     * Construct a command as an object from a previously determined method.
     * @param commandHolder The command holder
     * @param commandMethodName The method name
     * @param commandMethod Basic specifications for the command
     * @see ICommandMethodScanner
     */
    build(commandHolder: ICommandHolder, commandMethodName: string, commandMethod: CommandMethod): Command;

    /**
     * Get all the methods of the provided object,
     * just check the methods decorated with {@link ACommand},
     * get its metadata (previously set by decorators)
     * and builds commands-as-objects
     * @param commandHolder The command holder
     */
    buildMany(commandHolder: ICommandHolder): Command[];

}