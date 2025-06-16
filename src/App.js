import { Routes, Route } from 'react-router'
import './App.css'
import { useEffect, useState, createContext } from 'react'
import { useNavigate } from 'react-router-dom'

// redux

import { useSelector, useDispatch } from 'react-redux'
import { createUser, getUsers} from './store/userSlice'

// firebase

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'


// components

import Main from './main'
import LoginPage from './components/login/Login-page'
import Registration from './components/login/Registration'
import ModalPageAuth from './components/modalpage/Modal-page-auth'

// img

import dislike from './asset/dislike.svg'
import like from './asset/like.svg'



const App = () => {

  const navigate = useNavigate()

  // redux

  const users = useSelector(state => state.users.users)
  const dispatch = useDispatch()



  useEffect (() => {
    dispatch(getUsers())

  }, [])

  const [auth, setAuth] = useState(false)
  const [modalAuth, setModalAuth] = useState(true)
  const [modalPassAuth, setModalPassAuth] = useState(true)
  const [modalPassRepeat, setModalPassRepeat] = useState(true)
  const [authOk, setAuthOk] = useState(true)
  const [authEmail, setAuthEmail] = useState('')




  const [registrationUser, setRegistrationUser] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
    lastName: '',
    tgId: ''
  })


  const createNewUser = () => {


      if(registrationUser.email === '' || registrationUser.password === '' || registrationUser.name === '' || registrationUser.lastName === '' || registrationUser.tgId === '') {

        setModalAuth(false)
        return
      }


      if(registrationUser.password !== registrationUser.repeatPassword) {
        setModalPassAuth(false)

        setRegistrationUser({
          password: '',
          repeatPassword: '',
        })


        return
      }


       users.filter((item) => {
        if(item.email === registrationUser.email) {
          setModalPassRepeat(false)
          return
        } else {
          return false
        }
      })

      const auth = getAuth()
      createUserWithEmailAndPassword(auth, registrationUser.email, registrationUser.password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
        setAuthOk(false)

        dispatch(createUser(registrationUser))
        setRegistrationUser({
          email: '',
          password: '',
          name: '',
          lastName: '',
          tgId: ''
        })

        if(authOk === true) {
          navigate('/')

        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)

      })

  }





  return(


    <>
    <Routes>

      <Route path={'/'} element={<LoginPage authEmailLog={{authEmail, setAuthEmail}}  isAuth={{auth, setAuth}}></LoginPage>}></Route>
      <Route path='/registration' element={<Registration registration={{registrationUser, setRegistrationUser}} newUser={createNewUser}></Registration>}></Route>
      <Route path={'/main/*'} element={<Main authEmailLog={{authEmail, setAuthEmail}} isAuth={{auth, setAuth}}></Main>}></Route>

    </Routes>


    {(modalAuth === false) ? <ModalPageAuth ModalPageAuth={{modalAuth, setModalAuth}} ModalPassAuth={{modalPassAuth, setModalPassAuth}} AuthOk={{authOk, setAuthOk}} ModalPassRepeat={{modalPassRepeat, setModalPassRepeat}} modalDislikeImg={dislike} modalDislikeTitle={'Заполните все поля'} modalBtnTitle={'заново'}/> : <></>}

    {(modalPassAuth === false) ? <ModalPageAuth ModalPageAuth={{modalAuth, setModalAuth}} ModalPassAuth={{modalPassAuth, setModalPassAuth}} AuthOk={{authOk, setAuthOk}} ModalPassRepeat={{modalPassRepeat, setModalPassRepeat}} modalDislikeImg={dislike} modalDislikeTitle={'Пароли не совпадают попробуйте еще раз'} modalBtnTitle={'заново'}/> : <></>}


    {(authOk === false) ? <ModalPageAuth ModalPageAuth={{modalAuth, setModalAuth}} ModalPassAuth={{modalPassAuth, setModalPassAuth}} AuthOk={{authOk, setAuthOk}} ModalPassRepeat={{modalPassRepeat, setModalPassRepeat}} modalDislikeImg={like} modalDislikeTitle={'регистрация прошла успешно'} modalBtnTitle={'продолжить'}/> : <></>}


    {(modalPassRepeat === false) ? <ModalPageAuth ModalPageAuth={{modalAuth, setModalAuth}} ModalPassAuth={{modalPassAuth, setModalPassAuth}} AuthOk={{authOk, setAuthOk}} ModalPassRepeat={{modalPassRepeat, setModalPassRepeat}} modalDislikeImg={dislike} modalDislikeTitle={'Данный email занят другим пользователем'} modalBtnTitle={'продолжить'}/> : <></>}


    </>


  )
}


export default App