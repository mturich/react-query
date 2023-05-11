import { LoaderFunction } from 'react-router-dom'
import { z } from 'zod'

export type LoaderData<T extends LoaderFunction> = Awaited<
   ReturnType<T>
> extends Response | infer D
   ? D
   : never

export type AsyncState = 'ideal' | 'loading' | 'succeeded' | 'failed'

export const PersonSchema = z.object({
   id: z.number(),
   name: z.string(),
   height: z.string().transform(string => Number(string)),
   mass: z.string().transform(string => Number(string)),
})

export const DBPostSchema = z.object({
   name: z.string(),
   height: z.string(),
   mass: z.string(),
})

export const Schema = z.array(PersonSchema)

export type Data = z.infer<typeof Schema>[0]
