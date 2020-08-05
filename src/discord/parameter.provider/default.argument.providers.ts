import {IArgumentProvider, IProvisionResult} from "../../command/argument.provider/argument.provider";
import Discord, {TextChannel} from 'discord.js';
import Namespace from "../../command/namespace";
import LinkedIterator from "../../util/iterator";
import DiscordCommandService from "../discord.command.service";

export class MemberArgumentProvider implements IArgumentProvider<Discord.GuildMember> {

    public provide(context: Namespace, args: LinkedIterator<string>): IProvisionResult<Discord.GuildMember> {
        if (!args.hasNext()) {
            return {
                error: "no-arguments"
            };
        }
        let message: Discord.Message = context.get(Discord.Message, DiscordCommandService.MESSAGE_NAMESPACE);
        let argument: string = args.next();
        let member: Discord.GuildMember = message.guild.members.cache.find(m => m.id == argument);

        if (!member) {
            member = message.guild.members.cache.find(m => m.user.username == argument);
        }

        if (!member) {
            member = message.guild.members.cache.find(m => m.user.tag == argument);
        }

        if (!member && argument.length == 22) { // maybe a mention? strip mention!
            argument = argument.substring(3, argument.length - 1);
            member = message.guild.members.cache.find(m => m.id == argument);
        }

        if (!member) {
            return {
                error: "not-found"
            };
        }

        return {
            value: member
        };
    }

}

export class TextChannelArgumentProvider implements IArgumentProvider<Discord.TextChannel> {

    public provide(context: Namespace, args: LinkedIterator<string>): IProvisionResult<Discord.TextChannel> {

        if (!args.hasNext()) {
            return {
                error: "no-arguments"
            };
        }

        let message: Discord.Message = context.get(Discord.Message, DiscordCommandService.MESSAGE_NAMESPACE);
        let argument: string = args.next();
        let textChannels = message.guild.channels.cache.filter(c => c.type == "text")
            .map(c => c as TextChannel);

        let channel: Discord.TextChannel = textChannels.find(c => c.id == argument);

        if (!channel) {
            channel = textChannels.find(c => c.name == argument);
        }

        if (!channel && argument.length == 21) {
            argument = argument.substring(2, argument.length - 1);
            channel = textChannels.find(c => c.id == argument);
        }

        if (!channel) {
            return {
                error: "not-found"
            };
        }
        return {
            value: channel
        };
    }

}