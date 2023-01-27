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
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    width: 110,
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
      res.data.map((prod) => {
        prod.duration = parseDays(prod.period)
      })
      setProducts(res.data)
    }
  }

  useEffect(() => {
    fetchProducts()
    setRows(products)
  }, [products])
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
