import {IArgumentProvider} from "../argument.provider";
import Key from "../../identity/key";

export default interface Binding<T> {

    readonly type: Key<T>;
    readonly provider: IArgumentProvider<T>;

}