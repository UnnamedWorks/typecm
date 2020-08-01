import Command from "../command";

export interface CommandExecutionResult {

}

export default interface ICommandExecutor {

    execute(command: Command, args: any[]): Promise<CommandExecutionResult>;

}