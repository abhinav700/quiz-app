import React from 'react';
import {  createBrowserRouter, RouterProvider } from 'react-router-dom';
import Admin from './Components/Admin';
import './App.css'
import User from './Components/User';
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Admin/>,
  },
  {
    path: "/user",
    element: <User/>,
  },
  {
    path:"/",
    element:<div>Hello World</div>
  }
]);
function App() {
  return (
    <>
    {/* <div className="App">
      <h1>Hello world</h1>
    </div> */}
    <RouterProvider router = {router}/>
    </>
  );
}

export default App;
