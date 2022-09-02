import { useEffect } from "react";
import getPlaylist from "./api";
import usePlaylists from "./hooks/usePlaylists";

function App() {

  const { getPlaylistById, playlists } = usePlaylists();

  useEffect(() => {
    getPlaylistById('PL0vfts4VzfNiI1BsIK5u7LpPaIDKMJIDN')
    // .then(res => console.log(res))
  }, [])

  console.log(playlists, 'playlists')


  return (
    <div>
      
    </div>
  );
}

export default App;
