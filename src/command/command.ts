import Key from "./identity/key";

export enum Requirement {
    REQUIRED = 1,
    OPTIONAL,
    WEAK_OPTIONAL
}

export const ALL_ARGS = -1;

export interface IParameter {
    readonly type: Key<any>;
    readonly name?: string;
    readonly requirement?: Requirement;
    readonly consumes?: number;
}

export default class Command {

    public readonly name: string;
    public readonly aliases: string[];
    public readonly parameters: IParameter[];
    public readonly usage?: string;

    public constructor(name: string, aliases: string[] = [], parameters: IParameter[], usage?: string) {
        this.name = name;
        this.aliases = aliases;
        this.parameters = parameters;
        this.usage = usage;
    }

}