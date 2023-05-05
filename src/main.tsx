import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import Axios from './components/Axios.tsx';
import AxiosRouterLoader from './components/AxiosRouterLoader.tsx';
import Home from './components/Home.tsx';
import ReactQuery from './components/ReactQuery.tsx';
import ErrorPage from './components/error-page.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/axios',
        element: <Axios />
      },
      {
        path: '/axiosLoader',
        loader: () => { return null },
        element: <AxiosRouterLoader />
      },
      {
        path: '/reactQuery',
        element: <ReactQuery />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
