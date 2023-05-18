import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { motion } from 'framer-motion'
import AddCardForm from '../components/AddCardForm'
import Card from '../components/Card'
import Character from '../components/Character'
import ErrorPage from '../components/ErrorPage'
import Loading from '../components/Loading'
import { useDeleteMutation } from '../components/reactQuery/useDeleteMutation'
import { usePostMutation } from '../components/reactQuery/usePostMutation'
import { Data } from '../types/LoaderData'

const URL = 'http://localhost:4001/starwars_reactQuery'

const list = {
   visible: {
      opacity: 1,
      transition: {
         when: 'beforeChildren',
         staggerChildren: 0.2,
         damping: 10,
         stiffness: 10,
      },
   },
   hidden: { opacity: 0 },
}

const motionItem = {
   visible: { opacity: 1, x: 0 },
   hidden: { opacity: 0, x: -10 },
}
export default function ReactQuery() {
   const { isLoading, isError, isSuccess, data } = useQuery({
      queryKey: [URL],
      queryFn: async () => await axios.get<Data[]>(URL),
   })
   const handleSubmit = usePostMutation(URL)
   const handleDelete = useDeleteMutation(URL)

   if (isError) return <ErrorPage />
   if (isLoading) return <Loading />

   return (
      <div>
         <AddCardForm onSubmit={handleSubmit} />
         <motion.ul
            initial='hidden'
            animate='visible'
            variants={list}
            className='grid grid-cols-autofit-200 gap-4'>
            {isSuccess &&
               data.data.map(item => (
                  <motion.li variants={motionItem} key={item.id}>
                     <Card>
                        <Character item={item} />
                        <button
                           type='button'
                           onClick={() => handleDelete(item)}
                           className='absolute right-2 top-0'>
                           x
                        </button>
                     </Card>
                  </motion.li>
               ))}
         </motion.ul>
      </div>
   )
}
