import {setModifier} from "../decorator/command.decorator";

/**
 * A interface that represents
 * a decorator.
 */
export interface IParameterDecorator {

    (target: any, key: string, parameterIndex: number): any;

}

/**
 * A interface that represents
 * a class.
 * @example let typeLiteral: TypeLiteral<String> = String;
 * @see Key
 */
export interface TypeLiteral<T> {

    /**
     * Represents the class constructor.
     * @param args Any parameter is supported
     */
    new(...args: any[]): T;

}

/**
 * A interface consisting of an parameter type. Matches the type and
 * modifiers (determined by decorators).
 *
 * Manually:
 * @example
 * let key: Key<String> = {
 *      type: String,
 *      modifiers: ["ANY_MODIFIER"]
 * }
 *
 * Using decorators:
 * @example
 * public someFunction(@Decorator parameter: string) {}
 *
 * The decorator must be a ModifierDecorator,
 * @see setModifier
 */
export default interface Key<T> {

    /**
     * The parameter type
     * @see TypeLiteral
     */
    readonly type: TypeLiteral<T>;

    /**
     * The key modifiers.
     */
    readonly modifiers: string[];

}