import CommandService, {CommandServiceSettings} from "../../command/command.service";
import Discord = require('discord.js');
import Namespace from "../../command/namespace";

export default class DiscordCommandService extends CommandService {

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
        this.prefix = prefix;
    }

    public dispatchCommand(message: Discord.Message): boolean {
        let context: Namespace = new Namespace();

        context.set(Discord.GuildMember, "AUTHOR", message.member);
        context.set(Discord.Message, "MESSAGE", message);

        return this.dispatcher.dispatchCommand(message.content.slice(this.prefix.length), context);
    }

}