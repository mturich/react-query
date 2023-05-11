import { Outlet } from 'react-router-dom'

import Navbar from './components/Navbar'
import AddCardForm from './components/AddCardForm'

// --------------------------------------------------------------------

function App() {
   return (
      <div className='m-4'>
         <Navbar />
         <AddCardForm />
         <Outlet />
      </div>
   )
}

export default App
