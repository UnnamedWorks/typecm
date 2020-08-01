import Discord = require('discord.js');
import dotenv from 'dotenv';
import DiscordCommandService from "./test/discord/discord.command.service";
import ICommandBuilder from "./command/decorator/command.builder";
import ReflectMetadataCommandBuilder from "./command/decorator/reflect/metadata.command.builder";
import HelpCommandClass from "./help.command";
dotenv.config();

const client = new Discord.Client();

let commandBuilder: ICommandBuilder = new ReflectMetadataCommandBuilder();
let service = new DiscordCommandService(client, "-", {
    useEvalCommandExecutor: true
});

service.binder.bind(Discord.Message).toInjector(context => context.get(Discord.Message, "MESSAGE"));
service.registry.registerCommands(commandBuilder.buildMany(new HelpCommandClass()));

client.on("ready", () => console.log("ready!"));

client.login(process.env.BOT_TOKEN);