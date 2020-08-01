import ICommandBuilder from "../command.builder";
import Command from "../../command";
import ICommandMethodScanner, {CommandMethod} from "../command.method.scanner";
import ReflectMetadataMethodScanner from "./metadata.command.method.scanner";
import ICommandMethodConverter from "../command.method.converter";
import ReflectMetadataCommandMethodConverter from "./metadata.command.method.converter";

export default class ReflectMetadataCommandBuilder implements ICommandBuilder {

    private readonly scanner: ICommandMethodScanner = new ReflectMetadataMethodScanner();
    private readonly converter: ICommandMethodConverter = new ReflectMetadataCommandMethodConverter();

    public build(commandHolder: any, commandMethodName: string, commandMethod: CommandMethod): Command {
        return this.converter.convert(commandMethod.names, commandHolder, commandMethodName);
    }

    public buildMany(commandHolder: any): Command[] {
        let methods: CommandMethod[] = this.scanner.scan(commandHolder);
        return methods.map(method => this.build(commandHolder, method.methodName, method));
    }

}