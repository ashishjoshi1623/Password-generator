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
  const [salt,setSalt] = useState(1);

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
    const hash = await bcrypt.hash(pass,salt);
    setEncPass(hash);
  }

  useEffect(() => {
    passwordGenerator()
  },[length,charAllowed,numberAllowed,setPassword])

  return (
    <>
      <section className="password-generator-section">
        <div className="Heading">
          <h1 className="heading-text">Password Generator & Encrypter</h1>
        </div>
        <div className="input-btn m-2">
          <input type="text" 
          className="password mx-1 rounded p-1 input" 
          value={password}
          placeholder='password'
          readOnly
          ref={passRef}
          />
          <button className='btn btn-primary m-1' onClick={copyPasswordToClipboard}>copy</button>
        </div>

        <div className="input-check m-2">

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
        <div className='m-2'>
        <input 
        type="text" 
        className='mt-3 p-1 rounded-2 input' 
        placeholder='Paste your password here'
        ref={encryptPassword}
        />
        </div>
        <div className='m-2'>
        <label htmlFor="saltround">encryption level :</label>
        <select name="salt" id="salt" className='m-2 rounded p-1'>
          <option value="1" onChange={e => setSalt(e.target.value)}>1</option>
          <option value="2" onChange={e => setSalt(e.target.value)}>2</option>
          <option value="3" onChange={e => setSalt(e.target.value)}>4</option>
          <option value="5" onChange={e => setSalt(e.target.value)}>5</option>
          <option value="6" onChange={e => setSalt(e.target.value)}>6</option>
          <option value="7" onChange={e => setSalt(e.target.value)}>7</option>
          <option value="8" onChange={e => setSalt(e.target.value)}>8</option>
          <option value="9" onChange={e => setSalt(e.target.value)}>9</option>
          <option value="10" onChange={e => setSalt(e.target.value)}>10</option>
        </select>
        <button style={{border : '1px solid aqua'}}className='btn btn-dark mx-1' onClick={passEncrypt}>Get Encrypted</button>
        </div>
        <div className='m-3'>
        <input type="text" className='rounded m-1 p-3 input' ref={encpass} defaultValue={encPass} readOnly placeholder='Encrypted password appear here'/>
        <button className='btn btn-primary' onClick={copyEncryptPasswordToClipboard}>copy</button>
        </div>
        
      </section>
    </>
  )
}

export default App
