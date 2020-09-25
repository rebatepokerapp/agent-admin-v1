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
import {addAgentData} from '../redux/AgentDucks';

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

  alerttext: {
    color: 'red'
  }

}));

const statusOptions = [
  {value:"active", label:"Active"},
  {value:"block", label:"Block"}
]

const AddAgent = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const maincontainer = clsx(classes.main);

  const {register, errors, handleSubmit, control} =  useForm();

  const error = useSelector(store => store.agent.error);
  const messageupdate = useSelector(store => store.agent.messageupdate);

  const onSubmit = (data, e) => {
    e.preventDefault();    
    dispatch(addAgentData(data)).then(() => {
      e.target.reset();
      if(messageupdate === 'Agent inserted'){
        window.location.href='/app/agents';
      }      
    });   
  }

  const showError = () => (
    <Alert severity={error ? 'warning' : 'success'} style={{display: (error || messageupdate) ? '': 'none'}} id="alertmes">
      <AlertTitle>{error ? 'Warning' : 'Success'}</AlertTitle>
        {error ? error : messageupdate}<strong>{error ? ' — Check it out!' : ''}</strong>        
    </Alert>
  );

  return (
    <div  className={maincontainer}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <span className={classes.alerttext}>
                {errors?.username?.message}
            </span>
            <input name="username" className={classes.input} ref={register(
              {
                required: {value: true, message: 'Username is required'}
              }
            )} placeholder='Username' />
            <input name="firstname" className={classes.input} ref={register} placeholder='Firstname' />
            <input name="lastname" className={classes.input} ref={register} placeholder='Lastname' />
            <span className={classes.alerttext}>
                {errors?.password?.message}
            </span>
            <input name="password" className={classes.input} ref={register(
              {
                required: {value: true, message: 'Password is required'}
              }
            )} placeholder='Password' type='password' />
            <span className={classes.alerttext}>
                {errors?.commission?.message}
            </span>
            <input name="commission" className={classes.input} ref={register(
              {
                required: {value: true, message: 'Commission is required'}
              }
            )} placeholder='Commission' />
            <span className={classes.alerttext}>
                {errors?.email?.message}
            </span>
            <input name="email" className={classes.input} ref={register(
              {
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }
            )} placeholder='Email' />                    
            <Controller
              className={classes.inputcmb}
              as={ReactSelect}
              options={statusOptions}
              name="status"
              isClearable
              control={control}
              placeholder='Status' 
              defaultValue= {{value: 'active', label: 'Active'}}
              rules={{ required: true }}
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
