export const getFetch = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(response.status);
    }
    return response.json();
};

const buildGetUrl = (url, params) => {
    return url + '?' + new URLSearchParams(params).toString();
};

export const getArtists = async ({ queryKey }) => {
    const [, queryParams] = queryKey;
    const url = `${process.env.REACT_APP_BASE_URL}/search/artist`;
    return await getFetch(buildGetUrl(url, queryParams));
};

export const getArtist = async ({ queryKey }) => {
    const [, queryParams] = queryKey;
    const url = `${process.env.REACT_APP_BASE_URL}/artist/${queryParams.id}`;
    return await getFetch(url);
};

export const getTopSongs = async ({ queryKey }) => {
    const [, queryParams] = queryKey;
    const url = `${process.env.REACT_APP_BASE_URL}/artist/${queryParams.id}/top`;
    return await getFetch(url);
};

export const getAlbums = async ({ queryKey }) => {
    const [, queryParams] = queryKey;
    const url = `${process.env.REACT_APP_BASE_URL}/artist/${queryParams.id}/albums`;
    return await getFetch(url);
};