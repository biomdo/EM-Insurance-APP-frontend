import React, { useState, useEffect } from 'react'

import { axios } from '../../axios'
import { TextField, Button } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

import { useAppContext } from '../../lib/contextLib'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

export default function Login() {
  //Snack Bar setup
  const [open, setOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  //Context Variables
  const { loggedIn, token, user } = useAppContext()
  const [loggedInState, setLoggedInState] = loggedIn
  const [tokenValue, setTokenValue] = token
  const [currentUser, setCurrentUser] = user

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (e) => {
    e.preventDefault()
    if (username.length === 0) {
      setAlertMsg('Username not Provided')
      setIsError(true)
      setOpen(true)
      return false
    }
    if (password.length === 0) {
      setAlertMsg('Password not Provided')
      setIsError(true)
      setOpen(true)
      return false
    }
    const userCredentials = { username: username, password: password }
    axios
      .post('/user/authenticate', { ...userCredentials })
      .then((res) => {
        if (res && res.data) {
          if (res.data.error) {
            setAlertMsg(res.data.message)
            setIsError(true)
            setOpen(true)
          } else {
            setAlertMsg('login successful')
            setIsError(false)
            setOpen(true)
            setTokenValue(res.data.token)
            localStorage.setItem('emapptoken', res.data.token)
            setLoggedInState(true)
          }
        }
      })
      .catch((error) => {
        setAlertMsg(error.message)
        setIsError(true)
        setOpen(true)
      })
  }

  const checkLogin = () => {
    var token = localStorage.getItem('emapptoken')
    if (token !== null) {
      setTokenValue(token)
      axios
        .post('user/jwt', {}, { headers: { 'x-access-token': token } })
        .then((res) => {
          if (res.data.auth) {
            setLoggedInState(true)
            setCurrentUser(res.data.userData.user[0])
          } else {
            setLoggedInState(false)
          }
        })
        .catch((err) => {
          setLoggedInState(false)
        })
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <div>
          {!isError ? (
            <Alert onClose={handleClose} severity='success'>
              {alertMsg}
            </Alert>
          ) : (
            <Alert onClose={handleClose} severity='error'>
              {alertMsg}
            </Alert>
          )}
        </div>
      </Snackbar>
      <form className='form'>
        <AccountCircleIcon color='primary' sx={{ fontSize: 100 }} />
        <div className='form-title'>Sign In</div>
        <TextField
          required
          id='username'
          label='Username'
          defaultValue=''
          margin='normal'
          fullWidth='true'
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
        <TextField
          required
          id='password'
          label='Password'
          type='password'
          autoComplete='current-password'
          margin='normal'
          fullWidth='true'
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <Button
          sx={{ textTransform: 'none', fontSize: '18px', marginTop: '20px' }}
          variant='contained'
          size='large'
          fullWidth='true'
          onClick={(e) => {
            login(e)
          }}
        >
          Sign In
        </Button>
      </form>
    </>
  )
}
