import { Outlet } from 'react-router-dom'

import { QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'
import { queryClient } from './main'

// --------------------------------------------------------------------

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
