import {
   QueryClient,
   QueryClientProvider,
   useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { motion } from 'framer-motion'
import AddCardForm from '../components/AddCardForm'
import Card from '../components/Card'
import Character from '../components/Character'
import ErrorPage from '../components/ErrorPage'
import Loading from '../components/Loading'
import { loader } from '../main'

// const queryClient = new ReactQuery()

export default function ReactQuery() {
   //    return (
   //       <QueryClientProvider client={queryClient}>
   //          <App />
   //          <ReactQueryDevtools initialIsOpen={false} />
   //       </QueryClientProvider>
   //    )
   // }

   // function App() {
   const { isLoading, isError, isSuccess, data } = useQuery({
      queryKey: ['starwars'],
      queryFn: loader,
   })

   if (isError) return <ErrorPage />
   if (isLoading) return <Loading />

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

   return (
      <div>
         <AddCardForm />
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
