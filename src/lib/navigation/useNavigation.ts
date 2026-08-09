import { useMemo, useState } from "react";
import { Navigation, type NavigationState } from ".";
import type { ListItem } from "../list";

export const useNavigation = ({ root }: { root: ListItem }) => {
    const navigation = useMemo(() => new Navigation(root), [root]);
    const [state, setState] = useState<NavigationState>(navigation.state);
    const classNames = { direction: `Navigation--${state.direction}` };
    const animations = ["SlideInFromRight", "SlideOutToRight", "SlideInFromLeft", "SlideOutToLeft"];
    const backItem: ListItem = state.past[state.past.length - 1];
    const currentItem: ListItem | undefined = state.present;
    const nextItem: ListItem = state.future[state.future.length - 1];

    const goBack = () => {
        navigation.goBackward();
        setState(navigation.state);
    }

    const goFoward = () => {
        navigation.goForward();
        setState(navigation.state);
    }

    const select = (itemName: string) => {
        navigation.select(itemName);
        setState(navigation.state);
    }

    const hasPastItems = () => {
        return state.past.length > 0;
    }

    const hasFutureItems = () => {
        return state.future.length > 0;
    }

    return {
        state,
        classNames,
        backItem,
        currentItem,
        nextItem,
        animations,
        select,
        goBack,
        goFoward,
        hasPastItems,
        hasFutureItems
    }
}