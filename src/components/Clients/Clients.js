import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Tooltip from '@mui/material/Tooltip'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Slide from '@mui/material/Slide'

import { axios } from '../../axios'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { parseDays } from '../../lib/commonFns'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import AddClientForm from './Client/AddClientForm'

const columns = [
  {
    field: 'first_name',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'last_name',
    headerName: 'Last name',
    width: 150,
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
    field: 'benefitiaries',
    headerName: 'Beneficiaries',
    // type: 'number',
    width: 100,
  },
  {
    field: 'product',
    headerName: 'Product',
    // type: 'number',
    width: 200,
  },
  {
    field: 'days',
    headerName: 'Days Left',
    // type: 'number',
    width: 200,
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

  const fetClientProduct = async (id) => {}

  const setClientRows = () => {
    let days = 0
    let cDay = new Date()
    clients.map((client) => {
      axios
        .get(`/beneficiary/client/${client.id}`)
        .then((res) => {
          client.benefitiaries = res.data.length
        })
        .catch((error) => {
          console.log(error)
        })

      axios
        .get(`/client/products/${client.id}`)
        .then((res) => {
          let eDay = new Date(res.data[0].end_date)
          days = eDay.getTime() - cDay.getTime()
          client.days = parseDays(Math.floor(days / (1000 * 3600 * 24)))
          axios.get(`/product/${res.data[0].product_id}`).then((res1) => {
            if (res1.data.name) client.product = res1.data.name
          })
        })
        .catch((error) => {
          console.log(error)
        })
    })

    setRows(clients)
  }

  const [openAddEditDialog, setOpenAddEditDialog] = useState(false)
  const handleClickCloseAddEditDialog = () => {
    setSelectedClient([])
    setSelectedClients([])
    setClients([])
    setOpenAddEditDialog(false)
  }

  const [selectedClients, setSelectedClients] = useState([])
  const [selectedClient, setSelectedClient] = useState([])
  const handleClickFab = () => {
    setSelectedClient([])
    setOpenAddEditDialog(true)
  }

  useEffect(() => {}, [rows])

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
      <Tooltip title='Onboard Cient'>
        <Fab
          text='dsadsa'
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
            handleClickFab()
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
        onSelectionModelChange={(newSelection) => {
          setSelectedClients(newSelection)
        }}
        selectionModel={selectedClients}
      />
      <Dialog
        open={openAddEditDialog}
        onClose={handleClickCloseAddEditDialog}
        TransitionComponent={Transition}
        fullWidth
        // sx={{
        //   maxWidth: '800px',
        //   padding: 2,
        // }}
      >
        <DialogTitle>
          {/* {selectedClients.length === 1 ? 'Edit Product' : 'Add New Product'} */}
          Add Client
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ margin: 5 }}></DialogContentText>
          <AddClientForm />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Clients
