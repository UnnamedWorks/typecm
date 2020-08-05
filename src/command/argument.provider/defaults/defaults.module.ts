import IConverterModule from "../converters.module";
import IBinder from "../bind/binder";

import {NumberArgumentProvider, StringArgumentProvider} from "./default.argument.providers";
import {CommandRegistryArgumentInjector} from "./default.argument.injectors";
import CommandRegistry from "../../command.registry";
import {Injected} from "../../decorator/command.decorator";

export default class DefaultConvertersModule implements IConverterModule {

    into(binder: IBinder): void {

        binder.bind(String).toProviderType(StringArgumentProvider);
        binder.bind(Number).toProviderType(NumberArgumentProvider);
        binder.bind(CommandRegistry).decorated(Injected).toProviderType(CommandRegistryArgumentInjector);

    }

}