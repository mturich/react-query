import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Card from './components/Card'
import { Input } from './components/Input'

import { getFieldError } from './helper.ts/helper'
import { Data, Person } from './types/LoaderData'

// --------------------------------------------------------------------

type FieldNames = keyof Data
const FIELD_NAMES: FieldNames[] = ['name', 'height', 'mass']

function App() {
   const [wasSubmitted, setWasSubmitted] = React.useState(false)
   const [formIsValid, setFormIsValid] = React.useState(false)

   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const fieldValues = Object.fromEntries(formData.entries())

      const formIsValid = Object.values(fieldValues).every(
         value => !getFieldError(value as string)
      )
      setFormIsValid(formIsValid)
      if (formIsValid) {
         setWasSubmitted(true)
         console.log(`Form Submitted`, fieldValues)
         const parsed = Person.parse(fieldValues)
         console.log(parsed)
      }
   }

   return (
      <div className='m-4'>
         <nav className='inline '>
            <ul className='m-2 ml-4 flex gap-4'>
               <li className='hover:underline'>
                  <NavLink
                     to={'/'}
                     className={({ isActive }) =>
                        isActive ? 'font-bold' : ''
                     }>
                     Home
                  </NavLink>
               </li>
               <li className='hover:underline '>
                  <NavLink
                     to={`/axios`}
                     className={({ isActive }) =>
                        isActive ? 'font-bold' : ''
                     }>
                     Axios
                  </NavLink>
               </li>
               <li className='hover:underline'>
                  <NavLink
                     to={`/axiosLoader`}
                     className={({ isActive }) =>
                        isActive ? 'font-bold' : ''
                     }>
                     Axios Router Loader
                  </NavLink>
               </li>
               <li className='hover:underline'>
                  <NavLink
                     to={'/reactQuery'}
                     className={({ isActive }) =>
                        isActive ? 'font-bold' : ''
                     }>
                     {' '}
                     React Query
                  </NavLink>
               </li>
            </ul>
         </nav>

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

         <Outlet />
      </div>
   )
}

export default App
