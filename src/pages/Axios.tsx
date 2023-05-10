import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import ErrorPage from '../components/ErrorPage'
import Loading from '../components/Loading'
import Person from '../components/Person'
import { AsyncState, Data, Schema } from '../types/LoaderData'

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function Axios() {
   const [isFetching, setIsFetching] = useState<AsyncState>('ideal')
   const [data, setData] = useState<Data[] | undefined>()

   useEffect(() => {
      const controller = new AbortController()

      const getData = async () => {
         setIsFetching('loading')
         try {
            await new Promise(resolve => setTimeout(resolve, 100))
            const res = await axios.get('http://localhost:4001/starwars', {
               signal: controller.signal,
            })
            if (res.statusText === 'OK') {
               const parsed = Schema.parse(res.data)
               setIsFetching('succeeded')
               setData(parsed)
            }
         } catch (e) {
            setIsFetching('failed')
         }
      }
      getData()

      return () => {
         //  controller.abort()
         setIsFetching('succeeded')
      }
   }, [])

   //localhost:5174/

   http: if (isFetching === 'loading') return <Loading />
   if (isFetching === 'failed') return <ErrorPage />

   return (
      <>
         <div className='grid grid-cols-autofit-200 gap-4'>
            {data &&
               data.map(item => (
                  <Card>
                     <Person item={item} />
                  </Card>
               ))}
         </div>
      </>
   )
}

export default Axios
