import IBinder from "./bind/binder";

export default interface IConverterModule {

    into(binder: IBinder): void;

}