import React from 'react'
import { Grid, TextField, FormHelperText } from '@mui/material'

const AccountDetails = (props) => {
  const { formik } = props
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          name='bank_name'
          label='Bank Name'
          variant='outlined'
          fullWidth
          error={Boolean(formik.touched.bank_name && formik.errors.bank_name)}
          onChange={formik.handleChange}
          value={formik.values.bank_name}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name='branch'
          label='Branch'
          variant='outlined'
          fullWidth
          error={Boolean(formik.touched.branch && formik.errors.branch)}
          onChange={formik.handleChange}
          value={formik.values.branch}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name='account_name'
          label='Account Name'
          variant='outlined'
          fullWidth
          error={Boolean(
            formik.touched.account_name && formik.errors.account_name
          )}
          onChange={formik.handleChange}
          value={formik.values.account_name}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name='account_number'
          label='Account Number'
          variant='outlined'
          fullWidth
          error={Boolean(
            formik.touched.account_number && formik.errors.account_number
          )}
          onChange={formik.handleChange}
          value={formik.values.account_number}
        />
      </Grid>
    </Grid>
  )
}

export default AccountDetails
