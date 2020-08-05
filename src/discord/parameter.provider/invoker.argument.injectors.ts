import ArgumentInjector from "../../command/argument.provider/argument.injector";
import Discord from 'discord.js';
import Namespace from "../../command/namespace";
import DiscordCommandService from "../discord.command.service";

export class AuthorArgumentInjector extends ArgumentInjector<Discord.User> {

    public inject(context: Namespace): Discord.User {
        return context.get(Discord.User, DiscordCommandService.AUTHOR_NAMESPACE);
    }

}

export class MessageArgumentInjector extends ArgumentInjector<Discord.Message> {

    public inject(context: Namespace): Discord.Message {
        return context.get(Discord.Message, DiscordCommandService.MESSAGE_NAMESPACE);
    }

}