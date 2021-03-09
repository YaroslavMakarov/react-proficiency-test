export const urlNumber = (url: string): string => {
    return url.split('/')[url.split('/').length - 1];
};