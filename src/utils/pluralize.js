export const pluralize = (word, count, plural) => {
    if (count === 1) return word;
    return plural || `${word}s`;
};
