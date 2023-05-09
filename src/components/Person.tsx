import { Data } from '../pages/Axios'

type Props = {
   item: Data
}

export default function Person({ item }: Props) {
   return (
      <>
         <p>{item.name}</p>
         <p className='text-sm font-thin'>height: {item.height}</p>
         <p className='text-sm font-thin'>mass: {item.mass}</p>
      </>
   )
}
