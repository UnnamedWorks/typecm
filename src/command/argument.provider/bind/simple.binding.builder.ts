import IBinder, {IDecoratedBindingBuilder} from "./binder";
import IConverterModule from "../converters.module";
import {ILinkedBindingBuilder} from "./binder";
import {IArgumentProvider} from "../argument.provider";
import Binding from "./binding";
import Key, {IParameterDecorator, TypeLiteral} from "../../identity/key";
import ConstantArgumentProvider from "../dummy.argument.provider";

export class DefaultLinkedBindingBuilder<T> implements ILinkedBindingBuilder<T> {

    protected readonly binder: IBinder;
    protected readonly key: Key<T>;

    constructor(binder: IBinder, key: Key<T>) {
        this.binder = binder;
        this.key = key;
    }

    toProvider(provider: IArgumentProvider<T>): void {
        this.binder.addBinding({
            type: this.key,
            provider
        });
    }

    toInstance(value: T): void {
        this.toProvider(new ConstantArgumentProvider(value));
    }

    toProviderType(Provider: { new(): IArgumentProvider<T> }): void {
        this.binder.addBinding({
            type: this.key,
            provider: new Provider()
        });
    }

}

export class DefaultDecoratedBindingBuilder<T> extends DefaultLinkedBindingBuilder<T> implements IDecoratedBindingBuilder<T> {

    decorated(decorator: IParameterDecorator): IDecoratedBindingBuilder<T> {
        // dummy values
        return this.modified(decorator(undefined, undefined, -1));
    }

    modified(modifier: string): IDecoratedBindingBuilder<T> {
        this.key.modifiers.push(modifier);
        return this;
    }

}



export default class Binder implements IBinder {

    public readonly bindings: Map<string, IArgumentProvider<any>> = new Map<string, IArgumentProvider<any>>();

    bindRaw<T>(type: any): ILinkedBindingBuilder<T> {
        return new DefaultLinkedBindingBuilder(this, type);
    }

    install(module: IConverterModule): void {
        module.into(this);
    }

    addBinding<T>(binding: Binding<T>): void {
        this.bindings.set(Binder.stringify(binding.type), binding.provider);
    }

    findBinding<T>(key: Key<T>): Binding<T> | undefined {
        let provider: IArgumentProvider<any> = this.bindings.get(Binder.stringify(key));
        if (!provider) {
            return undefined;
        }
        return {
            type: key,
            provider
        };
    }

    bind<T>(type: TypeLiteral<T>): IDecoratedBindingBuilder<T> {
        return new DefaultDecoratedBindingBuilder(this, {
            type,
            modifiers: []
        });
    }

    private static stringify(key: Key<any>): string {
        return JSON.stringify({
            type: key.type.name,
            modifiers: key.modifiers
        });
    }

}