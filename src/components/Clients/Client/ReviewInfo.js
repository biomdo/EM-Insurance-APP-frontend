import React, { useState, useEffect } from 'react'
import { Typography, List, ListItem, ListItemText } from '@mui/material'

import { axios } from '../../../axios'

const ReviewInfo = ({ formik }) => {
  const { values } = formik

  const [product, setProduct] = useState()
  const fetchProduct = async (id) => {
    axios
      .get(`/product/${id}`)
      .then((res) => {
        setProduct(res.data)
      })
      .catch((error) => {
        // console.log(error)
      })
  }

  useEffect(() => {
    fetchProduct(values.selectedProduct)
  }, [])

  return (
    <>
      <Typography variant='overline'>Personal Information</Typography>
      <List>
        <ListItem>
          <ListItemText
            primary='Name'
            secondary={`${values.first_name} ${values.last_name}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary='ID Number' secondary={values.id_number} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary='Phone Number'
            secondary={values.phone_number}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary='Email' secondary={values.email} />
        </ListItem>
      </List>
      <ListItem>
        <ListItemText primary='Occupation' secondary={values.occupation} />
      </ListItem>
      <Typography variant='overline'>Product Information</Typography>
      <List>
        <ListItem>
          <ListItemText
            primary='Product'
            secondary={product ? product.name : ''}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary='Start Date:' secondary={values.start_date} />
        </ListItem>
      </List>
    </>
  )
}

export default ReviewInfo
