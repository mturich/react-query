import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import ErrorPage from './components/ErrorPage.tsx'
import './index.css'
import Axios from './pages/Axios.tsx'
import AxiosRouterLoader, { loader } from './pages/AxiosRouterLoader.tsx'
import Home from './pages/Home.tsx'
import ReactQuery from './pages/ReactQuery.tsx'

export const queryClient = new QueryClient()

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
            path: '/reactQuery',
            element: (
               <>
                  <ReactQuery />
                  <ReactQueryDevtools initialIsOpen={false} />
               </>
            ),
         },
         {
            path: '/axiosRouteLoader',
            loader: async () => await loader(queryClient),
            element: (
               <>
                  <AxiosRouterLoader />
                  <ReactQueryDevtools initialIsOpen={false} />
               </>
            ),
         },
      ],
   },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
)
