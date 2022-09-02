import axios from 'axios';

const key = process.env.REACT_APP_API_KEY;

const getPlaylist = async (playListId, nextPageToken = '', results = []) => {

    const URL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=id,contentDetails,snippet&maxResults=50&playlistId=${playListId}&pageToken=${nextPageToken}`

    const { data } = await axios.get(URL);

    results = [...results, ...data.items]

    if(data.nextPageToken) {
        results = getPlaylist(playListId, data.nextPageToken, results)
    }

    return results;

}

export default getPlaylist;