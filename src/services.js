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
