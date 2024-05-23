import { useState } from 'react';
import './App.css';
import Button from './components/Button';
import usePasswordGenerator from "./hooks/use-password-generator"
import Checkbox from './components/Checkbox';



function App() {

  const [length, setLength] = useState(5);
  const [checkboxData, setCheckboxData] = useState([
    {title:"Include Uppercase Letters", state:false},
    {title:"Include Lowercase Letters", state:false},
    {title:"Include Numbers", state:false},
    {title:"Include Symbols", state:false},
  ])

  const [copied, setCopied] = useState(false); 

  const handleCheckboxChange = (index)=>{
    const updatedCheckboxData = [...checkboxData]
    updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
    setCheckboxData(updatedCheckboxData)
  }

  const handleCopy = ()=>{
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(()=>{
      setCopied(false)
    },1000)

  }

   const {password,errorMessage,generatePassword, previousPasswords} = usePasswordGenerator();

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="bg-richblack-900 text-white p-10 rounded-lg m-4">
        <h1 className="text-3xl font-inter border-b pb-3">Random Password Generator 🔐</h1>
        {/* Password text and copy button */}
        {password && (<div className='flex justify-between mt-5 gap-2 items-center'>
          <div className='border p-2 w-full rounded-md'>{password}</div>
          <Button onClick={handleCopy} text={copied ? "Copied" : "Copy"}/>
        </div>)}
        {/* character length */}
        <div className='flex flex-col justify-between mt-5'>
          <span className='flex justify-between mb-4'>
            <label>Character Length</label>
            <label>{length}</label>
          </span>
          <input 
            type='range'
            min='4'
            max='20'
            value={length}
            onChange={(e)=> setLength(e.target.value)}
          />
        </div>
        {/* characters */}
        <div className='mt-4 mb-6 grid grid-cols-2 gap-3'>
          {
            checkboxData.map((checkBox, index)=>(
              <Checkbox 
                key={index} 
                title = {checkBox.title}
                state = {checkBox.state}
                onChange = {()=>handleCheckboxChange(index)}

              />
            ))
          }
        </div>
        {/* Error Message */}
        {errorMessage && 
          <div className="mb-4 text-red-300 font-bold text-base">
            {errorMessage}
          </div>
        }
        {/* generate button */}
        <Button onClick={()=>generatePassword(checkboxData, length)} text={"GENERATE PASSWORD"}/>

        {/* Save previous password */}
        {previousPasswords.length > 0 && (
          <div className='mt-8'>
            <h2 className="text-2xl font-inter border-b pb-3">Last 5 Passwords</h2>
            <ul className="list-none pl-4 mt-3 space-y-2 mr-3">
              {previousPasswords.map((pwd, index) => (
                <li 
                  key={index} 
                  className="mt-1 bg-yellow-200 p-2 rounded-md shadow-md hover:bg-yellow-700 transition-all duration-300 text-center"
                >
                  {pwd}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
