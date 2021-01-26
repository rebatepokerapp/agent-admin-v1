import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import ReactSelect from "react-select";
import {editPlayerData,getPlayerData,setPlayerInfo} from '../redux/PlayerDucks';
import {useDispatch, useSelector} from 'react-redux'

import { useForm, Controller } from 'react-hook-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { green } from '@material-ui/core/colors';

const GreenSwitch = withStyles({
  switchBase: {
    color: green[300],
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
    marginTop:'20px',
    marginBottom:'80px',
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

function PlayerEditForm ({id,username,allowDeposits,allowWithdrawals,setChanges}) {

  const classes = useStyles();

  const dispatch = useDispatch();

  let allowD = false;
  let allowW = false;

  if(allowDeposits){
    if(allowDeposits === true){
      allowD = true;
    }
  }

  if(allowWithdrawals){
    if(allowWithdrawals === true){
      allowW = true;
    }
  }

  const [stateDeposit, setStateDeposit] = useState(allowD);
  const [stateWithdraw, setStateWithdraw] = useState(allowW);

  const handleChangeDeposit = (event) => {
    setStateDeposit(event.target.checked);
  };
  const handleChangeWithdraw = (event) => {
    setStateWithdraw(event.target.checked);
  };

  const {register, handleSubmit, control} =  useForm();  

  useEffect(() => {
    dispatch(setPlayerInfo(id,username));
    dispatch(getPlayerData())
  },[id, username, dispatch])

  const player = useSelector(store => store.player.data);

  const error = useSelector(store => store.player.error);
  const messageupdate = useSelector(store => store.player.messageupdate);

  const onSubmit = (data, e) => {
    e.preventDefault();    
    dispatch(editPlayerData(data)).then(() => {
      document.getElementById('alertmes').style.display='';
    });
    player.name = data.name;
    player.lastname = data.lastname; 
    player.email = data.email;
    player.returnPercentageRake = data.returnpercentagerake;
    player.status = data.status.value;
    allowDeposits = data.allowDeposits;
    allowWithdrawals = data.allowWithdraws;
    setChanges(true);
    setTimeout(() => {
      document.getElementById('alertmes').style.display='none';
    },6000);   
  }

  const showError = () => (
    <Alert severity={error ? 'warning' : 'success'} style={{display: (error || messageupdate) ? '': 'none'}} id="alertmes">
      <AlertTitle>{error ? 'Warning' : 'Success'}</AlertTitle>
        {error ? error : messageupdate}<strong>{error ? '' : ''}</strong>        
    </Alert>
  )

  return player ? (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <input name="username" className={classes.input} ref={register} placeholder='Username' defaultValue={player.username} readOnly/>
          <input name="firstname" className={classes.input} ref={register} placeholder='Firstname'defaultValue={player.firstname}/>
          <input name="lastname" className={classes.input} ref={register} placeholder='Lastname'defaultValue={player.lastname}/>
          <input name="email" className={classes.input} ref={register} placeholder='Email'defaultValue={player.email} readOnly/>
          <input name="returnpercentagerake" className={classes.input} ref={register} placeholder='Rake Back Percentage' defaultValue={player.returnPercentageRake} type="number"/>          
          <Controller
            className={classes.inputcmb}
            as={ReactSelect}
            options={statusOptions}
            name="status"
            isClearable
            control={control}
            placeholder='Status'
            defaultValue={() => {
              if(player.status === 'active'){
                return {value: 'active', label: 'Active'};
              }else{
                return {value: 'block', label: 'Block'}
              }
            }}
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

export default withRouter(PlayerEditForm);