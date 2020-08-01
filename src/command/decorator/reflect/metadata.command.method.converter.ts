import ICommandMethodConverter from "../command.method.converter";
import Command, {IParameter, Requirement} from "../../command";
import Key from "../../identity/key";

export default class ReflectMetadataCommandMethodConverter implements ICommandMethodConverter {

    getParameterTypes(functionHolder: any, functionName: string): Key<any>[] {
        return Reflect.getMetadata("design:paramtypes", functionHolder, functionName);
    }

    convert(names: string[], functionHolder: any, functionName: string): Command {
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
        let parameterTypes: Key<any>[] = this.getParameterTypes(functionHolder, functionName);
        let requirementLevels: Requirement[] = Reflect.getMetadata("typecm:requirement", functionHolder, functionName) || [];
        let usage: string = Reflect.getMetadata("typecm:usage", functionHolder, functionName);
        let parameterNames: string[] = Reflect.getMetadata("typecm:names", functionHolder, functionName) || [];
        let consumes: number[] = Reflect.getMetadata("typecm:consumes", functionHolder, functionName) || [];

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
        (command as any).execute = functionHolder[functionName];
        return command;
    }

}