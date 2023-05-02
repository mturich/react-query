import axios from 'axios'
import { useEffect, useState } from 'react'

type AsyncState = 'ideal' | 'loading' | 'succeeded' | "failed"
type Data = { "id": number; "name": string; "altName": string }

function App() {
  const [isFetching, setIsFetching] = useState<AsyncState>('ideal')
  const [data, setData] = useState<Data[] | undefined>()

  useEffect(() => {
    const getData = async () => {
      setIsFetching('loading')
      try {
        const data = await axios.get('http://localhost:4000/superheros')
        if (data) {
          setIsFetching('succeeded')
          setData(data.data)
        }
      } catch (e) {
        setIsFetching('failed')
      }
    }
    const cancelCall = getData()
    if (isFetching === 'failed') {
      return () => { cancelCall }
    }
  }, [])

  return (

    <div className='w-screen bg-red-500'>
      <div >
        {JSON.stringify(data)}
      </div>


    </div>
  )
}

export default App
