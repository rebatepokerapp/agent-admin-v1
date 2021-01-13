import React, {useState,useEffect} from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { useForm, Controller } from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactSelect from "react-select";
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import {setMenuState,getAgentData,setAgentInfo,setErrorMessage,agentChangePassword,editAgentData} from '../redux/AgentDucks';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

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
  classbutton: {
    color: 'green'
  }
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const statusOptions = [
  {value:"active", label:"Active"},
  {value:"block", label:"Block"}
]

const AgentProfileDlg = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {register, errors, handleSubmit, control} =  useForm(); 
  
  const {register:register2, errors:errors2, handleSubmit:handleSubmit2} =  useForm();

  const agent = useSelector(store => store.agent.agentsession);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  

  const handleOpen = () => {
    setOpen(true);
    dispatch(setMenuState(false))
  }; 
  
  const onSubmit = (data, e) => {
    e.preventDefault();    
    dispatch(editAgentData(data)).then(() => {
      if(document.getElementById('alertmes')){
        document.getElementById('alertmes').style.display='';
      }      
    });
    agent.firstname = data.firstname;
    agent.lastname = data.lastname;
    agent.username = data.username;
    agent.email = data.email;
    setTimeout(() => {
      if(document.getElementById('alertmes')){
        document.getElementById('alertmes').style.display='none';
      }      
    },3000);
  }

  const onSubmitPassword = (data, e) => {
    let errorvalidation = null;
    e.preventDefault();    
    if(data.password !== data.confirmpassword){
      errorvalidation = 'Password and confirmation are different.';
      document.getElementById('password').value = '';
      document.getElementById('confirmpassword').value = '';
      document.getElementById('password').focus();
      dispatch(setErrorMessage(errorvalidation,null));
    }else if(data.password.length < 5){
      errorvalidation = 'Password must have at leats 5 characteres.';
      document.getElementById('password').value = '';
      document.getElementById('confirmpassword').value = '';
      document.getElementById('password').focus();
      dispatch(setErrorMessage(errorvalidation,null));
    }else{
      dispatch(agentChangePassword(data)).then(() => {
        document.getElementById('password').value = '';
        document.getElementById('confirmpassword').value = '';
      });
    }
    setTimeout(() => {
      dispatch(setErrorMessage(null,null));     
    },3000);
  }

  const error = useSelector(store => store.agent.error);
  const messageupdate = useSelector(store => store.agent.messageupdate);

  const showError = () => (
    <Alert severity={error ? 'warning' : 'success'} style={{display: (error || messageupdate) ? '': 'none'}} id="alertmes">
      <AlertTitle>{error ? 'Warning' : 'Success'}</AlertTitle>
        {error ? error : messageupdate}        
    </Alert>
  )

  return agent ? (
    <>
      <MenuItem onClick={handleOpen}>
        <ListItemIcon>
          <SettingsIcon className={classes.menuIcon}/>
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </MenuItem>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="sm" fullWidth={true}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography component="h1" variant="h5" className={classes.title}>
          {`PROFILE ${agent.username.toUpperCase()}`}
          </Typography>          
        </DialogTitle>
        <DialogContent dividers>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} name='formnormaldata'>
              <input name="username" className={classes.input} ref={register} placeholder='Username' defaultValue={agent.username} readOnly/>
              <input name="firstname" className={classes.input} ref={register} placeholder='Firstname'defaultValue={agent.firstname}/>
              <input name="lastname" className={classes.input} ref={register} placeholder='Lastname'defaultValue={agent.lastname}/>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                UPDATE
              </Button>
            </form>
          </div>

          <div className={classes.paper}>
            <form className={classes.form} noValidate onSubmit={handleSubmit2(onSubmitPassword)} name='formchangepassword'> 
              <span className={classes.alerttext}>
                {errors2?.password?.message}
              </span>                                
              <input name="password" id="password" className={classes.input} ref={register2(
                {
                  required: {value: true, message: 'Password is required'}
                }
                )} placeholder='Password' type='password' 
              />
              <span className={classes.alerttext}>
                {errors2?.confirmpassword?.message}
              </span>
              <input name="confirmpassword" id="confirmpassword" className={classes.input} ref={register2(
                {
                  required: {value: true, message: 'Confirmation is required'}
                }
                )} placeholder='Confirm Password' type='password' />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                UPDATE PASSWORD
              </Button>
            </form>
            {showError()}
          </div>
        </Container>
        </DialogContent>
      </Dialog>
    </>
  ) : null;
}

export default AgentProfileDlg
