import { LoaderFunction } from 'react-router-dom'
import { z } from 'zod'

export type LoaderData<T extends LoaderFunction> = Awaited<
   ReturnType<T>
> extends Response | infer D
   ? D
   : never

export type AsyncState = 'ideal' | 'loading' | 'succeeded' | 'failed'

export const CharacterSchema = z.object({
   id: z.number(),
   name: z.string(),
   height: z.number(),
   mass: z.number(),
})

export const DBPostSchema = z.object({
   name: z.string(),
   height: z
      .string()
      .transform(string => (isNaN(Number(string)) ? 0 : Number(string))),
   mass: z
      .string()
      .transform(string => (isNaN(Number(string)) ? 0 : Number(string))),
})

export const Schema = z.array(CharacterSchema)

export type Data = z.infer<typeof Schema>[0]
