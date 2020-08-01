export default class LinkedIterator<T> {

    private readonly parent?: LinkedIterator<T>;
    private readonly offset: number;
    private readonly values: T[];
    public nextIndex: number;

    public constructor(values: T[], parent?: LinkedIterator<T>, offset: number = 0) {
        this.parent = parent;
        this.offset = offset;
        this.values = values;
        this.nextIndex = 0;
    }

    public hasNext(): boolean {
        return this.nextIndex < this.values.length;
    }

    public next(): T {
        if (!this.hasNext()) {
            throw new Error("No more values in the iterator!");
        }
        if (this.parent) {
            this.parent.next();
        }
        return this.values[this.nextIndex++];
    }

    public setNextIndex(nextIndex: number): void {
        if (nextIndex < 0) {
            throw new Error("The index must be positive");
        }
        if (this.parent) {
            let parentNewIndex = this.offset + nextIndex;
            this.parent.setNextIndex(parentNewIndex);
        }
        this.nextIndex = nextIndex;
    }

    public slice(start: number = 0, end: number = this.values.length): LinkedIterator<T> {
        return new LinkedIterator<T>(
            this.values.slice(start, end),
            this,
            this.nextIndex
        );
    }

    public static empty<T>(): LinkedIterator<T> {
        return new LinkedIterator([]);
    }

}