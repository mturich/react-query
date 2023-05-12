import { Outlet } from 'react-router-dom'

import { QueryClient } from '@tanstack/react-query'
import Navbar from './components/Navbar'

// --------------------------------------------------------------------
export const queryClient = new QueryClient()

function App() {
   return (
      <div className='m-4'>
         <Navbar />
         <Outlet />
      </div>
   )
}

export default App
