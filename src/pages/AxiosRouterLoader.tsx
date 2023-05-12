import axios from 'axios'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { queryClient } from '../App'
import AddCardForm from '../components/AddCardForm'
import Card from '../components/Card'
import Character from '../components/Character'
import { getFieldError } from '../helper.ts/helper'
import { loader } from '../main'
import { DBPostSchema, Data, LoaderData } from '../types/LoaderData'

//-----------------------------------------------------

const URL = 'http://localhost:4001/starwars_axiosRouter'
//-----------------------------------------------------

export default function AxiosRouterLoader() {
   const { data } = useLoaderData() as LoaderData<typeof loader>
   const [wasSubmitted, setWasSubmitted] = useState(false)

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
            await axios.post(URL, parsed.data)
            // refetching data
            queryClient.invalidateQueries({ queryKey: ['starwars'] })
         } catch (e) {
            console.log(e)
         }
         setWasSubmitted(true)
      }
   }
   // ------------- Deleting a Character -----------
   const handleDelete = async (item: Data) => {
      try {
         const res = await axios.delete(`${URL}/${item.id}`)
         if (res.status === 200) {
            queryClient.invalidateQueries({ queryKey: ['starwars'] })
         }
      } catch (e) {
         console.log(e)
      }
   }

   return (
      <>
         <AddCardForm onSubmit={handleSubmit} wasSubmitted={wasSubmitted} />
         <div className=' grid grid-cols-autofit-200 gap-4'>
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
