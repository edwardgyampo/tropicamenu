export type ListItem = { name: string, list?: ListItem[] };

// if (Array.isArray(item.list) && item.list.length > 0) 

export class List {
    items: ListItem[] = [];

    constructor(items: ListItem[] = []) {
        this.items = items;
    }
}