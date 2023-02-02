import React, { useState, useEffect } from 'react'
import { TextField, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove'
import Divider from '@mui/material/Divider'

const Beneficiaries = (props) => {
  const { formik } = props
  const [numberOfBeneficiaries, setNumberOfBeneficiaries] = useState([2])
  useEffect(() => {}, [numberOfBeneficiaries])
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        First Benenfitiary
      </Grid>
      <Grid item xs={6}>
        <TextField
          name='beneficiary_first_name1'
          label='First Name'
          variant='outlined'
          size='small'
          fullWidth
          value={formik.values.beneficiary_first_name1}
          onChange={formik.handleChange}
          error={
            formik.touched.beneficiary_first_name1 &&
            Boolean(formik.errors.beneficiary_first_name1)
          }
          helperText={
            formik.touched.beneficiary_first_name1 &&
            formik.errors.beneficiary_first_name1
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name='beneficiary_last_name1'
          label='Last Name'
          variant='outlined'
          size='small'
          fullWidth
          value={formik.values.beneficiary_last_name1}
          onChange={formik.handleChange}
          error={
            formik.touched.beneficiary_last_name1 &&
            Boolean(formik.errors.beneficiary_last_name1)
          }
          helperText={
            formik.touched.beneficiary_last_name1 &&
            formik.errors.beneficiary_last_name1
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

      {numberOfBeneficiaries.map((i) => {
        let first_name_identifier = `beneficiary_first_name${i}`
        let last_name_identifier = `beneficiary_last_name${i}`
        let relation_identifier = `relation${i}`
        return (
          <>
            <Grid item xs={6} key={`${i}`}>
              <TextField
                name={first_name_identifier}
                label='First Name'
                variant='outlined'
                size='small'
                fullWidth
                value={formik.values.first_name_identifier}
                onChange={formik.handleChange}
                error={
                  formik.touched.first_name_identifier &&
                  Boolean(formik.errors.first_name_identifier)
                }
                helperText={
                  formik.touched.first_name_identifier &&
                  formik.errors.first_name_identifier
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name={last_name_identifier}
                label='Last Name'
                variant='outlined'
                size='small'
                fullWidth
                value={formik.values.last_name_identifier}
                onChange={formik.handleChange}
                error={
                  formik.touched.last_name_identifier &&
                  Boolean(formik.errors.last_name_identifier)
                }
                helperText={
                  formik.touched.last_name_identifier &&
                  formik.errors.last_name_identifier
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name={relation_identifier}
                label='Relation'
                variant='outlined'
                size='small'
                fullWidth
                value={formik.values.relation_identifier}
                onChange={formik.handleChange}
                error={
                  formik.touched.relation_identifier &&
                  Boolean(formik.errors.relation_identifier)
                }
                helperText={
                  formik.touched.relation_identifier &&
                  formik.errors.relation_identifier
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Divider light />
            </Grid>
          </>
        )
      })}
      <Grid item xs={10}></Grid>
      <Grid item xs={1}>
        <IconButton
          key='Add'
          color='primary'
          onClick={() => {
            let number = numberOfBeneficiaries.length + 1
            setNumberOfBeneficiaries([...numberOfBeneficiaries, number + 1])
          }}
        >
          <AddIcon />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton
          key='Remove'
          color='error'
          onClick={() => {
            let number = numberOfBeneficiaries.length + 1
            if (number > 2) {
              setNumberOfBeneficiaries(
                numberOfBeneficiaries.splice(0, number - 2)
              )
            }
          }}
        >
          <RemoveIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Beneficiaries
