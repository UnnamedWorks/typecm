import {IParameterConverter} from "../parameter.converter";
import Key from "../../identity/key";

export default interface Binding<T> {

    readonly type: Key<T>;
    readonly converter: IParameterConverter<T>;

}