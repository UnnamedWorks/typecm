import ICommandExecutor, {CommandExecutionResult} from "./command.executor";
import Command from "../command";

export default class DefaultCommandExecutor implements ICommandExecutor {

    async execute(command: Command, args: any[]): Promise<CommandExecutionResult> {
        let execute: (args: any[]) => Promise<CommandExecutionResult> = (command as any).execute;
        if (!execute) {
            throw new Error("No execute method in command!");
        }
        return execute(args);
    }

}