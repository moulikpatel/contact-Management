import React from 'react'
import Form from './components/Form'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Contacts from './components/Contacts'

const App = () => {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Form/>

    },
    {
      path:'/contacts',
      element:<Contacts/>
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App