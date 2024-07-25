import { useState } from 'react'
import './App.css'
import {Palette} from "./components/Palette.tsx";
import {Footer} from "./components/Footer.tsx";

function App() {
  return (
    <>
      <Palette />
      <Footer />
    </>
  )
}

export default App
