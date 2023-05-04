import React from 'react'
import { useRoutes } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ArriveFlight from '../pages/ArriveFlight';
import NotFound from '../pages/NotFound';
import DepartFlight from '../pages/DepartFlight';


const Routes = () => {
    const elements = useRoutes([
            {
                children:[
                    {
                        path:'/',
                        element: <Login />
                    }
                ]
            },
            {
              children:[
                {
                  element:<Dashboard />,
                  children:[
                    {
                      path:'/dashboard/arriveflights',
                      element:<ArriveFlight />
                    },
                    {
                      path:'/dashboard/departflights',
                      element:<DepartFlight />
                    }
                  ]
                }
              ]
            },

            {
              children:[
                {
                  path:'*',
                  element:<NotFound />
                }
              ]
            }
    ])

  return (
    elements
  )
}

export default Routes;