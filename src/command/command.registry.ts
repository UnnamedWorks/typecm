import Command from "./command";
import fs, {PathLike} from "fs";
import ICommandHolder from "./command.holder";
import ICommandBuilder from "./decorator/command.builder";

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

    public registerCommandFolder(commandFolder: PathLike, commandBuilder: ICommandBuilder): void {
        fs.readdir(commandFolder, (err, files) => {
            if (err) {
                return console.error(err);
            }
            files.filter(file => file.endsWith(".js")).forEach(file => {
                let CommandHolder = require(`${commandFolder}/${file}`);
                let commandHolder: ICommandHolder = new CommandHolder();
                this.registerCommands(commandBuilder.buildMany(commandHolder));
            });
        });
    }

}