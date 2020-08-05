import IConverterModule from "../../command/argument.provider/converters.module";
import IBinder from "../../command/argument.provider/bind/binder";
import Discord from 'discord.js';
import {Injected} from "../../command/decorator/command.decorator";
import {MessageArgumentInjector, AuthorArgumentInjector} from "./invoker.argument.injectors";
import {MemberArgumentProvider, TextChannelArgumentProvider} from "./default.argument.providers";

export default class DiscordModule implements IConverterModule {

    into(binder: IBinder): void {

        // invokers
        binder.bind(Discord.Message).decorated(Injected).toProviderType(MessageArgumentInjector);
        binder.bind(Discord.User).decorated(Injected).toProviderType(AuthorArgumentInjector);

        // default parameter converters
        binder.bind(Discord.GuildMember).toProviderType(MemberArgumentProvider);
        binder.bind(Discord.TextChannel).toProviderType(TextChannelArgumentProvider);

    }

}