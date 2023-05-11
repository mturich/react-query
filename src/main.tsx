import axios from 'axios'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import ErrorPage from './components/ErrorPage.tsx'
import './index.css'
import Axios from './pages/Axios.tsx'
import AxiosRouterLoader from './pages/AxiosRouterLoader.tsx'
import Home from './pages/Home.tsx'
import ReactQuery from './pages/ReactQuery.tsx'
import { Data } from './types/LoaderData.ts'

export const loader = async () => {
   await new Promise(resolve => setTimeout(resolve, 100))
   return await axios.get<Data[]>('http://localhost:4001/starwars')
}

const router = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
         {
            path: '/',
            element: <Home />,
         },
         {
            path: '/axios',
            element: <Axios />,
         },
         {
            path: '/axiosLoader',
            loader: loader,
            element: <AxiosRouterLoader />,
         },
         {
            path: '/reactQuery',
            element: <ReactQuery />,
         },
      ],
   },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
)
