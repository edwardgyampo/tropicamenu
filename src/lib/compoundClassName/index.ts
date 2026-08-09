export const compoundClassName = (classes: any[]) => {
    return classes
        .filter(c => typeof c === "string" && c !== "")
        .join(" ");
}