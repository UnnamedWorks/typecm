import Command from "./command";

export default class CommandRegistry {

    public readonly commands: Map<string, Command> = new Map<string, Command>();
    public readonly commandAliases: Map<string, Command> = new Map<string, Command>();

    public findCommand(label: string): Command | undefined {
        return this.commands.get(label.toLowerCase()) || this.commandAliases.get(label);
    }

    public registerCommand(command: Command): void {
        this.commands.set(command.name.toLowerCase(), command);
        command.aliases.forEach(alias => this.commands.set(alias.toLowerCase(), command));
    }

    public registerCommands(commandArray: Command[]): void {
        commandArray.forEach(command => this.registerCommand(command));
    }

}