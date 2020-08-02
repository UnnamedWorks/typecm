import CommandService, {CommandServiceSettings} from "../command/command.service";
import Discord = require('discord.js');
import Namespace from "../command/namespace";
import DiscordModule from "./parameter.provider/discord.module";

export default class DiscordCommandService extends CommandService {

    public static readonly AUTHOR_NAMESPACE: string = "MESSAGE_AUTHOR";
    public static readonly MESSAGE_NAMESPACE: string = "MESSAGE";

    private readonly prefix: string;

    constructor(client: Discord.Client, prefix: string, settings: CommandServiceSettings = {useEvalCommandExecutor: false}) {
        super(settings);
        client.on("message", message => {
            if (!message.content.startsWith(prefix)) {
                return;
            }
            if (message.author.bot) {
                return;
            }
            if (this.dispatchCommand(message)) {
                console.log("INFO | Executed command nose")
            } else {
                console.log("INFO | a")
            }
        })
        this.binder.install(new DiscordModule());
        this.prefix = prefix;
    }

    public dispatchCommand(message: Discord.Message): boolean {
        let context: Namespace = new Namespace();

        context.set(Discord.User, DiscordCommandService.AUTHOR_NAMESPACE, message.author);
        context.set(Discord.Message, DiscordCommandService.MESSAGE_NAMESPACE, message);

        return this.dispatcher.dispatchCommand(message.content.slice(this.prefix.length), context);
    }

}