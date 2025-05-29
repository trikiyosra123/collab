import React from 'react';

import Login from "./components/Login"
import { useStateValue } from "./StateProvider";
import Home from "./Page/Home"


function App() {
    const [{ user }] = useStateValue();

    if (!JSON.parse(localStorage.getItem("playlist"))) {
        localStorage.setItem("playlist", JSON.stringify([]));
    }

    return (
        <div className="App">
            {!user ? (<Login/>) : (<Home />)}
        </div>
    );
}

export default App;
