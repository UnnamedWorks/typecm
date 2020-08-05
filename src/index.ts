export default {

    Namespace: require('./command/namespace'),
    ICommandBuilder: require('./command/decorator/command.builder'),
    Decorators: require('./command/decorator/command.decorator'),
    ICommandHolder: require('./command/command.holder'),
    Command: require('./command/command'),
    CommandRegistry: require('./command/command.registry'),
    CommandDispatcher: require('./command/command.dispatcher'),
    CommandParser: require('./command/parser/command.parser'),
    CommandService: require('./command/command.service'),
    IBinder: require('./command/argument.provider/bind/binder'),
    IArgumentProvider: require('./command/argument.provider/argument.provider'),
    ArgumentInjector: require('./command/argument.provider/argument.injector'),
    ConvertersModule: require('./command/argument.provider/converters.module'),
    CommandExecutor: require('./command/executor/command.executor'),
    Key: require('./command/identity/key').default.Key,
    TypeLiteral: require('./command/identiy/key').TypeLiteral,

    // Discord
    DiscordCommandService: require('./discord/discord.command.service')

};