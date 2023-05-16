import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useState } from 'react'
import AddCardForm from '../components/AddCardForm'
import Card from '../components/Card'
import Character from '../components/Character'
import ErrorPage from '../components/ErrorPage'
import Loading from '../components/Loading'
import { loader } from '../main'
import { DBPostSchema, DBPostType, Data } from '../types/LoaderData'

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
   const queryClient = useQueryClient()
   const [wasSubmitted, setWasSubmitted] = useState(false)

   const { isLoading, isError, isSuccess, data } = useQuery({
      queryKey: ['starwars'],
      queryFn: async () => {
         return await axios.get<Data[]>(URL)
      },
   })

   const mutation = useMutation({
      mutationFn: (newPost: DBPostType) => {
         return axios.post(URL, newPost)
      },
   })

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const fieldValues = Object.fromEntries(formData.entries())

      const parsed = DBPostSchema.safeParse(fieldValues)
      if (parsed.success === true && 'data' in parsed) {
         mutation.mutate(parsed.data, {
            onSettled: () => {
               queryClient.invalidateQueries({ queryKey: ['starwars'] })
            },
         })
      }
   }
   if (isError) return <ErrorPage />
   if (isLoading) return <Loading />

   return (
      <div>
         <AddCardForm onSubmit={handleSubmit} wasSubmitted={wasSubmitted} />
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
                     </Card>
                  </motion.li>
               ))}
         </motion.ul>
      </div>
   )
}
