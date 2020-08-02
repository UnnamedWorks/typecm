import CommandRegistry from "./command.registry";
import Command from "./command";
import Namespace from "./namespace";
import CommandParser, {IParseResult} from "./parser/command.parser";
import IBinder from "./parameter.converter/bind/binder";
import ICommandExecutor, {CommandExecutionResult} from "./executor/command.executor";

export default class CommandDispatcher {

    private readonly commandRegistry: CommandRegistry;
    private readonly commandParser: CommandParser;
    private readonly commandExecutor: ICommandExecutor;
    private readonly binder: IBinder;

    public constructor(commandRegistry: CommandRegistry, commandParser: CommandParser, commandExecutor: ICommandExecutor, binder: IBinder) {
        this.commandRegistry = commandRegistry;
        this.commandParser = commandParser;
        this.commandExecutor = commandExecutor;
        this.binder = binder;
    }

    public dispatchCommand(commandLine: string, context: Namespace): boolean {

        context.set(CommandRegistry, "COMMAND_REGISTRY", this.commandRegistry);

        let args: string[] = commandLine.split(" ");
        let commandLabel: string = args.shift().toLowerCase();

        let command: Command = this.commandRegistry.findCommand(commandLabel);

        if (!command) {
            return false;
        }

        let parseResult: IParseResult = this.commandParser.parse(context, this.binder, command, args);

        if (parseResult.error) {
            // TODO: Create a ErrorHandler and pass Context and Error
            console.log(parseResult.error);
            return false;
        }

        let suppliedArguments: any[] = parseResult.suppliedArguments;
        let result: Promise<CommandExecutionResult> = this.commandExecutor.execute(command, suppliedArguments);

        // TODO: Create a CommandExecutionResultHandler and pass Context and result
        return true;

    }

}