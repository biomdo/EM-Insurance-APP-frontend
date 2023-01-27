import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  Card,
  CardContent,
  CardHeader,
  ButtonBase,
  Typography,
  Box,
} from '@mui/material'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import { useAppContext } from '../../lib/contextLib'

import { axios } from '../../axios'

export default function Dashboard() {
  const { pageTitle } = useAppContext()
  const [title, setTitle] = pageTitle
  const [products, setProducts] = useState([])
  const [clients, setClients] = useState([])

  const getProducts = async () => {
    const res = await axios.get('/product').catch((error) => {
      // console.log(error)
    })
    if (res && res.data) {
      setProducts(res.data)
    }
  }
  const getClients = async () => {
    const res = await axios.get('/client').catch((error) => {
      console.log(error)
    })
    if (res && res.data) {
      setClients(res.data)
    }
  }

  const navigate = useNavigate()
  const routeChange = (path) => {
    navigate(path)
  }

  useEffect(() => {
    getProducts()
    getClients()
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        flexFlow: 'row wrap',
        borderRadius: 1,
        gap: '10px 10px',
      }}
    >
      <Card
        sx={{
          maxWidth: 345,
          flexGrow: 1,
          background: '#1872CC',
          color: 'white',
        }}
        onClick={() => {
          routeChange('/products')
          setTitle('Products')
        }}
      >
        <CardContent>
          <Inventory2Icon
            sx={{ fontSize: 100, color: 'white', float: 'right' }}
          />
          <CardHeader title='Products' />
          <Typography component='div' sx={{ marginLeft: '20px' }}>
            Total Count: {products.length}
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          maxWidth: 345,
          flexGrow: 1,
          background: '#06174B',
          color: 'white',
        }}
        onClick={() => {
          routeChange('/clients')
          setTitle('Clients')
        }}
      >
        <CardContent>
          <PeopleAltIcon
            sx={{ fontSize: 100, color: 'white', float: 'right' }}
          />
          <CardHeader title='Clients' />
          <Typography component='div' sx={{ marginLeft: '20px' }}>
            Total Count: {clients.length}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
