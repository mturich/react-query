import { QueryClient, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLoaderData } from 'react-router-dom'
import AddCardForm from '../components/AddCardForm'
import Card from '../components/Card'
import Character from '../components/Character'
import { useDeleteMutation } from '../components/reactQuery/useDeleteMutation'
import { usePostMutation } from '../components/reactQuery/usePostMutation'
import { Data } from '../types/LoaderData'

//-----------------------------------------------------

const URL_AXIOSROUTER = 'http://localhost:4001/starwars_axiosRouter'

const starwarsQueryFn = async (URL: string) =>
   await axios.get<Data[]>(URL).then(res => res.data)
const starWarsQuery = (URL: string) => ({
   queryKey: [URL],
   queryFn: () => starwarsQueryFn(URL),
})

export const loader = async (queryClient: QueryClient) => {
   const query = starWarsQuery(URL_AXIOSROUTER)
   return await queryClient.ensureQueryData(query)
}

//-----------------------------------------------------

export default function AxiosRouterLoader() {
   const initialData = useLoaderData() as Awaited<ReturnType<typeof loader>>

   console.log('i: ', initialData)
   const { data } = useQuery({
      ...starWarsQuery(URL_AXIOSROUTER),
      initialData,
   })
   console.log(data)
   const handleSubmit = usePostMutation(URL_AXIOSROUTER)
   const handleDelete = useDeleteMutation(URL_AXIOSROUTER)

   return (
      <>
         <AddCardForm onSubmit={handleSubmit} />
         <div className=' grid grid-cols-autofit-200 gap-4'>
            {data &&
               data.map(item => (
                  <Card key={item.id}>
                     <Character item={item} />
                     <button
                        type='button'
                        onClick={() => handleDelete(item)}
                        className='absolute right-2 top-0'>
                        x
                     </button>
                  </Card>
               ))}
         </div>
      </>
   )
}
