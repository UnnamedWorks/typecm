import IConverterModule from "../converters.module";
import IBinder from "../bind/binder";

import {createStringConverter, createNumberConverter} from "./defaults.parameter.converters";
import {createRegistryInjector} from "./defaults.argument.injector";
import CommandRegistry from "../../command.registry";

export default class DefaultConvertersModule implements IConverterModule {

    into(binder: IBinder): void {

        binder.bind(String).toConverter(createStringConverter());
        binder.bind(Number).toConverter(createNumberConverter());
        binder.bind(CommandRegistry).toInjector(createRegistryInjector());

    }

}