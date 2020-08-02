import {TypeLiteral} from "./identity/key";

export default class Namespace {

    private readonly backing: Map<TypeLiteral<any>, Map<string, any>> = new Map<TypeLiteral<any>, Map<string, any>>();

    public get<T>(type: TypeLiteral<T>, name: string): T | undefined {
        let byName: Map<string, any> = this.backing.get(type);
        if (!byName) {
            return undefined;
        }
        return byName.get(name);
    }

    public set<T>(type: TypeLiteral<T>, name: string, value: T): void {
        let byName: Map<string, any> = this.backing.get(type);
        if (!byName) {
            byName = new Map<string, any>();
        }
        byName.set(name, value);
        this.backing.set(type, byName);
    }

}