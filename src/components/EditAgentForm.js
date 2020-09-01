import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import ReactSelect from "react-select";
import {editAgentData} from '../redux/AgentDucks';
import {useDispatch, useSelector} from 'react-redux'

import { useForm, Controller } from 'react-hook-form';

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
    display: 'block',
    boxSizing: 'border-box',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid white',
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
  },
}));

const statusOptions = [
  {value:"active", label:"Active"},
  {value:"block", label:"Block"}
]

function EditAgentForm (props) {

  let {agent} = props;
  const classes = useStyles();

  const dispatch = useDispatch();

  const {register, errors, handleSubmit, control} =  useForm();  

  const error = useSelector(store => store.agent.error);
  const messageupdate = useSelector(store => store.agent.messageupdate);

  const onSubmit = (data, e) => {
    e.preventDefault();    
    dispatch(editAgentData(data)).then(() => {
      document.getElementById('alertmes').style.display='';
    });
    agent.firstname = data.fisrtname;
    agent.lastname = data.lastname;
    agent.username = data.username;
    agent.email = data.email;
    agent.status = data.status.value;
    agent.commission = data.commission;
    setTimeout(() => {
      document.getElementById('alertmes').style.display='none';
    },3000);   
  }

  const showError = () => (
    <Alert severity={error ? 'warning' : 'success'} style={{display: (error || messageupdate) ? '': 'none'}} id="alertmes">
      <AlertTitle>{error ? 'Warning' : 'Success'}</AlertTitle>
        {error ? error : messageupdate}<strong>{error ? ' — Check it out!' : ''}</strong>        
    </Alert>
  )

  return agent ? (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          Edit Agent Information
        </Typography>
         
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <input name="username" className={classes.input} ref={register} placeholder='Username' defaultValue={agent.username} readOnly/>
          <input name="firstname" className={classes.input} ref={register} placeholder='Firstname'defaultValue={agent.firstname}/>
          <input name="lastname" className={classes.input} ref={register} placeholder='Lastname'defaultValue={agent.lastname}/>
          <input name="commission" className={classes.input} ref={register} placeholder='Commission'defaultValue={agent.commission}/>
          <input name="email" className={classes.input} ref={register} placeholder='Email'defaultValue={agent.email} readOnly/>                    
          <Controller
            className={classes.inputcmb}
            as={ReactSelect}
            options={statusOptions}
            name="status"
            isClearable
            control={control}
            placeholder='Status'
            defaultValue={() => {
              if(agent.status === 'active'){
                return {value: 'active', label: 'Active'};
              }else{
                return {value: 'block', label: 'Block'}
              }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
        {showError()}
      </div>
    </Container>
  ) : null;
}

export default withRouter(EditAgentForm);