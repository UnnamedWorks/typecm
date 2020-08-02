import {Requirement} from "../command";

export function Usage(usage: string) {
    return Reflect.metadata("typecm:usage", usage);
}

export function Consumes(consume: number) {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        let existing: number[] = Reflect.getOwnMetadata("typecm:consumes", target, propertyKey) || [];
        existing[parameterIndex] = consume;
        Reflect.defineMetadata("typecm:consumes", existing, target, propertyKey);
    };
}

// just an alias for Optional(Requirement.INJECTED)
export function Injected(target: any, propertyKey: string, parameterIndex: number) {
    let apply = Optional(Requirement.INJECTED);
    apply(target, propertyKey, parameterIndex);
}

export function Named(name: string) {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        let existing: string[] = Reflect.getOwnMetadata("typecm:names", target, propertyKey) || [];
        existing[parameterIndex] = name;
        Reflect.defineMetadata("typecm:names", existing, target, propertyKey);
    };
}

export function Optional(requirement: Requirement = Requirement.OPTIONAL) {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        let existing: Requirement[] = Reflect.getOwnMetadata("typecm:requirement", target, propertyKey) || [];
        existing[parameterIndex] = requirement;
        Reflect.defineMetadata("typecm:requirement", existing, target, propertyKey);
    }
}

export default function ACommand(names: string | string[]) {
    return Reflect.metadata("typecm:names", names);
}