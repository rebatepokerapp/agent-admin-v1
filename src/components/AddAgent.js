import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import ReactSelect from "react-select";
import { useForm, Controller } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useDispatch, useSelector} from 'react-redux'
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    maxWidth: '100%', 
    margin: '0',
    padding: '0',
    verticalAlign: 'top',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginTop: '50px',
    marginBottom: '30px',
    color: '#333333',
    fontWeight: '700',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    display: 'block',
    boxSizing: 'border-box',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #AAAAAA',
    padding: '10px 15px',
    marginBottom: '10px',
    fontSize: '14px'
  },

  inputcmb: {
    marginTop: '10px'
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#000000',
    backgroundColor: '#FF9A00',
    fontWeight: '700',
    ':hover': {
      backgroundColor: '#FFCC00'
    },
  },

}));

const statusOptions = [
  {value:"active", label:"Active"},
  {value:"block", label:"Block"}
]

const AddAgent = () => {
  const classes = useStyles();

  const maincontainer = clsx(classes.main);

  const {register, errors, handleSubmit, control} =  useForm();

  const error = useSelector(store => store.agent.error);
  const messageupdate = useSelector(store => store.agent.messageupdate);

  const onSubmit = (data, e) => {
    e.preventDefault();    

    setTimeout(() => {
      if(document.getElementById('alertmes')){
        document.getElementById('alertmes').style.display='none';
      }      
    },3000);   
  }

  const showError = () => (
    <Alert severity={error ? 'warning' : 'success'} style={{display: (error || messageupdate) ? '': 'none'}} id="alertmes">
      <AlertTitle>{error ? 'Warning' : 'Success'}</AlertTitle>
        {error ? error : messageupdate}<strong>{error ? ' — Check it out!' : ''}</strong>        
    </Alert>
  )

  return (
    <div  className={maincontainer}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.title}>
            ADD AGENT
          </Typography>
          
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <input name="username" className={classes.input} ref={register} placeholder='Username' />
            <input name="firstname" className={classes.input} ref={register} placeholder='Firstname' />
            <input name="lastname" className={classes.input} ref={register} placeholder='Lastname' />
            <input name="password" className={classes.input} ref={register} placeholder='Password' />
            <input name="commission" className={classes.input} ref={register} placeholder='Commission' />
            <input name="email" className={classes.input} ref={register} placeholder='Email' />                    
            <Controller
              className={classes.inputcmb}
              as={ReactSelect}
              options={statusOptions}
              name="status"
              isClearable
              control={control}
              placeholder='Status' 
              defaultValue= {{value: 'active', label: 'Active'}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              INSERT
            </Button>
          </form>
          {showError()}
        </div>
      </Container>
    </div>
  )
}

export default withRouter(AddAgent)
