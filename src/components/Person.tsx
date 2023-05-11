import axios from 'axios'
import { queryClient } from '../App'
import { Data } from '../types/LoaderData'

type Props = {
   item: Data
}

export default function Person({ item }: Props) {
   const handleDelete = async () => {
      console.log()
      try {
         const res = await axios.delete(
            `http://localhost:4001/starwars/${item.id}`
         )

         if (res.status === 200) {
            queryClient.invalidateQueries({ queryKey: ['starwars'] })
         }
      } catch (e) {
         console.log(e)
      }
   }
   return (
      <div>
         <p>{item.name}</p>
         <p className='text-sm font-thin'>height: {item.height}</p>
         <p className='text-sm font-thin'>mass: {item.mass}</p>
         <button
            type='button'
            onClick={handleDelete}
            className='absolute right-2 top-0'>
            x
         </button>
      </div>
   )
}
