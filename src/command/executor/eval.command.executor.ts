import ICommandExecutor, {CommandExecutionResult} from "./command.executor";
import Command from "../command";

/**
 * A command executor that uses eval(string) method to execute
 * the Command#execute method
 */
export default class EvalCommandExecutor implements ICommandExecutor {

    execute(command: Command, args: any[]): Promise<CommandExecutionResult> {
        let parameters = args.map((value, index) => `args[${index}]`).join(", ");
        return eval(`command.execute(${parameters})`);
    }

}