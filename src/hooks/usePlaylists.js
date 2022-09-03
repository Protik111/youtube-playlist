import { useState } from "react"
import getPlaylist from "../api";

const usePlaylists = () => {
    const [state, setState] = useState({
        playlists: {},
        favorites: [],
        recentsPlaylists: []
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true)

    const getPlaylistById = async (playlistId, refresh=false) => {
        if (state.playlists[playlistId] && !refresh) {
            return;
        };

        setLoading(true)

        let results;

        try {
            results = await getPlaylist(playlistId);
            setError('')
        } catch (error) {
            setError(error.response?.data?.error?.message || 'Something went wrong!');
            setLoading(false);
        } finally {
            setLoading(false);
        }


        let cId, cT;

        results = results.map(result => {
            const {
				channelId,
				title,
				description,
				thumbnails: { medium },
				channelTitle,
			} = result.snippet;

            if(!cId) {
                cId = channelId;
            }

            if(!cT) {
                cT = channelTitle;
            }

            return {
				title,
				description,
				thumbnail: medium,
				contentDetails: result.contentDetails,
			};
        })
        setState(prev => ({
            ...prev,
            playlists: {...prev.playlists, [playlistId]: {
                items: results,
                playlistId: playlistId,
                channelId: cId,
                channelTitle: cT
            }}
        }))
    }

    const addToFavorite = (playlistId) => {
        setState(...prev => ({
            ...prev,
            favorites: [...prev, playlistId]
        }))
    }

    const addToRecent = (playlistId) => {
        setState(...prev => ({
            ...prev,
            recentsPlaylists: [...prev, playlistId]
        }))
    }

    const getplayListByIds = (ids = []) => {
        return ids.map(id => state.playlists([id]));
    }

    return {
        playlists: state.playlists,
        favorites: getplayListByIds(state.favorites),
        recentsPlaylists: getplayListByIds(state.recentsPlaylists),
        getPlaylistById,
        addToFavorite,
        addToRecent,
        error,
        loading
    }
};

export default usePlaylists;