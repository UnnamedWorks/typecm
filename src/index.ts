import dotenv from 'dotenv';
import Discord = require('discord.js');
import DiscordCommandService from "./test/discord/discord.command.service";
import HelpCommand from "./help.command";
import DefaultConvertersModule from "./command/parameter.converter/defaults/defaults.module";
dotenv.config();


let client = new Discord.Client();
let service = new DiscordCommandService(client, "-", {
    useEvalCommandExecutor: true
});

service.registry.registerCommand(new HelpCommand());
service.binder.install(new DefaultConvertersModule());
service.binder.bind(Discord.Message)
    .toInjector(context => context.get(Discord.Message, "MESSAGE"));

client.on("ready", () => console.log("Ready!"));
client.login(process.env.BOT_TOKEN);