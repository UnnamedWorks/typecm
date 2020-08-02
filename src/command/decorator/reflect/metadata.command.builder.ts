import ICommandBuilder from "../command.builder";
import Command, {IParameter, Requirement} from "../../command";
import ICommandMethodScanner, {CommandMethod} from "../command.method.scanner";
import ReflectMetadataMethodScanner from "./metadata.command.method.scanner";
import Key from "../../identity/key";
import IKeyResolver from "../key.resolver";
import ReflectMetadataKeyResolver from "./metadata.key.resolver";

export default class ReflectMetadataCommandBuilder implements ICommandBuilder {

    private readonly scanner: ICommandMethodScanner = new ReflectMetadataMethodScanner();
    private readonly keyResolver: IKeyResolver = new ReflectMetadataKeyResolver();

    public build(commandHolder: any, commandMethodName: string, commandMethod: CommandMethod): Command {

        let names: string | string[] = commandMethod.names;
        let name: string;
        if (typeof names == 'string') {
            name = names as string;
            names = [];
        } else {
            name = names.shift();
        }
        if (!name) {
            throw new Error("Command doesn't have a name!");
        }
        let parameterTypes: Key<any>[] = this.keyResolver.getParameterKeys(commandHolder, commandMethodName);
        let requirementLevels: Requirement[] = Reflect.getMetadata("typecm:requirement", commandHolder, commandMethodName) || [];
        let usage: string = Reflect.getMetadata("typecm:usage", commandHolder, commandMethodName);
        let parameterNames: string[] = Reflect.getMetadata("typecm:names", commandHolder, commandMethodName) || [];
        let consumes: number[] = Reflect.getMetadata("typecm:consumes", commandHolder, commandMethodName) || [];

        let parameters: IParameter[] = parameterTypes.map((parameterType, index) => {
            let parameter: IParameter = {
                name: parameterNames[index] || `arg${index}`,
                type: parameterType,
                requirement: requirementLevels[index] || Requirement.REQUIRED,
                consumes: consumes[index]
            };
            return parameter;
        });
        let command: Command = new Command(name, names, parameters, usage);
        (command as any).execute = commandHolder[commandMethodName];
        return command;
    }

    public buildMany(commandHolder: any): Command[] {
        let methods: CommandMethod[] = this.scanner.scan(commandHolder);
        return methods.map(method => this.build(commandHolder, method.methodName, method));
    }

}