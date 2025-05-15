import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Home from '../Components/Home/Home';
import About from '../Components/About/About';
import Tvshows from '../Components/Tvshows/Tvshows';
import Movies from '../Components/Movies/Movies';
import Details from '../Components/Details/Details';
import People from '../Components/People/People';
import Notfound from '../Components/Notfound/Notfound';
import Register from '../Components/Register/Register';
import Login from '../Components/Login/Login';
import { Routes, Route, useNavigate } from 'react-router-dom';

export default function App() {

  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState('');
  let navigate = useNavigate();

  function saveUserData() {
    let userToken = localStorage.getItem('userToken');
    setUserData(userToken);
    // Decode the token to get user name
    try {
      const tokenData = JSON.parse(atob(userToken.split('.')[1]));
      setUserName(tokenData.name || '');
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  function logout() {
    localStorage.removeItem('userToken');
    setUserData(null);
    setUserName('');
    navigate('./login');
  }

  useEffect(() => {
    if (localStorage.getItem('userToken') != null) {
      saveUserData();
    }
  }, []);

  return (
    <>
      <Navbar userData={userData} userName={userName} logout={logout} />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='home' element={<Home />}></Route>
        <Route path='movies' element={<Movies />}></Route>
        <Route path='about' element={<About />}></Route>
        <Route path='tvshows' element={<Tvshows />}></Route>
        <Route path='details' element={<Details />}></Route>
        <Route path='people' element={<People />}></Route>
        <Route path='login' element={<Login saveUserData={saveUserData} />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='*' element={<Notfound />}></Route>
      </Routes>
    </>
  )
}
