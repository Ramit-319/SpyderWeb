import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import Notes from './components/Notes';
import Login from './components/Login';


function App() {

  const [isLogin, setIsLogin] = useState(false)

  useEffect(()=> {
    const checkLogin = async () => {
      const token = localStorage.getItem('tokenStore')
      if(token){
        const verified = await Axios.get('/users/verify', {
          headers: {Authorization: token}
        })
        console.log(verified)
        setIsLogin(verified.data)
        if(verified.data === false) return localStorage.clear()

      }else{
        setIsLogin(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <div className="App">
      {
        isLogin 
        ? <Notes setIsLogin={setIsLogin}/> 
        : <Login setIsLogin={setIsLogin}/>
      }
    </div>
  );
}

export default App;
