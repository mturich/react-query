import axios from 'axios';
import { useEffect, useState } from 'react';
import ErrorPage from './error-page';

type AsyncState = 'ideal' | 'loading' | 'succeeded' | "failed"
type Data = { "id": number; "name": string; "altName": string }

function App() {
  const [isFetching, setIsFetching] = useState<AsyncState>('ideal')
  const [data, setData] = useState<Data[] | undefined>()

  useEffect(() => {
    const getData = async () => {
      setIsFetching('loading')
      try {
        const res = await axios.get('http://localhost:4000/superheros')
        if (res.statusText === "OK") {
          setIsFetching('succeeded')
          setData(res.data)
        }
      } catch (e) {
        setIsFetching('failed')
      }
    }
    getData()

    return () => { setIsFetching('succeeded') }
  }, [])

  if (isFetching === 'failed') return <ErrorPage />

  return (

    <div className='flex items-center justify-center w-screen '>
      <div >
        {data.map(el => (
          <div className='p-6 m-5 text-center bg-slate-100 rounded-xl '>
            <p>{el.name}</p>
            <p>{el.altName}</p>
          </div>
        ))}
      </div>


    </div>
  )
}

export default App
