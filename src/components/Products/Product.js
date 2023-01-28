import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'

import { axios } from '../../axios'
import { parseDays } from '../../lib/commonFns'

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

function Product() {
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

  useEffect(() => {
    fetchProducts()
    setProductRows()
  }, [products.length])

  return (
    <Box sx={{ height: '650px', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  )
}

export default Product
