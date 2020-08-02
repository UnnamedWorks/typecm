import ArgumentInjector from "../argument.injector";
import CommandRegistry from "../../command.registry";
import Namespace from "../../namespace";
import CommandDispatcher from "../../command.dispatcher";

export class CommandRegistryArgumentInjector extends ArgumentInjector<CommandRegistry> {

    public inject(context: Namespace): CommandRegistry {
        return context.get(CommandRegistry, CommandDispatcher.REGISTRY_NAMESPACE);
    }

}