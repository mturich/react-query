import { LoaderFunction } from 'react-router-dom'

export type LoaderData<T extends LoaderFunction> = Awaited<
   ReturnType<T>
> extends Response | infer D
   ? D
   : never
