import React from 'react'
import { TextField, Grid } from '@mui/material'

const Benefitiaries = (props) => {
  const { formik } = props
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        First Benenfitiary
      </Grid>
      <Grid item xs={6}>
        <TextField
          name='benefitiary_first_name1'
          label='First Name'
          variant='outlined'
          size='small'
          fullWidth
          value={formik.values.benefitiary_first_name1}
          onChange={formik.handleChange}
          error={
            formik.touched.benefitiary_first_name1 &&
            Boolean(formik.errors.benefitiary_first_name1)
          }
          helperText={
            formik.touched.benefitiary_first_name1 &&
            formik.errors.benefitiary_first_name1
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name='benefitiary_last_name1'
          label='Last Name'
          variant='outlined'
          size='small'
          fullWidth
          value={formik.values.benefitiary_last_name1}
          onChange={formik.handleChange}
          error={
            formik.touched.benefitiary_last_name1 &&
            Boolean(formik.errors.benefitiary_last_name1)
          }
          helperText={
            formik.touched.benefitiary_last_name1 &&
            formik.errors.benefitiary_last_name1
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name='relation1'
          label='Relation'
          variant='outlined'
          size='small'
          fullWidth
          value={formik.values.relation1}
          onChange={formik.handleChange}
          error={formik.touched.relation1 && Boolean(formik.errors.relation1)}
          helperText={formik.touched.relation1 && formik.errors.relation1}
        />
      </Grid>
      <Grid item xs={12}>
        Other Benenfitiaries
      </Grid>
      <Grid item xs={6}>
        <TextField
          name='benefitiary_first_name2'
          label='First Name'
          variant='outlined'
          size='small'
          fullWidth
          value={formik.values.benefitiary_first_name2}
          onChange={formik.handleChange}
          error={
            formik.touched.benefitiary_first_name2 &&
            Boolean(formik.errors.benefitiary_first_name2)
          }
          helperText={
            formik.touched.benefitiary_first_name2 &&
            formik.errors.benefitiary_first_name2
          }
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          name='benefitiary_last_name2'
          label='Last Name'
          variant='outlined'
          size='small'
          fullWidth
          value={formik.values.benefitiary_last_name2}
          onChange={formik.handleChange}
          error={
            formik.touched.benefitiary_last_name2 &&
            Boolean(formik.errors.benefitiary_last_name2)
          }
          helperText={
            formik.touched.benefitiary_last_name2 &&
            formik.errors.benefitiary_last_name2
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name='relation2'
          label='Relation'
          variant='outlined'
          size='small'
          fullWidth
          value={formik.values.relation2}
          onChange={formik.handleChange}
          error={formik.touched.relation2 && Boolean(formik.errors.relation2)}
          helperText={formik.touched.relation2 && formik.errors.relation2}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name='benefitiary_first_name3'
          label='First Name'
          variant='outlined'
          size='small'
          fullWidth
          value={formik.values.benefitiary_first_name3}
          onChange={formik.handleChange}
          error={
            formik.touched.benefitiary_first_name3 &&
            Boolean(formik.errors.benefitiary_first_name3)
          }
          helperText={
            formik.touched.benefitiary_first_name3 &&
            formik.errors.benefitiary_first_name3
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name='benefitiary_last_name3'
          label='Last Name'
          variant='outlined'
          size='small'
          fullWidth
          value={formik.values.benefitiary_last_name3}
          onChange={formik.handleChange}
          error={
            formik.touched.benefitiary_last_name3 &&
            Boolean(formik.errors.benefitiary_last_name3)
          }
          helperText={
            formik.touched.benefitiary_last_name3 &&
            formik.errors.benefitiary_last_name3
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name='relation3'
          label='Relation'
          variant='outlined'
          size='small'
          fullWidth
          value={formik.values.relation3}
          onChange={formik.handleChange}
          error={formik.touched.relation3 && Boolean(formik.errors.relation3)}
          helperText={formik.touched.relation3 && formik.errors.relation3}
        />
      </Grid>
      {/* <Grid item xs={6}>
        <TextField
          name='first_name'
          label='First Name'
          variant='outlined'
          fullWidth
          value={formik.values.benefitiary_first_name4}
          onChange={formik.handleChange}
          error={
            formik.touched.benefitiary_first_name4 &&
            Boolean(formik.errors.benefitiary_first_name4)
          }
          helperText={
            formik.touched.benefitiary_first_name4 &&
            formik.errors.benefitiary_first_name4
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name='last_name'
          label='Last Name'
          variant='outlined'
          fullWidth
          value={formik.values.benefitiary_last_name4}
          onChange={formik.handleChange}
          error={
            formik.touched.benefitiary_last_name4 &&
            Boolean(formik.errors.benefitiary_last_name4)
          }
          helperText={
            formik.touched.benefitiary_last_name4 &&
            formik.errors.benefitiary_last_name4
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name='relation'
          label='Relation'
          variant='outlined'
          fullWidth
          value={formik.values.relation4}
          onChange={formik.handleChange}
          error={formik.touched.relation4 && Boolean(formik.errors.relation4)}
          helperText={formik.touched.relation4 && formik.errors.relation4}
        />
      </Grid> */}
    </Grid>
  )
}

export default Benefitiaries
