import Command, {Injected, Optional} from "./command/decorator/command.decorator";
import Discord = require('discord.js');
import {CommandExecutionResult} from "./command/executor/command.executor";

export default class HelpCommandClass {

    @Command("help")
    public async execute(@Injected message: Discord.Message, @Optional() page: number = 1): Promise<CommandExecutionResult> {
        await message.channel.send("page: "+page);
        return {};
    }

}