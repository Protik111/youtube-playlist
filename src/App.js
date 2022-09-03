import { useEffect } from "react";
import getPlaylist from "./api";
import usePlaylists from "./hooks/usePlaylists";
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from "./components/navbar";

function App() {

  const { getPlaylistById, playlists, error, loading } = usePlaylists();

  // useEffect(() => {
  //   getPlaylistById('PL0vfts4VzfNiI1BsIK5u7LpPaIDKMJIDN')
  //   // .then(res => console.log(res))
  // }, [])

  console.log(playlists, 'playlists');
  console.log(error, loading);


  return (
    <>
      <CssBaseline></CssBaseline>
      <Navbar getPlaylistById={getPlaylistById}></Navbar>
    </>
  );
}

export default App;
