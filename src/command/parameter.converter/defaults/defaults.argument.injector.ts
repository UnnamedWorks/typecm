import IArgumentInjector from "../argument.injector";
import CommandRegistry from "../../command.registry";
import Namespace from "../../namespace";

export function createRegistryInjector(): IArgumentInjector<CommandRegistry> {
    return (context: Namespace) => {
        return context.get(CommandRegistry, "COMMAND_REGISTRY");
    };
}