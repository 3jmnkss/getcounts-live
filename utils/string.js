export function capitalizeIfI18N(string, isBaseLng) {
    if (isBaseLng) return string;
    return string
        .split(" ")
        .map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        })
        .join(" ");
}