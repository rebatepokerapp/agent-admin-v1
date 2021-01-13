import React,{useEffect, useState, useLayoutEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import ReactSelect from "react-select";
import {editAgentData,getAgentData,setAgentInfo} from '../redux/AgentDucks';
import {useDispatch, useSelector} from 'react-redux';

import { useForm, Controller } from 'react-hook-form';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { green,grey } from '@material-ui/core/colors';

const GreenSwitch = withStyles({
  switchBase: {
    color: grey[300],
    '&$checked': {
      color: green[500],
    },
    '&$checked + $track': {
      backgroundColor: green[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

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

function EditAgentForm ({id,username,isTransferAllow,allowDeposits,allowWithdrawals,allowTranferPlayer,allowTransferAgent}) {

  const classes = useStyles(); 

  const dispatch = useDispatch(); 

  const agent = useSelector(store => store.agent.data);

  const {register, errors, handleSubmit, control} =  useForm();  

  const error = useSelector(store => store.agent.error);
  const messageupdate = useSelector(store => store.agent.messageupdate);

  console.log('allowDeposits', allowDeposits);
  console.log('allowWithdrawals', allowWithdrawals);
  console.log('allowTranferPlayer', allowTranferPlayer);
  console.log('allowTransferAgent', allowTransferAgent);


  const [state, setState] = useState(isTransferAllow);
  const [stateDeposit, setStateDeposit] = useState(allowDeposits);
  const [stateWithdraw, setStateWithdraw] = useState(allowWithdrawals);
  const [stateAllowTP, setStateAllowTP] = useState(allowTranferPlayer);
  const [stateAllowTA, setStateAllowTA] = useState(allowTransferAgent);

  const handleChangeDeposit = (event) => {
    setStateDeposit(event.target.checked);
  };
  const handleChangeWithdraw = (event) => {
    setStateWithdraw(event.target.checked);
  };
  const handleChangeAllowTP = (event) => {
    setStateAllowTP(event.target.checked);
  };
  const handleChangeAllowTA = (event) => {
    setStateAllowTA(event.target.checked);
  };

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
    agent.allowDeposits = stateDeposit;
    agent.allowWithdrawals = stateWithdraw;
    agent.allowTranferPlayer = stateAllowTP;
    agent.allowTransferAgent = stateAllowTA;
    setTimeout(() => {
      if(document.getElementById('alertmes')){
        document.getElementById('alertmes').style.display='none';
      }      
    },3000);   
  }

  const showError = () => (
    <Alert severity={error ? 'warning' : 'success'} style={{display: (error || messageupdate) ? '': 'none'}} id="alertmes">
      <AlertTitle>{error ? 'Warning' : 'Success'}</AlertTitle>
        {error ? error : messageupdate}<strong>{error ? '' : ''}</strong>        
    </Alert>
  ) 
  
  useLayoutEffect(() => {  
    dispatch(setAgentInfo(id,username));
    dispatch(getAgentData());
  },[])

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
              <GreenSwitch
                checked={state}
                onChange={handleChange}
                name="isTransferAllow"
                color="primary"
                inputRef={register}
              />
            }
            label="Allow Rake to Balance Transfers"
          />
          <br/> 
          <FormControlLabel
            control={
              <GreenSwitch
                checked={stateDeposit}
                onChange={handleChangeDeposit}
                name="allowDeposits"
                color="primary"
                inputRef={register}
              />
            }
            label="Allow Deposits"
          />
          <br/>
          <FormControlLabel
            control={
              <GreenSwitch
                checked={stateWithdraw}
                onChange={handleChangeWithdraw}
                name="allowWithdraws"
                color="primary"
                inputRef={register}
              />
            }
            label="Allow Withdrawals"
          />
          <br/>
          <FormControlLabel
            control={
              <GreenSwitch
                checked={stateAllowTP}
                onChange={handleChangeAllowTP}
                name="allowTransferPlayer"
                color="primary"
                inputRef={register}
              />
            }
            label="Allow Balance Transfers to Players"
          />
          <br/>
          <FormControlLabel
            control={
              <GreenSwitch
                checked={stateAllowTA}
                onChange={handleChangeAllowTA}
                name="allowTransferAgent"
                color="primary"
                inputRef={register}
              />
            }
            label="Allow Balance Transfers to Agents"
          />
          <br/>          
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