import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import bcrypt from 'bcryptjs';


function App() {
  const [password,setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [encPass,setEncPass] = useState("");

  const passRef = useRef(null);
  const encryptPassword = useRef(null);
  const encpass = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for(let i=1; i<=length; i++){
      let charidx = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charidx);
    }
    setPassword(pass);
  },[length,charAllowed,numberAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  },[password])

  const copyEncryptPasswordToClipboard = useCallback(() => {
    encpass.current?.select();
    window.navigator.clipboard.writeText(encPass);
  },[encPass])

  const passEncrypt = async() => {
    let pass = encryptPassword.current.value;
    const hash = await bcrypt.hash(pass,10);
    setEncPass(hash);
  }

  useEffect(() => {
    passwordGenerator()
  },[length,charAllowed,numberAllowed,setPassword])

  return (
    <>
      <section className="password-generator-section">
        <div className="Heading">
          <h1 className="heading-text">Password Generator</h1>
        </div>
        <div className="input-btn mb-3">
          <input type="text" 
          className="password mx-1 rounded p-1 input" 
          value={password}
          placeholder='password'
          readOnly
          ref={passRef}
          />
          <button className='btn btn-primary m-1' onClick={copyPasswordToClipboard}>copy</button>
        </div>

        <div className="input-check">

          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label className='mx-1' htmlFor="length">Length : {length}</label>

          <input type="checkbox" 
          name="charallowed" 
          id="charallow" 
          defaultChecked={numberAllowed}
          onChange={() => {setNumberAllowed( (prev) => !prev)}}
          className='mx-2'
          />
          <label htmlFor="Char">Numbers</label>

          <input type="checkbox" 
          id="charallow" 
          defaultChecked={charAllowed}
          onChange={() => {setCharAllowed( (prev) => !prev)}}
          className='mx-2'
          />
          <label htmlFor="Char">Symbols</label>
        </div>

        {/* encryption */}
        <div>
        <input 
        type="text" 
        className='mt-3 p-1 rounded-2 input' 
        placeholder='Paste your password here'
        ref={encryptPassword}
        />
        <button style={{border : '1px solid aqua'}}className='btn btn-dark mx-1' onClick={passEncrypt}>Get Encrypted</button>
        </div>
        <div>
        <input type="text" className='rounded m-3 p-3 input' ref={encpass} defaultValue={encPass} readOnly placeholder='Encrypted password appear here'/>
        <button className='btn btn-primary m-1' onClick={copyEncryptPasswordToClipboard}>copy</button>
        </div>
        
      </section>
    </>
  )
}

export default App
