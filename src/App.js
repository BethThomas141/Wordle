import './App.css';
import {useEffect, useState} from "react";
import RowGrid from "./Components/RowGrid/RowGrid";


function App() {
  const [showLavalamps, setShowLavalamps] = useState(null);
  return (
    <div className="App">
      <header className={`App-header ${showLavalamps ? "show-lavalamps" : ""}`}>
        <RowGrid showLavalamps={showLavalamps} setShowLavalamps={setShowLavalamps}/>
      </header>
    </div>
  );
}

export default App;
