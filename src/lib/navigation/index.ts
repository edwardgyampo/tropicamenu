import { type ListItem } from "../list";

export const ScreenIds = {
    "BackScreen": "BackScreen",
    "CurrentScreen": "CurrentScreen",
    "NextScreen": "NextScreen"
} as const;

export type ScreenId = typeof ScreenIds[keyof typeof ScreenIds];

export const NavigationDirections = {
    Forward: "Forward",
    Backward: "Backward"
} as const;

export type NavigationDirections = {
    [k in keyof typeof NavigationDirections]: typeof NavigationDirections[k]
};

export interface NavigationItem extends ListItem {
    backItem?: NavigationItem;
    nextItem?: NavigationItem;
}

export type NavigationDirection = NavigationDirections[keyof NavigationDirections];

export class GyampoNavigation {
    root: NavigationItem;
    past: NavigationItem[] = [];
    present?: NavigationItem;
    future: NavigationItem[] = [];
    direction?: NavigationDirection
    eventEmitter = new EventTarget();
    exitItem?: NavigationItem;  // May not be the last item in past or future.

    constructor(item: NavigationItem) {
        this.root = item;
        this.present = this.root;
    }

    selectItemFromHistory(searchItem: NavigationItem) {
        const item = this.getItemFromPast(searchItem);
        if (!item) return;

        let past: NavigationItem[] = [...this.past];
        let future: NavigationItem[] = [...this.future];

        // console.log(item.name + ' selected from history');
        const removedPast = past.splice(this.getIndexOfItemFromPast(item));
        const futureAppendage = removedPast.splice(1);

        future = this.present
            ? [
                ...future,
                ...[
                    ...futureAppendage,
                    {
                        ...this.present,
                        backItem: searchItem,
                        nextItem: future[future.length - 1]
                    }
                ].reverse()
            ]
            : future;

        this.past = past;
        this.future = future;
        this.present = item;
        this.direction = NavigationDirections.Backward;

        return item;
    }

    get directionClassName() {
        return `Direction--${this.direction}`;
    }

    get isForward() {
        return this.direction === "Forward";
    }

    get isBackward() {
        return this.direction === "Backward";
    }

    selectItemFromFuture(searchItem: NavigationItem) {
        const item = this.getItemFromFuture(searchItem);
        if (!item) return;

        let past: NavigationItem[] = [...this.past];
        let future: NavigationItem[] = [...this.future];

        // console.log(`"${item.name}" selected from future`);

        const removedFuture = future.splice(this.getIndexOfItemFromFuture(item));
        const pastAppendage = removedFuture.splice(1);
        // console.log({ pastAppendage });


        past = this.present
            ? [
                ...past,
                {
                    ...this.present,
                    backItem: pastAppendage.length > 0
                        ? pastAppendage[pastAppendage.length - 1]
                        : past[past.length - 1],
                    nextItem: searchItem
                },
                ...pastAppendage
            ]
            : past;

        this.past = past;
        this.present = item;
        this.future = future;
        this.direction = NavigationDirections.Forward;

        return item;
    }

    selectItemFromPresent(searchItem: NavigationItem) {
        const item = this.getItemFromPresentList(searchItem);
        if (!item) return;

        let past: NavigationItem[] = [...this.past];

        // console.log(`"${item.name}" selected from present`);

        past = this.present
            ? [
                ...past,
                {
                    ...this.present,
                    backItem: past[past.length - 1],
                    nextItem: searchItem
                }
            ]
            : past;

        this.past = past;
        this.present = item;
        this.future = [];
        this.direction = NavigationDirections.Forward;

        return item;
    }

    select(item: NavigationItem) {
        if (this.present?.name === item.name) return;

        this.exitItem = { ...this.present } as NavigationItem;

        const selectedItem =
            this.selectItemFromHistory(item)
            || this.selectItemFromFuture(item)
            || this.selectItemFromPresent(item);

        if (!selectedItem) return;

        const event = this.createSelectItemEvent();

        this.eventEmitter.dispatchEvent(event);

        return selectedItem;
    }

    createSelectItemEvent() {
        return new CustomEvent("selectItem", {
            detail: { navigation: this }
        });
    }

    goBack() {
        const mostRecentItemFromPast
            = this.past[this.past.length - 1];
        if (!mostRecentItemFromPast?.name) return;
        this.select(mostRecentItemFromPast);
    }

    goForward() {
        const mostRecentItemFromFuture
            = this.future[this.future.length - 1];
        if (!mostRecentItemFromFuture?.name) return;
        this.select(mostRecentItemFromFuture);
    }

    goToStart() {
        this.select(this.root);
    }

    getItemFromPast(item: NavigationItem) {
        return this.past.filter(pastItem => {
            return pastItem.name === item.name
        })?.[0];
    }

    getItemFromFuture(item: NavigationItem) {
        return this.future.filter(futureItem => {
            return futureItem.name === item.name
        })?.[0];
    }

    getItemFromPresentList(item: NavigationItem) {
        const presentItem = this.present?.list?.filter(presentItem => {
            return presentItem.name === item.name;
        })?.[0];

        return presentItem
            ? {
                ...presentItem,
                backItem: this.present
            }
            : undefined;
    }

    getIndexOfItemFromPast(item: NavigationItem) {
        return this.past.findIndex(pastItem => {
            return pastItem.name === item.name;
        });
    }

    getIndexOfItemFromFuture(item: NavigationItem) {
        return this.future.findIndex(futureItem => {
            return futureItem.name === item.name;
        });
    }

    get hasPastItems() {
        return this.past.length > 0;
    }

    get hasFutureItems() {
        return this.future.length > 0;
    }

    get backItem() {
        return this.past[this.past.length - 1];
    }

    get currentItem() {
        return this.present;
    }

    get nextItem() {
        return this.future[this.future.length - 1];
    }

}