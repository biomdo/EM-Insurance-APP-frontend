import React from 'react'
import { TextField, Grid } from '@mui/material'

const PersonalInfo = (props) => {
  const { formik } = props
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          name='first_name'
          label='First Name'
          variant='outlined'
          fullWidth
          value={formik.values.first_name}
          onChange={formik.handleChange}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={formik.touched.first_name && formik.errors.first_name}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name='last_name'
          label='Last Name'
          variant='outlined'
          fullWidth
          value={formik.values.last_name}
          onChange={formik.handleChange}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name='phone_number'
          label='Phone Number'
          variant='outlined'
          type='phone'
          fullWidth
          value={formik.values.phone_number}
          onChange={formik.handleChange}
          error={
            formik.touched.phone_number && Boolean(formik.errors.phone_number)
          }
          helperText={formik.touched.phone_number && formik.errors.phone_number}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name='id_number'
          label='ID Number'
          variant='outlined'
          fullWidth
          value={formik.values.id_number}
          onChange={formik.handleChange}
          error={formik.touched.id_number && Boolean(formik.errors.id_number)}
          helperText={formik.touched.id_number && formik.errors.id_number}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          name='email'
          label='Email'
          variant='outlined'
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name='occupation'
          label='Occupation'
          variant='outlined'
          fullWidth
          value={formik.values.occupation}
          onChange={formik.handleChange}
        />
      </Grid>
    </Grid>
  )
}

export default PersonalInfo
