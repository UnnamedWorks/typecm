import Command from "../command";

export enum CommandExecutionResult {

    SUCCESS,
    INVALID_ARGUMENTS,
    USAGE

}

export default interface ICommandExecutor {

    execute(command: Command, args: any[]): Promise<CommandExecutionResult>;

}