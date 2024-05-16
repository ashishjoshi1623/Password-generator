import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [password,setPassword] = useState("");
  const [length, setLength] = useState(18);
  const [charAllowed, setCharAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(charAllowed) str += "0123456789"
    if(symbolAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for(let i=0; i<length; i++){
      let charidx = Math.floor(Math.random() * str.length + 1);
      console.log(charidx);
    }
  },[length,charAllowed,symbolAllowed,password])

  return (
    <>
      <section className="password-generator-section">
        <div className="Heading">
          <h1 className="heading-text">Password Generator</h1>
        </div>
        <div className="input-btn mb-3">
          <input type="text" className="password mx-1 rounded p-1" placeholder='Password' value={password}/>
          <button className='btn btn-primary m-1'>copy</button>
        </div>
        <div className="input-check">

          <input type="range" 
          min={6}
          max={99}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          />
          <label className='mx-1' htmlFor="length">Length : {length}</label>

          <input type="checkbox" 
          name="charallowed" 
          id="charallow" 
          value={charAllowed}
          onChange={() => setCharAllowed( (prev) => !prev)}
          className='mx-2'
          />
          <label htmlFor="Char">Character</label>

          <input type="checkbox" 
          name="symbolallowed" 
          id="symbolallow" 
          value={symbolAllowed}
          onChange={() => setSymbolAllowed( (prev) => !prev)}
          className='mx-2'
          />
          <label htmlFor="Char">Symbols</label>
        </div>
        <input type="text" className='mt-3 p-1 rounded-2' placeholder='Paste your password here'/>
      </section>
    </>
  )
}

export default App
