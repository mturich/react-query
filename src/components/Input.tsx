import React, { HTMLProps, useEffect } from 'react'
import { getFieldError } from '../helper.ts/helper'

export default function Input({
   name,
   wasSubmitted,
   setWasSubmitted,
   className,
}: {
   name: string
   wasSubmitted: boolean
   className?: HTMLProps<HTMLElement>['className']
   setWasSubmitted: (val: boolean) => void
}) {
   const [value, setValue] = React.useState('')
   const [touched, setTouched] = React.useState(false)
   const errorMessage = getFieldError(value)
   const displayErrorMessage = (wasSubmitted || touched) && errorMessage

   useEffect(() => {
      if (wasSubmitted === true) {
         setWasSubmitted(false)
         setValue('')
         setTouched(false)
      }
   }, [setWasSubmitted, wasSubmitted])

   return (
      <div key={name} className={className}>
         <label htmlFor={`${name}-input`} className='text-lg'>
            {name}:
         </label>
         {'  '}
         <input
            className='mx-4 rounded-md border border-slate-800 pl-1 text-sm'
            id={`${name}-input`}
            name={name}
            type='text'
            value={value}
            onChange={event => setValue(event.currentTarget.value)}
            onBlur={() => setTouched(true)}
            pattern='[a-zA-Z]{1,50}'
            required
            aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
         />
         {displayErrorMessage ? (
            <span
               role='alert'
               id={`${name}-error`}
               className='error-message font-light text-red-400'>
               {errorMessage}
            </span>
         ) : null}
      </div>
   )
}
