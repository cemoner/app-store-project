import {Route, createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import MainLayout from './layouts/MainLayout';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'  element= {<MainLayout />}>
         <Route path='/' index element= {<HomePage />} />
         <Route path='/login' element= {<LoginPage />} />
         <Route path='/admin' element= {<AdminPage />} />
    </Route>
  )
)

function App() {

  return <RouterProvider router={router}/>
}
export default App
