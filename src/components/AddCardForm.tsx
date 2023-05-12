import { FormEvent } from 'react'
import { Data } from '../types/LoaderData'
import Card from './Card'
import Input from './Input'

type FieldNames = keyof Data
const FIELD_NAMES: FieldNames[] = ['name', 'height', 'mass']
type Props = {
   onSubmit: (e: FormEvent<HTMLFormElement>) => void
   wasSubmitted: boolean
}

export default function AddCardForm({ onSubmit, wasSubmitted }: Props) {
   return (
      <Card>
         <form noValidate onSubmit={e => onSubmit(e)}>
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
