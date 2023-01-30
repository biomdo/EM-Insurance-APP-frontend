import React, { useState } from 'react'
import { FormikConsumer, useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormHelperText,
  Button,
} from '@mui/material'
import PersonalInfo from './PersonalInfo'
import AccountDetails from './AccountDetails'
import ReviewInfo from './ReviewInfo'
import Benefitiaries from './Benefitiaries'
import Prod from './Prod'

import { axios } from '../../../axios'
import MuiAlert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'

const steps = [
  'Personal Info',
  'Benefitiaries',
  'Account Details',
  'Products',
  'Review and Submit',
]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

function AddClientForm() {
  const [open, setOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const addClient = async () => {
    addBenefitiaries(10)
    let newClient = {
      first_name: formik.values.first_name,
      last_name: formik.values.last_name,
      id_number: formik.values.id_number,
      email: formik.values.email,
      phone_number: formik.values.phone_number,
      occupation: formik.values.occupation,
    }
    await axios.post(`/client`, { ...newClient }).then((res) => {
      if (res && !res.data.isError) {
        addBenefitiaries(res.data.id)
        addBankDetails(res.data.id)
        addClientProduct(res.data.id)
        setAlertMsg('Client added successfully')
        setIsError(false)
        setOpen(true)
      } else {
        setAlertMsg(res.data.message)
        setIsError(true)
        setOpen(true)
      }
    })
  }

  const addBenefitiaries = (clientId) => {
    let benefitiaries = [
      {
        first_name: formik.values.benefitiary_first_name1,
        last_name: formik.values.benefitiary_last_name1,
        relation: formik.values.relation1,
        client_id: clientId,
      },
      {
        first_name: formik.values.benefitiary_first_name2,
        last_name: formik.values.benefitiary_last_name2,
        relation: formik.values.relation2,
        client_id: clientId,
      },
      {
        first_name: formik.values.benefitiary_first_name3,
        last_name: formik.values.benefitiary_last_name3,
        relation: formik.values.relation3,
        client_id: clientId,
      },
    ]

    benefitiaries.map((ben) => {
      axios
        .post(`/benefitiary`, { ...ben })
        .then((res) => {
          //   console.log(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  const addBankDetails = (clientId) => {
    let bankDetails = {
      bank_name: formik.values.bank_name,
      branch: formik.values.branch,
      account_name: formik.values.account_name,
      account_number: formik.values.account_number,
      client_id: clientId,
    }
    axios.post(`/bankdetails`, { ...bankDetails }).then((res) => {
      if (res && res.data.isError) {
        setAlertMsg(res.data.isError)
        setIsError(true)
        setOpen(true)
      }
    })
  }

  const addClientProduct = (clientId) => {
    let clientProduct = {
      client_id: clientId,
      product_id: formik.values.selectedProduct,
      start_date: formik.values.start_date,
    }
    axios.post(`/clientproduct`, { ...clientProduct }).then((res) => {
      if (res && !res.data.isError) {
      } else {
        setAlertMsg(res.data.message)
        setIsError(true)
        setOpen(true)
      }
    })
  }

  const [activeStep, setActiveStep] = useState(0)

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      id_number: '',
      email: '',
      phone_number: '',
      occupation: '',
      benefitiary_first_name1: '',
      benefitiary_last_name1: '',
      relation1: '',
      benefitiary_first_name2: '',
      benefitiary_last_name2: '',
      relation2: '',
      benefitiary_first_name3: '',
      benefitiary_last_name3: '',
      relation3: '',
      benefitiary_first_name4: '',
      benefitiary_last_name4: '',
      relation4: '',
      bank_name: '',
      branch: '',
      account_name: '',
      account_number: '',
      selectedProduct: 0,
      start_date: '',

      //   password: '',
      //   confirmPassword: '',
      //   firstName: '',
      //   lastName: '',
      //   phone: '',
      //   residence: '',
    },
    validationSchema: Yup.object().shape({
      //   password: Yup.string().min(8),
      //   confirmPassword: Yup.string()
      // .min(8)
      // .oneOf([Yup.ref('password')], 'Passwords do not match'),
      //   first_name: Yup.string().required('First Name is required'),
      //   last_name: Yup.string().required('Last Name is required'),
      //   id_number: Yup.number().integer().required('ID Number is required'),
      //   phone_number: Yup.string().required('Phone Number is required'),
      //   email: Yup.string().email('Invalid email'),
      //   occupation: Yup.string(),
      //   benefitiary_first_name1: Yup.string().required('First Name is required'),
      //   benefitiary_last_name1: Yup.string().required('Last Name is required'),
      //   relation1: Yup.string().required('Relation is required'),
      //   benefitiary_first_name2: Yup.string(),
      //   benefitiary_last_name2: Yup.string(),
      //   relation2: Yup.string(),
      //   benefitiary_first_name3: Yup.string(),
      //   benefitiary_last_name3: Yup.string(),
      //   relation3: Yup.string(),
      //   benefitiary_first_name4: Yup.string(),
      //   benefitiary_last_name4: Yup.string(),
      //   relation4: Yup.string(),
      //   bank_name: Yup.string().required('Bank Name is required'),
      //   branch: Yup.string().required('Branch is required'),
      //   account_name: Yup.string().required('Account Name is required'),
      //   account_number: Yup.string().required('Account Number is required'),
    }),
    onSubmit: () => {
      if (activeStep === steps.length - 1) {
        console.log(`last step`)
      } else {
        setActiveStep((prevStep) => prevStep + 1)
      }
    },
  })

  const formContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalInfo formik={formik} />
      case 1:
        return <Benefitiaries formik={formik} />
      case 2:
        return <AccountDetails formik={formik} />
      case 3:
        return <Prod formik={formik} />
      case 4:
        return <ReviewInfo formik={formik} />
      default:
        return <div>404: Not Found</div>
    }
  }

  return (
    <Box>
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
      <Stepper activeStep={activeStep} orientation='horizontal'>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container>
        <Grid item xs={12} sx={{ padding: '20px' }}>
          {formContent(activeStep)}
        </Grid>
        {formik.errors.submit && (
          <Grid item xs={12}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              onClick={() => {
                // console.log(`last step: ${formik.values.start_date}`)
                addClient()
              }}
            >
              Submit
            </Button>
          ) : (
            <Button onClick={formik.handleSubmit}>Next</Button>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default AddClientForm
