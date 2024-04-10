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

            <Route path='/create' >
              <Route path='/create' element={<CreatePost />} />
            </Route>

            <Route path='/details/:id' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>

            <Route path='/about' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/contact' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/contact' element={<Contact />} />
            </Route>
            <Route path='/createpost' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/createpost' element={<create />} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
    </AuthContext.Provider>
  );
}

export default App;
