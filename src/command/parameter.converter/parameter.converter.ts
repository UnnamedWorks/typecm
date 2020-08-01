import LinkedIterator from "../../util/iterator";
import Namespace from "../namespace";

export interface IConversionResult<T> {

    value?: T;
    error?: string;

}

export interface IParameterConverter<T> {

    (context: Namespace, args: LinkedIterator<string>): IConversionResult<T>;

}