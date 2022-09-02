import { useEffect } from "react";
import getPlaylist from "./api";

function App() {

  useEffect(() => {
    getPlaylist('PLz7pe8Pn1W3mzBfUwNhqzTeYC0_pNhj1P')
    .then(res => console.log(res))
  }, [])


  return (
    <div>
      
    </div>
  );
}

export default App;
