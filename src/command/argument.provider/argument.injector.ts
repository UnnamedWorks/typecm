import Namespace from "../namespace";
import {IArgumentProvider, IProvisionResult} from "./argument.provider";
import LinkedIterator from "../../util/iterator";

export default abstract class ArgumentInjector<T> implements IArgumentProvider<T>{

    public provide(context: Namespace, args: LinkedIterator<string>): IProvisionResult<T> {
        let value: T = this.inject(context);
        if (!value) {
            return {error: "injection-error"};
        }
        return {value};
    }

    abstract inject(context: Namespace): T;

}