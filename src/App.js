import { Routes, Route } from 'react-router'
import './App.css'
import { useState } from 'react'

// components

import Main from './main'
import LoginPage from './components/login/Login-page'


const App = () => {

  const [auth, setAuth] = useState(false)

  return(
    <Routes>

      <Route path={'/'} element={<LoginPage isAuth={{auth, setAuth}}></LoginPage>}></Route>
      <Route path={'/main/*'} element={<Main isAuth={{auth, setAuth}}></Main>}></Route>


    </Routes>



  )
}


export default App