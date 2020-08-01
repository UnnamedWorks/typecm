import Command from "../command";
import Key from "../identity/key";

export default interface ICommandMethodConverter {

    getParameterTypes(functionHolder: any, functionName: string): Key<any>[];

    convert(names: string[], functionHolder: any, functionName: string): Command;

}