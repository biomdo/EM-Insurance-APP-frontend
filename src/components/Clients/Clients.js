import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Tooltip from '@mui/material/Tooltip'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Slide from '@mui/material/Slide'

import { axios } from '../../axios'
import { parseDays } from '../../lib/commonFns'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'

const columns = [
  {
    field: 'first_name',
    headerName: 'First name',
    width: 180,
  },
  {
    field: 'last_name',
    headerName: 'Last name',
    width: 180,
  },
  {
    field: 'id_number',
    headerName: 'ID Number',
    width: 100,
  },
  {
    field: 'phone_number',
    headerName: 'Phone Number',
    width: 130,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'occupation',
    headerName: 'Occupation',
    width: 150,
  },
  {
    field: 'products',
    headerName: 'Products',
    // type: 'number',
    width: 100,
  },
]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

function Clients() {
  const [open, setOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const [rows, setRows] = useState([])
  const [clients, setClients] = useState([])
  const fetchClients = async () => {
    const res = await axios.get('/client').catch((error) => {
      // console.log(error)
    })
    if (res && res.data) {
      setClients(res.data)
    }
  }

  const setClientRows = () => {
    clients.map((client) => {
      axios
        .get(`/client/products/${client.id}`)
        .then((res) => {
          client.products = res.data.length
        })
        .catch((error) => {
          console.log(error)
        })
    })
    console.log(clients)
    setRows(clients)
  }

  useEffect(() => {
    fetchClients()
    setClientRows()
  }, [clients.length])

  return (
    <Box sx={{ height: '580px', width: '100%' }}>
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
      <Tooltip title='Add New Product'>
        <Fab
          color='primary'
          style={{
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
          }}
          onClick={() => {
            // handleClickFab()
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        // onSelectionModelChange={(newSelection) => {
        //   setSelectedProducts(newSelection)
        // }}
        // selectionModel={selectedProducts}
      />
    </Box>
  )
}

export default Clients
