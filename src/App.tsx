import { Link, Outlet } from "react-router-dom"


// --------------------------------------------------------------------


function App() {


  return (
    <>
      <div className="inline ">
        <ul className="flex gap-4 m-2 ml-4">
          <li className="hover:underline"><Link to={'/'} > Home</Link></li>
          <li className="hover:underline" ><Link to={`/axios`} >Axios</Link></li>
          <li className="hover:underline" ><Link to={`/axiosLoader`} >Axios Router Loader</Link></li>
          <li className="hover:underline"><Link to={'/reactQuery'} > React Query</Link></li>
        </ul>
      </div>

      <Outlet />
    </>
  )
}

export default App
