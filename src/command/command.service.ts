import IBinder from "./parameter.converter/bind/binder";
import CommandDispatcher from "./command.dispatcher";
import CommandRegistry from "./command.registry";
import ICommandExecutor from "./executor/command.executor";
import CommandParser from "./parser/command.parser";
import Binder from "./parameter.converter/bind/simple.binding.builder";
import EvalCommandExecutor from "./executor/eval.command.executor";
import DefaultCommandExecutor from "./executor/default.command.executor";

export interface CommandServiceSettings {

    readonly useEvalCommandExecutor: boolean;

}

export default class CommandService {

    private readonly parser: CommandParser;
    public readonly binder: IBinder;
    public readonly dispatcher: CommandDispatcher;
    public readonly registry: CommandRegistry;
    public readonly executor: ICommandExecutor;

    public constructor(settings: CommandServiceSettings = {useEvalCommandExecutor: false}) {
        this.parser = new CommandParser();
        this.binder = new Binder();
        this.registry = new CommandRegistry();
        if (settings.useEvalCommandExecutor) {
            this.executor = new EvalCommandExecutor();
        } else {
            this.executor = new DefaultCommandExecutor();
        }
        this.dispatcher = new CommandDispatcher(this.registry, this.parser, this.executor, this.binder);
    }

}

