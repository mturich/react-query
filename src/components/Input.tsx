import React, { HTMLProps } from 'react'
import { getFieldError } from '../helper.ts/helper'

export function Input({
   name,
   wasSubmitted,
   className,
}: {
   name: string
   wasSubmitted: boolean
   className?: HTMLProps<HTMLElement>['className']
}) {
   const [value, setValue] = React.useState('')
   const [touched, setTouched] = React.useState(false)
   const errorMessage = getFieldError(value)
   const displayErrorMessage = (wasSubmitted || touched) && errorMessage
   return (
      <div key={name} className={className}>
         <label htmlFor={`${name}-input`}>{name}:</label>{' '}
         <input
            className='mx-4 rounded-md border border-black'
            id={`${name}-input`}
            name={name}
            type='text'
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
