import Discord = require('discord.js');
import dotenv from 'dotenv';
import ICommandBuilder from "./command/decorator/command.builder";
import ReflectMetadataCommandBuilder from "./command/decorator/reflect/metadata.command.builder";
import HelpCommandClass from "./help.command";
import SayCommandClass from "./say.command";
import DiscordCommandService from "./discord/discord.command.service";
dotenv.config();

const client = new Discord.Client();

let commandBuilder: ICommandBuilder = new ReflectMetadataCommandBuilder();
let service = new DiscordCommandService(client, "-", {
    useEvalCommandExecutor: true
});

service.registry.registerCommands(commandBuilder.buildMany(new HelpCommandClass()));
service.registry.registerCommands(commandBuilder.buildMany(new SayCommandClass()));

client.on("ready", () => console.log("ready!"));

client.login(process.env.BOT_TOKEN);