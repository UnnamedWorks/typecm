import {IArgumentProvider} from "../argument.provider";
import IConverterModule from "../converters.module";
import Binding from "./binding";
import Key, {IParameterDecorator, TypeLiteral} from "../../identity/key";

export interface ILinkedBindingBuilder<T> {

    toInstance(value: T): void;

    toProvider(provider: IArgumentProvider<T>): void;

    toProviderType(provider: { new(): IArgumentProvider<T> }): void;

}

export interface IDecoratedBindingBuilder<T> extends ILinkedBindingBuilder<T> {

    decorated(decorator: IParameterDecorator): IDecoratedBindingBuilder<T>;

    modified(modifier: string): IDecoratedBindingBuilder<T>;

}

export default interface IBinder {

    addBinding<T>(binding: Binding<T>): void;

    bind<T>(type: TypeLiteral<T>): IDecoratedBindingBuilder<T>;

    bindRaw<T>(key: Key<T>): ILinkedBindingBuilder<T>;

    install(module: IConverterModule): void;

    findBinding<T>(type: Key<T>): Binding<T> | undefined;

}