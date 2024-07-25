import { useState } from 'react'
import './App.css'
import {Palette, ActiveColorContext} from "./components/Palette.tsx";
import {Footer} from "./components/Footer.tsx";

function App() {
  const [currentActiveColor, setCurrentActiveColor] = useState<number>(-1);
  return (
    <ActiveColorContext.Provider value={currentActiveColor}>
      <Palette setActiveColorContext={setCurrentActiveColor}/>
      <Footer />
    </ActiveColorContext.Provider>
  )
}

export default App
