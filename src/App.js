import { Routes, Route } from 'react-router'
import './App.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// redux

import { useSelector, useDispatch } from 'react-redux'
import { createUser, getUsers} from './store/userSlice'

// firebase

import app from './firebaseApp'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, addDoc, collection  } from 'firebase/firestore'


// components

import Main from './main'
import LoginPage from './components/login/Login-page'
import Registration from './components/login/Registration'


const App = () => {


  const navigate = useNavigate()
  const db = getFirestore(app)


  // redux

  const users = useSelector(state => state.users.users)
  const dispatch = useDispatch()


  useEffect (() => {
    dispatch(getUsers())

  }, [])

  const [auth, setAuth] = useState(false)
  const [authEmail, setAuthEmail] = useState('')


  const [registrationUser, setRegistrationUser] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    tgId: ''
  })




  const createNewUser = () => {

    try {

      if(registrationUser.email === '' || registrationUser.password === '' || registrationUser.name === '' || registrationUser.lastName === '' || registrationUser.tgId === '') {
        alert('Заполните все поля')
        return
      }
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, registrationUser.email, registrationUser.password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
        alert('User created successfully')

        dispatch(createUser(registrationUser))
        setRegistrationUser({
          email: '',
          password: '',
          name: '',
          lastName: '',
          tgId: ''
        })


        navigate('/')
      })

    } catch (error) {
      console.error(error)
    }




  }





  return(
    <Routes>

      <Route path={'/'} element={<LoginPage authEmailLog={{authEmail, setAuthEmail}}  isAuth={{auth, setAuth}}></LoginPage>}></Route>
      <Route path='/registration' element={<Registration registration={{registrationUser, setRegistrationUser}}newUser={createNewUser}></Registration>}></Route>
      <Route path={'/main/*'} element={<Main authEmailLog={{authEmail, setAuthEmail}} isAuth={{auth, setAuth}}></Main>}></Route>

    </Routes>

  )
}


export default App