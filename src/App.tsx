import { Link, NavLink, Outlet } from 'react-router-dom'

// --------------------------------------------------------------------

function App() {
   return (
      <>
         <div className='inline '>
            <ul className='m-2 ml-4 flex gap-4'>
               <li className='hover:underline'>
                  <NavLink
                     to={'/'}
                     className={({ isActive }) =>
                        isActive ? 'font-bold' : ''
                     }>
                     Home
                  </NavLink>
               </li>
               <li className='hover:underline '>
                  <NavLink
                     to={`/axios`}
                     className={({ isActive }) =>
                        isActive ? 'font-bold' : ''
                     }>
                     Axios
                  </NavLink>
               </li>
               <li className='hover:underline'>
                  <NavLink
                     to={`/axiosLoader`}
                     className={({ isActive }) =>
                        isActive ? 'font-bold' : ''
                     }>
                     Axios Router Loader
                  </NavLink>
               </li>
               <li className='hover:underline'>
                  <NavLink
                     to={'/reactQuery'}
                     className={({ isActive }) =>
                        isActive ? 'font-bold' : ''
                     }>
                     {' '}
                     React Query
                  </NavLink>
               </li>
            </ul>
         </div>

         <div className='m-4'>
            <form>
               <label htmlFor='personName'>Name</label>
               <input
                  className='ml-4 rounded-lg border border-black'
                  id='personName'
                  type='text'
               />
            </form>
         </div>

         <Outlet />
      </>
   )
}

export default App
