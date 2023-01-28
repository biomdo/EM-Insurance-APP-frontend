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

import { useNavigate } from 'react-router-dom'

const columns = [
  //   { field: 'id', headerName: 'ID', width: 90 },
  //   {
  //     field: 'firstName',
  //     headerName: 'First name',
  //     width: 150,
  //     editable: true,
  //   },
  {
    field: 'name',
    headerName: 'Product Name',
    width: 300,
    // editable: true,
  },
  {
    field: 'duration',
    headerName: 'Duration',
    width: 200,
    // editable: true,
  },
  {
    field: 'clients',
    headerName: 'Onboarded clients',
    type: 'number',
    width: 150,
    // editable: true,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    // type: 'number',
    width: 150,
    align: 'right',
    headerAlign: 'right',
    // editable: true,
  },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  //   },
]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

function Product() {
  const [open, setOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const [products, setProducts] = useState([])
  const [rows, setRows] = useState([])
  const fetchProducts = async () => {
    const res = await axios.get('/product').catch((error) => {
      // console.log(error)
    })
    if (res && res.data) {
      setProducts(res.data)
    }
  }

  const setProductRows = () => {
    products.map((product) => {
      axios
        .get(`/product/clientproducts/${product.id}`)
        .then((res) => {
          product.duration = parseDays(product.period)
          product.clients = res.data.length
          product.amount = formatter.format(product.amount)
        })
        .catch((error) => {
          console.log(error)
        })
    })
    setRows(products)
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KES',
    // Options are needed to round to whole numbers
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const [viewEdit, setViewEdit] = useState(false)
  const [viewDelete, setViewDelete] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState([])

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const handleClickCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
  }
  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true)
  }

  const navigate = useNavigate()
  const deleteProducts = () => {
    selectedProducts.map((product) => {
      axios.put(`/product/delete/${product}`)
    })

    setAlertMsg(
      selectedProducts.length > 1
        ? `Products succesfully deleted`
        : `Product successfuly deleted`
    )
    fetchProduct()
    setSelectedProduct([])
    setSelectedProducts([])
    setRows([])
    setOpen(true)
    setOpenDeleteDialog(false)
    setProductRows()
  }

  const fetchProduct = async (id) => {
    axios
      .get(`/product/${id}`)
      .then((res) => {
        setSelectedProduct(res.data)
      })
      .catch((error) => {
        // console.log(error)
      })
  }

  const [openAddEditDialog, setOpenAddEditDialog] = useState(false)
  const handleClickCloseAddEditDialog = () => {
    setOpenAddEditDialog(false)
  }
  const handleClickFab = () => {
    setSelectedProduct([])
    setOpenAddEditDialog(true)
  }

  useEffect(() => {
    if (selectedProducts.length === 1) {
      setViewEdit(true)
      fetchProduct(selectedProducts[0])
    } else {
      setViewEdit(false)
      setSelectedProduct([])
    }
    selectedProducts.length > 0 ? setViewDelete(true) : setViewDelete(false)
  }, [selectedProducts])

  useEffect(() => {
    fetchProducts()
    setProductRows()
  }, [products.length])

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
          setSelectedProducts(newSelection)
        }}
        selectionModel={selectedProducts}
      />
      {viewEdit ? (
        <Tooltip title='Edit Product'>
          <IconButton
            aria-label='edit'
            style={{ float: 'left' }}
            // onClick={() => handleClickOpenAddEditDialog(property)}
          >
            <EditTwoToneIcon sx={{ fontSize: '30px' }} />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
      {viewDelete ? (
        <Tooltip title='Delete Product(s)'>
          <IconButton
            aria-label='edit'
            color='error'
            style={{ float: 'left', marginLeft: '10px' }}
            onClick={() => handleClickOpenDeleteDialog()}
          >
            <DeleteIcon sx={{ fontSize: '30px' }} />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
      <Dialog
        open={openAddEditDialog}
        onClose={handleClickCloseAddEditDialog}
        TransitionComponent={Transition}
        fullWidth
      >
        <DialogTitle>
          {selectedProducts.length === 1 ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ margin: 5 }}></DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        onClose={handleClickCloseDeleteDialog}
        TransitionComponent={Transition}
        fullWidth
      >
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ margin: 5 }}>
            Are you sure your want to delete
            {selectedProducts.length === 1
              ? ` ${selectedProduct.name}`
              : ` all the ${selectedProducts.length} selected products`}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteProducts} variant='contained' color='error'>
            Yes, Delete
          </Button>
          <Button onClick={handleClickCloseDeleteDialog} variant='contained'>
            No, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Product
