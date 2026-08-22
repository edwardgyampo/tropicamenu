export type ListItem = { 
    name: string,
    list?: ListItem[],
    icon?: string,
    link?: string,
 };

export class List {
    items: ListItem[] = [];

    constructor(items: ListItem[] = []) {
        this.items = items;
    }
}