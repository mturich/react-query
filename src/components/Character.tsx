import { Data } from '../types/LoaderData'

type Props = {
   item: Data
}

export default function Character({ item }: Props) {
   return (
      <div>
         <p>{item.name}</p>
         <p className='text-sm font-thin'>height: {item.height}</p>
         <p className='text-sm font-thin'>mass: {item.mass}</p>
      </div>
   )
}
