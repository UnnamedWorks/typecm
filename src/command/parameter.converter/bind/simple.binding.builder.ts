import IBinder from "./binder";
import IConverterModule from "../converters.module";
import {ILinkedBindingBuilder} from "./binder";
import {IParameterConverter} from "../parameter.converter";
import IArgumentInjector from "../argument.injector";
import Binding from "./binding";
import Key from "../../identity/key";

function dummyConvert<T>(value: T): IParameterConverter<T> {
    return () => {
        return {value};
    };
}

export class DefaultLinkedBindingBuilder<T> implements ILinkedBindingBuilder<T> {

    private readonly binder: IBinder;
    private readonly key: Key<T>;

    constructor(binder: IBinder, key: Key<T>) {
        this.binder = binder;
        this.key = key;
    }

    toConverter(converter: IParameterConverter<T>): void {
        this.binder.addBinding({
            type: this.key,
            converter
        });
    }

    toInjector(inject: IArgumentInjector<T>): void {
        this.binder.addBinding({
            type: this.key,
            converter: context => {
                return {value: inject(context)};
            }
        });
    }

    toInstance(value: T): void {
        this.binder.addBinding({
            type: this.key,
            converter: dummyConvert(value)
        });
    }

}

export default class Binder implements IBinder {

    private readonly bindings: Map<Key<any>, IParameterConverter<any>> = new Map<Key<any>, IParameterConverter<any>>();

    bind<T>(type: any): ILinkedBindingBuilder<T> {
        return new DefaultLinkedBindingBuilder(this, type);
    }

    install(module: IConverterModule): void {
        module.into(this);
    }

    addBinding<T>(binding: Binding<T>): void {
        this.bindings.set(binding.type, binding.converter);
    }

    findBinding<T>(key: Key<T>): Binding<T> | undefined {
        let converter: IParameterConverter<any> = this.bindings.get(key);
        if (!converter) {
            return undefined;
        }
        return {
            type: key,
            converter
        };
    }

}