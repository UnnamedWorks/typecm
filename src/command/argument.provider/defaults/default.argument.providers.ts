import {IArgumentProvider, IProvisionResult} from "../argument.provider";
import Namespace from "../../namespace";
import LinkedIterator from "../../../util/iterator";

export class StringArgumentProvider implements IArgumentProvider<String> {

    provide(context: Namespace, args: LinkedIterator<string>): IProvisionResult<String> {
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
    }

}

export class NumberArgumentProvider implements IArgumentProvider<Number> {

    provide(context: Namespace, args: LinkedIterator<string>): IProvisionResult<Number> {
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
    }

}