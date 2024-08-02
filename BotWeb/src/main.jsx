import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css'
import Root from "./routes/root.jsx"
import Details from "./routes/details.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <error-page />,
    children: [
      {
        path: "match/:matchId",
        element: <Details />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router ={router}/>
  </React.StrictMode>,
)
