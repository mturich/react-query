import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Data } from '../../types/LoaderData'

const useDeleteMutation = (URL: string) => {
   const queryClient = useQueryClient()
   const mutation = useMutation({
      mutationFn: (item: Data) => axios.delete(`${URL}/${item.id}`),
   })

   const handleDelete = (item: Data) => {
      mutation.mutate(item, {
         onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['starwars'] })
         },
      })
   }

   return handleDelete
}

export { useDeleteMutation }
