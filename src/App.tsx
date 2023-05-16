import { Outlet } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'

// --------------------------------------------------------------------

const queryClient = new QueryClient()

function App() {
   return (
      <div className='m-4'>
         <QueryClientProvider client={queryClient}>
            <Navbar />
            <Outlet />
         </QueryClientProvider>
      </div>
   )
}

export default App
