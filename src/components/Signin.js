import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../images/logo-icon-small.png'; 
import { signin, authenticate, isAuthenticated } from '../core/apiCore';
import { Redirect } from 'react-router-dom';

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

export default function SignIn() {
  const classes = useStyles();

  const [values, setValues] = useState({
    username: '',
    password: '',
    error: '',
    success: false,
    redirectToReferrer: false
  });

  const {username, password, loading, error, redirectToReferrer} = values;

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value})
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({...values, error: false, loading:true})
    signin({username, password})
      .then(data => {
        if (data.error){          
          setValues({...values, error: data.error, loading: false});
        }else{
          console.log(data);
          authenticate(
            data, () => {
              setValues({...values, redirectToReferrer: true});
            }
          ) 
        }
      })
  }

  const redirectUser = () => {
    if(redirectToReferrer) {
      return <Redirect to="/dashboard" />
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} />
        <p>&nbsp;</p>
        <Typography component="h1" variant="h5" className={classes.title}>
          Agent Lobby
        </Typography>
         
        <form className={classes.form} noValidate onSubmit={clickSubmit}>
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
            onChange={handleChange('username')}
            value={username}
          />
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
            onChange={handleChange('password')}
            value={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        {redirectUser()}
      </div>
    </Container>
  );
}