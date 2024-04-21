import { useState } from 'react';

import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AuthContext from './context/AuthContext';
//components
import DataProvider from './context/DataProvider';
import Home from './components/home/Home';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Login from './components/account/Login';
import BlogList from './components/postbody/postbody';
import BlogDetails from './components/postbody/BlogDetails';
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated || token ? 
    <>
      <Outlet />
    </> : <Navigate replace to='/account' />
};

function App() {

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isUserAuthenticated, setIsUserAuthenticated }}>
    <DataProvider>
      <BrowserRouter>
        <Box>
          <Routes>
            <Route path='/account' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            
            <Route path='/' >
              <Route path='/' element={<Home />} />
            </Route>
            <Route path="/" element={<BlogList />} />
        <Route path="/posts/:id" element={<BlogDetails />} />


            <Route path='/details/:id' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>

            <Route path='/about' >
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/contact'>
              <Route path='/contact' element={<Contact />} />
            </Route>
            <Route path='/create' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/create' element={<CreatePost />} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
    </AuthContext.Provider>
  );
}

export default App;
