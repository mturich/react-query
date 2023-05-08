import {
   QueryClient,
   QueryClientProvider,
   useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Card from '../components/Card'
import ErrorPage from '../components/ErrorPage'
import Loading from '../components/Loading'
import { loader } from '../main'

const queryClient = new QueryClient()

export default function ReactQuery() {
   return (
      <QueryClientProvider client={queryClient}>
         <App />
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   )
}

function App() {
   const { isLoading, isError, isSuccess, data } = useQuery({
      queryKey: ['starwars'],
      queryFn: loader,
   })

   if (isError) return <ErrorPage />
   if (isLoading) return <Loading />

   return (
      <div className='m-4 grid grid-cols-autofit-200 gap-4'>
         {isSuccess &&
            data.data.map(item => <Card key={item.name} item={item} />)}
      </div>
   )
}
