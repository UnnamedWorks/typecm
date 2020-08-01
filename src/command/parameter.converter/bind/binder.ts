import {IParameterConverter} from "../parameter.converter";
import IArgumentInjector from "../argument.injector";
import IConverterModule from "../converters.module";
import Binding from "./binding";
import Key from "../../identity/key";

export interface ILinkedBindingBuilder<T> {

    toInstance(value: T): void;

    toConverter(converter: IParameterConverter<T>): void;

    toInjector(injector: IArgumentInjector<T>): void;

}

export default interface IBinder {

    addBinding<T>(binding: Binding<T>): void;

    bind<T>(type: Key<T>): ILinkedBindingBuilder<T>;

    install(module: IConverterModule): void;

    findBinding<T>(type: Key<T>): Binding<T> | undefined;

}