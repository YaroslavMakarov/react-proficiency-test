export const urlNumber = (url: string): string => {
    return url.split('/')[url.split('/').length - 1];
};

export const urlParam = (url: string): string => {
    const splitedURL = url.split('/');
    return `${splitedURL[splitedURL.length-2]}/${splitedURL[splitedURL.length-1]}`
};