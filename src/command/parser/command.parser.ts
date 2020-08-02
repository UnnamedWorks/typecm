import Command, {IParameter, Requirement} from "../command";
import IBinder from "../parameter.converter/bind/binder";
import LinkedIterator from "../../util/iterator";
import Key from "../identity/key";
import {IArgumentProvider} from "../parameter.converter/argument.provider";
import Binding from "../parameter.converter/bind/binding";
import Namespace from "../namespace";

export interface IParseResult {
    readonly suppliedArguments?: any[];
    readonly error?: string;
}

export default class CommandParser {

    public parse(namespace: Namespace, binder: IBinder, command: Command, args: string[]): IParseResult {

        let requiredArgumentCount: number =
            command.parameters.filter(param => param.requirement == Requirement.REQUIRED)
                .filter(param => !param.type.modifiers.includes("INJECTED")) // exclude injected parameters
                .map(param => param.consumes || 1)
                .reduce((acc, current) => acc + current, 0);

        if (args.length < requiredArgumentCount) {
            return {
                error: "insuficient-arguments"
            };
        }

        let suppliedArguments: any[] = [];
        let iterator: LinkedIterator<string> = new LinkedIterator(args);

        for (let i = 0; i < command.parameters.length; i++) {

            let param: IParameter = command.parameters[i];
            let type: Key<any> = param.type;
            console.log(type);
            let binding: Binding<any> = binder.findBinding(type);

            if (!binding) {
                return {
                    error: "no-converter"
                };
            }

            let converter: IArgumentProvider<any> = binding.provider;
            let consumes: number = param.consumes | 1;
            let nextIndexSnapshot = iterator.nextIndex;
            let slice: LinkedIterator<string> = consumes == -1
                    ? iterator.slice(nextIndexSnapshot)
                    : iterator.slice(nextIndexSnapshot, nextIndexSnapshot + consumes);

            let result = converter.provide(namespace, slice);

            if (result.error) {
                if (param.requirement == Requirement.REQUIRED) {
                    return {
                        error: "conversion-error-" + result.error
                    };
                } else if (param.requirement == Requirement.OPTIONAL) {
                    iterator.setNextIndex(nextIndexSnapshot);
                } else {
                    if (i + 1 >= command.parameters.length) {
                        iterator.setNextIndex(nextIndexSnapshot);
                        return {
                            error: "conversion-error-" + result.error
                        };
                    }
                    iterator.setNextIndex(nextIndexSnapshot);
                }
            }

            suppliedArguments.push(result.value);

        }

        return { suppliedArguments };

    }

}