import { useEffect, useState } from "react"
import getPlaylist from "../api";
import storage from "../utils/Storage";

const storageKey = 'yt_playlist';
const initState = {
    playlists: {},
    favorites: [],
    recentsPlaylists: []
};


const usePlaylists = () => {
    const [state, setState] = useState(initState);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedState = storage.get(storageKey);

        if(savedState) {
            setState({ ...savedState })
        }
    }, []);

    useEffect(() => {
        if(state !== initState) {
            storage.save(storageKey, state)
        }
    }, [state])

    const getPlaylistById = async (playlistId, refresh=false) => {
        if (state.playlists[playlistId] && !refresh) {
            return;
        };

        setLoading(true)

        let results;

        try {
            const playlist = await getPlaylist(playlistId);
			setError('');
			setState((prev) => ({
				...prev,
				playlists: {
					...prev.playlists,
					[playlistId]: playlist,
				},
            }));
        } catch (e) {
			setError(
				e.response?.data?.error?.message || 'Something went wrong'
			);
		} finally {
			setLoading(false);
		}
    };

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