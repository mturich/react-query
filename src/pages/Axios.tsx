import axios from 'axios'
import { useEffect, useState } from 'react'
import { queryClient } from '../App'
import { AddCardForm, Card, Character, ErrorPage, Loading } from '../components'
import { getFieldError } from '../helper.ts/helper'
import { AsyncState, DBPostSchema, Data, Schema } from '../types/LoaderData'
// ----------------------------------------------------------------------

const URL = 'http://localhost:4001/starwars_axios'
// ----------------------------------------------------------------------

function Axios() {
   const [isFetching, setIsFetching] = useState<AsyncState>('ideal')
   const [data, setData] = useState<Data[]>()
   const [revalidate, setRevalidate] = useState(false)
   const [wasSubmitted, setWasSubmitted] = useState(false)

   // ------------- Fetching Character with the first load -----------
   useEffect(() => {
      const controller = new AbortController()

      const getData = async () => {
         setIsFetching('loading')
         try {
            const res = await axios.get(URL, {
               signal: controller.signal,
            })

            if (res.statusText === 'OK') {
               const parsed = Schema.parse(res.data)
               setIsFetching('succeeded')
               setData(parsed)
               setRevalidate(false)
               setWasSubmitted(false)
            }
         } catch (e) {
            setIsFetching('failed')
         }
      }
      // triggers a revalidation after a post was pushed
      if (revalidate === true || isFetching === 'ideal') {
         getData()
      }

      return () => {
         // controller.abort()
         setIsFetching('succeeded')
      }
   }, [isFetching, revalidate])

   // ------------- Adding a Character with the first load -----------
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const fieldValues = Object.fromEntries(formData.entries())
      const formIsValid = Object.values(fieldValues).every(
         value => !getFieldError(value as string)
      )

      const parsed = DBPostSchema.safeParse(fieldValues)
      if (parsed.success === true && 'data' in parsed) {
         try {
            // const res = await fetch('http://localhost:4001/starwars', {
            //    method: 'POST',
            //    headers: { 'Content-Type': 'application/json; charset=utf-8' },
            //    body: JSON.stringify(fieldValues),
            // })
            await axios.post(URL, parsed.data)
            // refetching data
            setRevalidate(true)
            setWasSubmitted(true)
            queryClient.invalidateQueries({ queryKey: ['starwars'] })
         } catch (e) {
            console.log(e)
         }
      }
   }
   // ------------- Deleting a Character with the first load -----------
   const handleDelete = async (item: Data) => {
      try {
         const res = await axios.delete(`${URL}/${item.id}`)
         setRevalidate(true)
         if (res.status === 200) {
            queryClient.invalidateQueries({ queryKey: ['starwars'] })
         }
      } catch (e) {
         console.log(e)
      }
   }

   if (isFetching === 'loading') return <Loading />
   if (isFetching === 'failed') return <ErrorPage />

   return (
      <>
         <AddCardForm onSubmit={handleSubmit} wasSubmitted={wasSubmitted} />
         <div className='grid grid-cols-autofit-200 gap-4'>
            {data &&
               data.map(item => (
                  <Card key={item.id}>
                     <Character item={item} />
                     <button
                        type='button'
                        onClick={() => handleDelete(item)}
                        className='absolute right-2 top-0'>
                        x
                     </button>
                  </Card>
               ))}
         </div>
      </>
   )
}
export default Axios
