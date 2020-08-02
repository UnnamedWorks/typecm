import {Requirement} from "../command";
import Key from "../identity/key";

/**
 * A function that should be used in Modifier
 * Decorators to determine the modifiers of a Key.
 * @example
 * function SomeDecorator(target: any, name: string, index: number): any {
 *      return setModifier(target, name, index, "MODIFIER_IN_STRING");
 * }
 *
 * The "return" statement is important. The decorator function
 * is called while binding a key to an argument provider, it
 * is called with dummy values.
 * When called with these dummy values, it returns the modifier
 * in String, which determines the Key.
 * @example
 * bind(String).decorated(SomeDecorator).toProvider(someProvider);
 *
 * @param target The decorator target
 * @param name The decorating-function name
 * @param index The parameter index
 * @param modifier The key modifier
 * @see Key
 * @see Injected for an example of setModifier usage
 */
export function setModifier(target: any, name: string, index: number, modifier: string): any {

    // Check dummy values, returns the modifier.
    if (!target && !name && index == -1) {
        return modifier;
    }

    // Gets existing modifier matrix
    let existing: string[][] = Reflect.getMetadata("typecm:modifiers", target, name) || [];
    let parameterModifiers: string[] = existing[index] || [];
    parameterModifiers.push(modifier);
    existing[index] = parameterModifiers;

    // Apply modifier matrix in metadata
    Reflect.defineMetadata("typecm:modifiers", existing, target, name);
}

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
    return setModifier(target, propertyKey, parameterIndex, "INJECTED");
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