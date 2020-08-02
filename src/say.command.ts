import ICommandHolder from "./command/command.holder";
import ACommand, {Consumes, Injected} from "./command/decorator/command.decorator";
import {ALL_ARGS} from "./command/command";
import {CommandExecutionResult} from "./command/executor/command.executor";
import Discord = require('discord.js');
import {Webhook} from "discord.js";

export default class SayCommandClass implements ICommandHolder {

    @ACommand("say")
    public async execute(@Injected message: Discord.Message, @Consumes(ALL_ARGS) text: string): Promise<CommandExecutionResult> {
        if (!(message.channel instanceof Discord.TextChannel)) {
            await message.channel.send("no, gei.");
            return CommandExecutionResult.SUCCESS;
        }
        let channel: Discord.TextChannel = message.channel;
        let webhook: Webhook = await channel.createWebhook(message.author.username, {
            avatar: message.author.displayAvatarURL()
        });
        let response = await webhook.send(text);
        await webhook.delete();
    }

}