export const classNameFrom = (classes: any[]) => {
    return classes
        .filter(c => typeof c === "string" && c !== "")
        .join(" ");
}