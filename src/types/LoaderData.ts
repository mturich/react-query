import { LoaderFunction } from 'react-router-dom'
import { z } from 'zod'

export type LoaderData<T extends LoaderFunction> = Awaited<
   ReturnType<T>
> extends Response | infer D
   ? D
   : never

export type AsyncState = 'ideal' | 'loading' | 'succeeded' | 'failed'

export const Person = z.object({
   name: z.string(),
   height: z.string().transform(string => Number(string)),
   mass: z.string().transform(string => Number(string)),
})

export const Schema = z.array(Person)

export type Data = z.infer<typeof Schema>[0]
