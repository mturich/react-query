import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { DBPostSchema, DBPostType } from '../../types/LoaderData'

const usePostMutation = (URL: string) => {
   const queryClient = useQueryClient()
   const mutation = useMutation({
      mutationFn: (newPost: DBPostType) => axios.post(URL, newPost),
   })

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const fieldValues = Object.fromEntries(formData.entries())

      const parsed = DBPostSchema.safeParse(fieldValues)
      if (parsed.success === true && 'data' in parsed) {
         mutation.mutate(parsed.data, {
            onSettled: () => {
               queryClient.invalidateQueries({ queryKey: [URL] })
            },
         })
      }
   }
   return handleSubmit
}

export { usePostMutation }
