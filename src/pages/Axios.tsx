import axios from 'axios'
import { useEffect, useState } from 'react'
import z from 'zod'
import Card from '../components/Card'
import ErrorPage from '../components/ErrorPage'
import Loading from '../components/Loading'
// ----------------------------------------------------------------------

type AsyncState = 'ideal' | 'loading' | 'succeeded' | 'failed'

const schema = z.array(
   z.object({
      name: z.string(),
      height: z.string().transform(string => Number(string)),
      mass: z.string().transform(string => Number(string)),
   })
)

export type Data = z.infer<typeof schema>[0]
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
               const parsed = schema.parse(res.data)
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
         <div className='m-4 grid grid-cols-autofit-200 gap-4'>
            {data && data.map(item => <Card key={item.name} item={item} />)}
         </div>
      </>
   )
}

export default Axios
