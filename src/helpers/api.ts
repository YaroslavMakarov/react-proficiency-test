const API_URL = 'https://rickandmortyapi.com/api/';

export const getData = async (endPoint: string) => {
    const responseDataAPI = await fetch(`${API_URL}${endPoint}`);
    const dataFromServer = await responseDataAPI.json();

    return dataFromServer;
};