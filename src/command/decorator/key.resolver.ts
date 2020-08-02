import Key from "../identity/key";

/**
 * Resolves function parameter keys, checks for ModifierDecorators
 */
export default interface IKeyResolver {

    /**
     * Resolves function parameter keys, checks for ModifierDecorators
     * and adds them to the Key.
     * @param functionHolder The object that holds the function
     * @param functionName The function name
     * @see Key
     */
    getParameterKeys(functionHolder: any, functionName: string): Key<any>[];

}