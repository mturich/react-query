import { FormEvent } from 'react'
import { useFetcher } from 'react-router-dom'
import { Data } from '../types/LoaderData'
import Card from './Card'
import Input from './Input'

type FieldNames = keyof Data
const FIELD_NAMES: FieldNames[] = ['name', 'height', 'mass']
type Props = {
   onSubmit: (e: FormEvent<HTMLFormElement>) => void
   wasSubmitted: boolean
}

export default function RouterForm({ onSubmit, wasSubmitted }: Props) {
   const fetcher = useFetcher()

   return (
      <Card>
         <fetcher.Form method='post' onSubmit={e => onSubmit(e)}>
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
         </fetcher.Form>
      </Card>
   )
}
