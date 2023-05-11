import axios from 'axios'
import React from 'react'
import { queryClient } from '../App'
import { getFieldError } from '../helper.ts/helper'
import { DBPostSchema, Data } from '../types/LoaderData'
import Card from './Card'
import { Input } from './Input'

type FieldNames = keyof Data
const FIELD_NAMES: FieldNames[] = ['name', 'height', 'mass']

export default function AddCardForm() {
   const [wasSubmitted, setWasSubmitted] = React.useState(false)

   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)

      const fieldValues = Object.fromEntries(formData.entries())

      const formIsValid = Object.values(fieldValues).every(
         value => !getFieldError(value as string)
      )

      const parsed = DBPostSchema.safeParse(fieldValues)

      if (parsed.success === true && 'data' in parsed) {
         console.log('parsed data: ', fieldValues, JSON.stringify(fieldValues))
         try {
            // const res = await fetch('http://localhost:4001/starwars', {
            //    method: 'POST',
            //    headers: { 'Content-Type': 'application/json; charset=utf-8' },
            //    body: JSON.stringify(fieldValues),
            // })
            await axios.post('http://localhost:4001/starwars', parsed.data)
            queryClient.invalidateQueries({ queryKey: ['starwars'] })
         } catch (e) {
            console.log(e)
         }

         setWasSubmitted(true)
      }
   }

   return (
      <Card>
         <form noValidate onSubmit={handleSubmit}>
            <div>
               {FIELD_NAMES.map(name => (
                  <Input
                     className='my-2'
                     key={name}
                     name={name}
                     wasSubmitted={wasSubmitted}
                  />
               ))}
            </div>
            <button
               // disabled={!formIsValid}
               type='submit'
               className='rounded-2xl border border-black bg-white px-4 py-1 disabled:border-gray-200 disabled:text-gray-200'>
               Add
            </button>
         </form>
      </Card>
   )
}
