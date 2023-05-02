import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (

    <>
      <div className='flex justify-center items-center'>
        hello {count}
      </div>

      <button onClick={() => setCount(prev => prev + 1)}>Count</button>
    </>
  )
}

export default App
