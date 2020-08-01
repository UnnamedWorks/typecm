import Command, {Requirement} from "./command/command";
import Discord = require('discord.js');
import {CommandExecutionResult} from "./command/executor/command.executor";

export default class HelpCommand extends Command {

    public constructor() {
        super("help", [], [
            {
                name: "message",
                requirement: Requirement.INJECTED,
                type: Discord.Message
            },
            {
                name: "page",
                requirement: Requirement.OPTIONAL,
                type: Number
            }
        ]);
    }

    public async execute(message: Discord.Message, page: number = 1): Promise<CommandExecutionResult> {
        await message.channel.send("pagina: " + page);
        return {};
    }

}