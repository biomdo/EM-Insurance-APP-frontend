import React, { useState } from 'react'
import { AppContext } from './lib/contextLib'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from './styles'
import DrawerNav from './components/DrawerNav/DrawerNav'

import './app.css'

const MyProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userToken, setUserToken] = useState('')
  const [currentUser, setCurrentUser] = useState([])
  const [pageTitle, setPageTitle] = useState('')

  return (
    <AppContext.Provider
      value={{
        loggedIn: [isAuthenticated, setIsAuthenticated],
        token: [userToken, setUserToken],
        user: [currentUser, setCurrentUser],
        pageTitle: [pageTitle, setPageTitle],
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <DrawerNav />
        </ThemeProvider>
      </BrowserRouter>
    </MyProvider>
  )
}

export default App
