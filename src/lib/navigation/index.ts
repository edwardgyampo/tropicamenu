import { type ListItem } from "../list";

export const NavigationDirections = {
    Forward: "Forward",
    Backward: "Backward"
} as const;

export type NavigationDirections = {
    [k in keyof typeof NavigationDirections]: typeof NavigationDirections[k]
};

export type NavigationDirection = NavigationDirections[keyof NavigationDirections];

export type NavigationState = {
    past: ListItem[];
    present: ListItem;
    future: ListItem[];
    direction: NavigationDirection
};

export class Navigation {
    state: NavigationState;

    constructor(item: ListItem) {
        this.state = {
            present: item,
            past: [],
            future: [],
            direction: NavigationDirections.Forward,
        };
    }

    select(name: string) {
        if (this.state.present?.name === name) return;

        
        const itemFromHistory = this.getItemFromPast(name);
        let past: typeof this.state['past'] = [...this.state.past];
        let future: typeof this.state['future'] = [...this.state.future];
        
        
        if (itemFromHistory) {
            console.log(itemFromHistory.name + ' selected from history');
            const removedPast = past.splice(this.getIndexOfItemFromPast(name));
            const futureAppendage = removedPast.splice(1);
            
            future = this.state.present ? [...future, ...[...futureAppendage, this.state.present].reverse()] : future;
            this.state = {
                ...this.state,
                past,
                future,
                present: itemFromHistory,
                direction: NavigationDirections.Backward
            }
            return;
        };

        const itemFromFuture = this.getItemFromFuture(name);
        if (itemFromFuture) {
            console.log(`"${itemFromFuture.name}" selected from future`);
            future.splice(this.getIndexOfItemFromFuture(name));
            past = this.state.present ? [...past, this.state.present] : past;
            this.state = {
                ...this.state,
                past,
                present: itemFromFuture,
                future,
                direction: NavigationDirections.Forward
            }
            return;
        }
        
        const itemFromPresent = this.getItemFromPresent(name);
        if (itemFromPresent) {
            console.log(`"${itemFromPresent.name}" selected from present`);
            past = this.state.present ? [...past, this.state.present] : past;
            this.state = {
                ...this.state,
                past: past,
                present: itemFromPresent,
                future: [],
                direction: NavigationDirections.Forward
            };
            return;
        }
    }

    goBackward() {
        const mostRecentItemFromPast = this.state.past[this.state.past.length - 1];
        if (!mostRecentItemFromPast?.name) return;
        this.select(mostRecentItemFromPast?.name);
    }

    goForward() {
        const mostRecentItemFromFuture = this.state.future[this.state.future.length - 1];
        if (!mostRecentItemFromFuture?.name) return;
        this.select(mostRecentItemFromFuture?.name);
    }

    getItemFromPast(name: string) {
        return this.state.past.filter(item => item.name === name)?.[0];
    }

    getItemFromFuture(name: string) {
        return this.state.future.filter(item => item.name === name)?.[0];
    }

    getItemFromPresent(name: string) {
        console.log(name, this.state?.present.list);
        return this.state?.present?.list?.filter(item => item.name === name)?.[0];
    }

    getIndexOfItemFromPast(name: string) {
        return this.state.past.findIndex(item => item.name === name);
    }

    getIndexOfItemFromFuture(name: string) {
        return this.state.future.findIndex(item => item.name === name);
    }
}