import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import ReactSelect from "react-select";
import {editAgentData,getAgentData,setAgentInfo} from '../redux/AgentDucks';
import {useDispatch, useSelector} from 'react-redux'

import { useForm, Controller } from 'react-hook-form';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
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
  },
}));

const statusOptions = [
  {value:"active", label:"Active"},
  {value:"block", label:"Block"}
]

function EditAgentForm ({id,username}) {

  const classes = useStyles();

  const dispatch = useDispatch();


  useEffect(() => {  
    dispatch(setAgentInfo(id,username))
    dispatch(getAgentData())    
  },[id, username, dispatch])  

  const agent = useSelector(store => store.agent.data);

  const {register, errors, handleSubmit, control} =  useForm();  

  const error = useSelector(store => store.agent.error);
  const messageupdate = useSelector(store => store.agent.messageupdate);

  let value = false;
  if(agent){
    value = agent.isTransferAllow;
  }

  const [state, setState] = useState(value);

  const handleChange = (event) => {
    setState(event.target.checked);
  };

  const onSubmit = (data, e) => {
    e.preventDefault();    
    dispatch(editAgentData(data)).then(() => {
      if(document.getElementById('alertmes')){
        document.getElementById('alertmes').style.display='';
      }      
    });
    agent.firstname = data.fisrtname;
    agent.lastname = data.lastname;
    agent.username = data.username;
    agent.email = data.email;
    agent.status = data.status.value;
    agent.commission = data.commission;
    agent.isTransferAllow = state;
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
  return agent ? (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <input name="username" className={classes.input} ref={register} placeholder='Username' defaultValue={agent.username} readOnly/>
          <input name="firstname" className={classes.input} ref={register} placeholder='Firstname'defaultValue={agent.firstname}/>
          <input name="lastname" className={classes.input} ref={register} placeholder='Lastname'defaultValue={agent.lastname}/>
          <span className={classes.alerttext}>
              {errors?.commission?.message}
          </span>
          <input name="commission" className={classes.input} ref={register(
            {
              required: {value: true, message: 'Commission is required'}
            }
          )} placeholder='Commission'defaultValue={agent.commission}/>
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
          )} placeholder='Email'defaultValue={agent.email} readOnly/> 
          <FormControlLabel
            control={
              <Switch
                checked={state}
                onChange={handleChange}
                name="isTransferAllow"
                color="primary"
                inputRef={register}
              />
            }
            label="Allow Transfer"
          />           
          <Controller
            className={classes.inputcmb}
            as={ReactSelect}
            options={statusOptions}
            name="status"
            isClearable
            control={control}
            placeholder='Status'
            rules={{ required: true }}
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
            UPDATE
          </Button>
        </form>
        {showError()}
      </div>
    </Container>
  ) : null;
}

export default withRouter(EditAgentForm);