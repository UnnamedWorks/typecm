import Namespace from "../namespace";

export default interface IArgumentInjector<T> {

    (context: Namespace): T;

}