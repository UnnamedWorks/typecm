import Key from "./identity/key";

export enum Requirement {
    REQUIRED = 1,
    OPTIONAL,
    WEAK_OPTIONAL,
    INJECTED
}

export const ALL_ARGS = -1;

export interface IParameter {
    readonly type: Key<any>;
    readonly name: string;
    readonly requirement?: Requirement;
    readonly consumes?: number;
}

export default class Command {

    public readonly name: string;
    public readonly aliases: string[];
    public readonly parameters: IParameter[];

    protected constructor(name: string, aliases: string[] = [], parameters: IParameter[]) {
        this.name = name;
        this.aliases = aliases;
        this.parameters = parameters;
    }

}