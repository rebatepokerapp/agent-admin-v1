import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../images/logo-icon-small.png'; 
import { signin, authenticate } from '../core/apiCore';
import { withRouter } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { useUserDispatch } from "./UserContext";

import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#000000',
    backgroundColor: '#FF9A00',
    fontWeight: '700',
  },
}));

function SignIn (props) {
  console.log('ENTRO A SIGNIN')
  const classes = useStyles();

  var userDispatch = useUserDispatch();

  const {register, errors, handleSubmit} =  useForm();

  const [error, setError] = useState(false);

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log('DATA EN SUBMIT ',data);

    signin(data)
    .then(data => {
      console.log('DATA AFTER LOGIN: ', data)
      if (data.error) {
        setError(data.error);
      } else {
        console.log('Autentico 1');
        const auth = authenticate (data);
        if (auth) {
          console.log(props);
          userDispatch({ type: 'LOGIN_SUCCESS', data });
          props.history.push('/app/dashboard');
        } else {
          userDispatch({ type: 'LOGIN_FAILURE' })
          console.log('VALIDACION MALISIMA');
        }
      }
    })    
    .catch(error => {
      setError(error);
    })

    e.target.reset();
  }

  const showError = () => (
    <Alert severity="warning" style={{display: error ? '': 'none'}}>
      <AlertTitle>Warning</AlertTitle>
        {error} — <strong>check it out!</strong>
    </Alert>
  )

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} alt={logo} />
        <p>&nbsp;</p>
        <Typography component="h1" variant="h5" className={classes.title}>
          Agent Lobby
        </Typography>
         
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField 
            className={classes.input}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="username"
            name="username"
            autoFocus
            label="Username"
            inputRef={
              register({
                required: {value: true, message:'Require field'}
              })
            }
          />
          <span className="text-danger text-small d-block mb-2">
            {errors?.username?.message}
          </span>
          <TextField
            className={classes.input}
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            label="Password"
            inputRef={
              register({
                required: {value: true, message:'Require field'}
              })
            }
          />
          <span className="text-danger text-small d-block mb-2">
            {errors?.password?.message}
          </span>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        {showError()}
      </div>
    </Container>
  );
}

export default withRouter(SignIn);