import LinkedIterator from "../../util/iterator";
import Namespace from "../namespace";

export interface IProvisionResult<T> {

    value?: T;
    error?: string;

}

export interface IArgumentProvider<T> {

    provide(context: Namespace, args: LinkedIterator<string>): IProvisionResult<T>;

}