import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import ReactSelect from "react-select";
import { useForm, Controller } from 'react-hook-form';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useDispatch, useSelector} from 'react-redux'
import clsx from 'clsx';
import {addAgentData} from '../redux/AgentDucks';
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

const AddAgent = ({setChanges}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const maincontainer = clsx(classes.main);

  const [stateDeposit, setStateDeposit] = useState(false);
  const [stateWithdraw, setStateWithdraw] = useState(false);
  const [stateAllowTP, setStateAllowTP] = useState(false);
  const [stateAllowTA, setStateAllowTA] = useState(false);
  const [stateRake, setStateRake] = useState(false);

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
  const handleChangeRake = (event) => {
    setStateRake(event.target.checked);
  };

  const {register, errors, handleSubmit, control} =  useForm();

  const error = useSelector(store => store.agent.error);
  const messageupdate = useSelector(store => store.agent.messageupdate);

  const onSubmit = (data, e) => {
    e.preventDefault();    
    dispatch(addAgentData(data)).then(() => {
      e.target.reset();
      setChanges(true);
      if(messageupdate === 'Agent inserted'){
        window.location.href='/app/agents';
      }      
    });   
  }

  const showError = () => (
    <Alert severity={error ? 'warning' : 'success'} style={{display: (error || messageupdate) ? '': 'none'}} id="alertmes">
      <AlertTitle>{error ? 'Warning' : 'Success'}</AlertTitle>
        {error ? error : messageupdate}<strong>{error ? '' : ''}</strong>        
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
            <FormControlLabel
              control={
                <GreenSwitch
                  checked={stateRake}
                  onChange={handleChangeRake}
                  name="allowRake"
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
