import ICommandMethodScanner, {CommandMethod} from "../command.method.scanner";
import "reflect-metadata";

/**
 * @see ICommandMethodScanner
 */
export default class ReflectMetadataMethodScanner implements ICommandMethodScanner {

    /**
     * @see ICommandMethodScanner
     */
    public scan(object: any, filter?: (fun: Function) => boolean): CommandMethod[] {
        let keys: string[] = [];
        let checking: any = object;

        // check all methods
        // inherited methods, own methods, etc
        do {
            keys = keys.concat(Object.getOwnPropertyNames(checking));
        } while (checking = Object.getPrototypeOf(checking));

        return keys.map(element => {
            let value = object[element];
            if (typeof value == 'function') {
                let names = Reflect.getMetadata("typecm:names", object, element);
                if (names) {
                    return {
                        names,
                        method: value,
                        methodName: element
                    };
                }
            }
            return undefined; // remove undefined elements
        }).filter(element => element != undefined);
    }

}