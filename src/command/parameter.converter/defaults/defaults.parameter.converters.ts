import {IParameterConverter} from "../parameter.converter";

export function createStringConverter(): IParameterConverter<String> {
    return (context, args) => {
        if (!args.hasNext()) {
            return {
                error: "no-arguments"
            };
        }
        let text = "";
        while (args.hasNext()) {
            text += " " + args.next();
        }
        return {
            value: text.trim()
        };
    };
}

export function createNumberConverter(): IParameterConverter<Number> {
    return (context, args) => {
        if (!args.hasNext()) {
            return {
                error: "no-arguments"
            };
        }
        let value: number = parseInt(args.next());
        if (isNaN(value) || !isFinite(value)) {
            return {
                error: "invalid-argument"
            };
        }
        return {value};
    };
}