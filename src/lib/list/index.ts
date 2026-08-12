export type ListItem = { name: string, list?: ListItem[] };

export class List {
    items: ListItem[] = [];

    constructor(items: ListItem[] = []) {
        this.items = items;
    }
}