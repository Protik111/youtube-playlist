import { useEffect } from "react";
import getPlaylist from "./api";
import usePlaylists from "./hooks/usePlaylists";
import Navbar from "./components/navbar";
import { Grid, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import PlaylistCardItem from './components/playlist-card-item';

function App() {

  const { getPlaylistById, playlists, error, loading } = usePlaylists();

  // useEffect(() => {
  //   getPlaylistById('PL0vfts4VzfNiI1BsIK5u7LpPaIDKMJIDN')
  //   // .then(res => console.log(res))
  // }, [])

  // console.log(playlists, 'playlists');
  // console.log(error, loading);

  const playlistArray = Object.values(playlists);


  return (
    <>
      <CssBaseline></CssBaseline>
      <Navbar getPlaylistById={getPlaylistById}></Navbar>

      {playlistArray.length > 0 && (
        <Grid container alignItems='stretch'>
          {playlistArray.map((item, i) => (
            <Grid item xs={12} md={6} lg={4} mb={2} key={i}>
              <PlaylistCardItem
                key={item.id}
                playlistThumbnail={item.playlistThumbnail}
                playlistTitle={item.playlistTitle}
                channelTitle={item.channelTitle}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default App;
