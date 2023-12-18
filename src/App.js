import { Routes, Route } from 'react-router'
import './App.css'
import { useState } from 'react'

// components

import Main from './main'
import LoginPage from './components/login/Login-page'


const App = () => {

  const [auth, setAuth] = useState(false)
  const [authEmail, setAuthEmail] = useState('')

  return(
    <Routes>

      <Route path={'/'} element={<LoginPage authEmailLog={{authEmail, setAuthEmail}}  isAuth={{auth, setAuth}}></LoginPage>}></Route>
      <Route path={'/main/*'} element={<Main authEmailLog={{authEmail, setAuthEmail}} isAuth={{auth, setAuth}}></Main>}></Route>


    </Routes>



  )
}


export default App