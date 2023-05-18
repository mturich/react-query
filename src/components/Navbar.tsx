import { NavLink } from 'react-router-dom'

export default function Navbar() {
   return (
      <nav className='inline '>
         <ul className='m-2 ml-4 flex gap-4'>
            <li className='hover:underline'>
               <NavLink
                  to={'/'}
                  className={({ isActive }) => (isActive ? 'font-bold' : '')}>
                  Home
               </NavLink>
            </li>
            <li className='hover:underline '>
               <NavLink
                  to={`/axios`}
                  className={({ isActive }) => (isActive ? 'font-bold' : '')}>
                  Axios
               </NavLink>
            </li>
            <li className='hover:underline'>
               <NavLink
                  to={'/reactQuery'}
                  className={({ isActive }) => (isActive ? 'font-bold' : '')}>
                  {' '}
                  React Query
               </NavLink>
            </li>
            <li className='hover:underline'>
               <NavLink
                  to={`/axiosRouteLoader`}
                  className={({ isActive }) => (isActive ? 'font-bold' : '')}>
                  Axios Router Loader
               </NavLink>
            </li>
         </ul>
      </nav>
   )
}
