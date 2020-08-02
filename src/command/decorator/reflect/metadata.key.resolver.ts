import IKeyResolver from "../key.resolver";
import Key, {TypeLiteral} from "../../identity/key";

/**
 * @see IKeyResolver
 */
export default class ReflectMetadataKeyResolver implements IKeyResolver {

    /**
     * @see IKeyResolver
     */
    public getParameterKeys(functionHolder: any, functionName: string): Key<any>[] {
        let types: TypeLiteral<any>[] = Reflect.getMetadata("design:paramtypes", functionHolder, functionName);
        let modifiers: string[][] = Reflect.getMetadata("typecm:modifiers", functionHolder, functionName);
        return types.map((type, index) => {
            return {
                type,
                modifiers: modifiers[index] || []
            };
        });
    }

}