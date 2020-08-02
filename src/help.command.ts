import ACommand, {Injected, Optional} from "./command/decorator/command.decorator";
import {CommandExecutionResult} from "./command/executor/command.executor";
import CommandRegistry from "./command/command.registry";
import Command from "./command/command";
import Discord = require('discord.js');
import ICommandHolder from "./command/command.holder";

const COMMANDS_PER_PAGE = 7;

export default class HelpCommandClass implements ICommandHolder {

    @ACommand("help")
    public async execute(@Injected registry: CommandRegistry,
                         @Injected message: Discord.Message,
                         @Optional() page: number = 1): Promise<CommandExecutionResult> {

        let commands: Command[] = [];

        for (let command of registry.commands.values()) {
            commands.push(command);
        }
        let maxCommandIndex = (page * COMMANDS_PER_PAGE);
        let minCommandIndex = maxCommandIndex - COMMANDS_PER_PAGE;

        if (minCommandIndex >= commands.length) {
            return message.channel.send("That page doesn't exist!")
                .then(() => CommandExecutionResult.INVALID_ARGUMENTS);
        }

        commands.slice(minCommandIndex, maxCommandIndex).forEach(command => {
            message.channel.send(`Command ${command.name}`);
        });

        return CommandExecutionResult.SUCCESS;

    }

}