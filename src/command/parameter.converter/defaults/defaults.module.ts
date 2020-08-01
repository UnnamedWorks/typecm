import IConverterModule from "../converters.module";
import IBinder from "../bind/binder";

import {createStringConverter, createNumberConverter} from "./defaults.parameter.converters";

export default class DefaultConvertersModule implements IConverterModule {

    into(binder: IBinder): void {

        binder.bind(String).toConverter(createStringConverter());
        binder.bind(Number).toConverter(createNumberConverter());

    }

}