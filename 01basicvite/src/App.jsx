import { useState } from 'react'

import Youtube from './youtube'


function App() {
  const username = "Srikar Reddy Anuga"

  return (
    <>
    <h1>Vite React App {2+2}</h1>
    <h1>Vite React App {username}</h1>
    <Youtube/>
    </>
  )
}

export default App
