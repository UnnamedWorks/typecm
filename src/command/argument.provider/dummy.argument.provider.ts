import Namespace from "../namespace";
import {IArgumentProvider, IProvisionResult} from "./argument.provider";
import LinkedIterator from "../../util/iterator";

export default class ConstantArgumentProvider<T> implements IArgumentProvider<T> {

    private readonly value: T;

    public constructor(value: T) {
        this.value = value;
    }

    provide(context: Namespace, args: LinkedIterator<string>): IProvisionResult<T> {
        return {
            value: this.value
        };
    }

}