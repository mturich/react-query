import { Outlet } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AddCardForm from './components/AddCardForm'
import Navbar from './components/Navbar'

// --------------------------------------------------------------------
export const queryClient = new QueryClient()

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <div className='m-4'>
            <Navbar />
            <AddCardForm />
            <Outlet />
         </div>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   )
}

export default App
