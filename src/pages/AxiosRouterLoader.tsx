import { useLoaderData } from 'react-router-dom'
import Card from '../components/Card'
import Person from '../components/Person'
import { loader } from '../main'
import { LoaderData } from '../types/LoaderData'

export default function AxiosRouterLoader() {
   const { data } = useLoaderData() as LoaderData<typeof loader>

   return (
      <>
         <div className='grid grid-cols-autofit-200 gap-4'>
            {data &&
               data.map(item => (
                  <Card>
                     <Person item={item} />
                  </Card>
               ))}
         </div>
      </>
   )
}
