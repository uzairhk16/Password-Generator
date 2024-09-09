import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharALlowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook - used to give reference of selected components in our page so that 
  // functions can be performed on referenced values

  const passwordRef = useRef(null)

  // useCallback hook -  used for optimization, it calls the function inside it 
  // when the dependencies are changed and returns a memorized function 

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrdtuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "[]}{|,./<>?;':";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password)
  }, [password])

  // useEffect hook -  runs the function inside it whenever the
  //  page renders for the first-time or dependencies are changed

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
        <div
          className="w-full max-w-md mx-auto shadow-md
      rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700"
        >
          <h1 className="text-white text-center my-3">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="password"
              ref={passwordRef}
            />
            <button onClick={copyPasswordToClipboard}
              className="outline-none px-3 py-0.5 shrink-0 
          text-white bg-blue-500"
            >
              Copy
              <i className="mx-2 fa-regular fa-copy"></i>
            </button>
          </div>
          <div className="text-sm flex gap-x-2">
            <div className="flex gap-x-1 items-center">
              <input
                type="range"
                min={6}
                max={50}
                value={length}
                className="cursor-pointer"
                onChange={(e) => { setLength(e.target.value) }}
              />
              <label > Length = {length}</label>
            </div>
            <div className="flex gap-x-1 items-center">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex gap-x-1 items-center">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharALlowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
    </>
  );
}

export default App;
