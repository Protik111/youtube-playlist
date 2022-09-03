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