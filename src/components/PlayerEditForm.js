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
import {editPlayerData} from '../redux/PlayerDucks';
import {useDispatch, useSelector} from 'react-redux'

import { useForm, Controller } from 'react-hook-form';

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

const genderOptions = [
  {value:"male", label:"Male"},
  {value:"female", label:"Female"}
]

const statusOptions = [
  {value:"active", label:"Active"},
  {value:"block", label:"Block"}
]

function PlayerEditForm (props) {

  let {player} = props;
  const classes = useStyles();

  let showAlert = false;

  const dispatch = useDispatch();

  const {register, errors, handleSubmit, control} =  useForm();  

  const error = useSelector(store => store.player.error);
  const messageupdate = useSelector(store => store.player.messageupdate);

  if(error || messageupdate){
    showAlert = true;
  }else{
    showAlert = false;
  }

  const onSubmit = (data, e) => {
    e.preventDefault();    
    dispatch(editPlayerData(data)).then(() => {
      document.getElementById('alertmes').style.display='';
    });
    player.name = data.name;
    player.lastname = data.lastname; 
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          EDIT PLAYER
        </Typography>
         
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <input name="username" className={classes.input} ref={register} placeholder='Username' defaultValue={player.username} readOnly/>
          <input name="firstname" className={classes.input} ref={register} placeholder='Firstname'defaultValue={player.firstname}/>
          <input name="lastname" className={classes.input} ref={register} placeholder='Lastname'defaultValue={player.lastname}/>
          <input name="email" className={classes.input} ref={register} placeholder='Email'defaultValue={player.email} readOnly/>          
          <Controller
            as={ReactSelect}
            options={genderOptions}
            name="gender"
            isClearable
            control={control}
            placeholder='Gender'
            defaultValue={() => {
              if(player.gender === 'male'){
                return {value: 'male', label: 'Male'};
              }else if(player.gender === 'female'){
                return {value: 'female', label: 'female'};
              }else{
                return null;
              }
            }}
          />
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
  );
}

export default withRouter(PlayerEditForm);