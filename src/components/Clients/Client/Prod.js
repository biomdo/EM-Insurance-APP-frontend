import React, { useEffect, useState } from 'react'
import {
  Grid,
  TextField,
  Select,
  FormHelperText,
  MenuItem,
} from '@mui/material'

import { axios } from '../../../axios'

const Prod = (props) => {
  const { formik } = props
  const [products, setProducts] = useState([])
  const fetchProducts = async () => {
    const res = await axios.get('/product').catch((error) => {
      // console.log(error)
    })
    if (res && res.data) {
      setProducts(res.data)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        Select Product:
      </Grid>
      <Grid item xs={12}>
        <Select
          name='selectedProduct'
          value={formik.values.selectedProduct}
          label='Product'
          onChange={formik.handleChange}
          fullWidth
        >
          <MenuItem value='0'>Select Product</MenuItem>
          {products.map((product) => {
            return <MenuItem value={product.id}>{product.name}</MenuItem>
          })}
        </Select>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name='start_date'
          label='Date desktop'
          type='date'
          value={formik.values.start_date}
          onChange={formik.handleChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>
  )
}

export default Prod
