import React, {useEffect} from 'react'
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {useDispatch,useSelector} from 'react-redux'
import { useForm, Controller } from 'react-hook-form';
import {agentTransfer} from '../redux/AgentDucks';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import ReactSelect from "react-select";
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import MenuItem from '@material-ui/core/MenuItem';
import { RHFInput } from "react-hook-form-input";
import NumberFormat from "react-number-format";
import TextField from '@material-ui/core/TextField';
import {agentRequestBalance,setErrorMessage} from '../redux/AgentDucks';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import Tooltip from '@material-ui/core/Tooltip';
import { Visibility } from '@material-ui/icons';


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
    marginTop: '20px',
    marginBottom: '20px',
    color: '#333333',
    fontWeight: 'bold',
    textAlign: 'center'
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
  inputhide: {
    visibility: 'hidden',
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

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#669933',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#FFFFFF',
      },
    },
  },
}))(MenuItem);

const RequestBalanceDlg = ({id,username,isplayer}) => {

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  }; 

  const handleOpen = () => {
    setOpen(true);
  };

  const {register, unregister, errors, handleSubmit, control, setValue} =  useForm(); 

  const classes = useStyles();
  const dispatch = useDispatch();

  const error = useSelector(store => store.agent.error);
  const messageupdate = useSelector(store => store.agent.messageupdate);
  const maxamount = useSelector(store => store.agent.balance);

  const onSubmit = (data, e) => {
    e.preventDefault(); 
    dispatch(agentRequestBalance(data)).then(() => {
      if(document.getElementById('alertmes')){
        document.getElementById('alertmes').style.display='';
      }     
    });     
    setTimeout(() => {
      handleClose()      
    },3000);
  }

  useEffect(() => {  
    dispatch(setErrorMessage(null,null));   
  },[dispatch])

  const showError = () => (
    <Alert severity={error ? 'warning' : 'success'} style={{display: (error || messageupdate) ? '': 'none'}} id="alertmes">
      <AlertTitle>{error ? 'Warning' : 'Success'}</AlertTitle>
        {error ? error : messageupdate}<strong>{error ? '' : ''}</strong>        
    </Alert>
  )

  return (
    <>
      <Tooltip title="Request Balance" aria-label="requestbalance">
        <IconButton className={classes.classbutton} aria-label="requestbalance" onClick={handleOpen}>
          <LocalAtmIcon />
        </IconButton>
      </Tooltip>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="sm" fullWidth={true}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} className={classes.title}>
          {`TRANSFER BALANCE TO ${username.toUpperCase()}`}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You can transfer from your Balance to Sub Agent Balance.
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <span className={classes.alerttext}>
                {errors?.amount?.message}
            </span>
            <span className={classes.alerttext}>
                {errors.amount && errors.amount.type === "max" ? `Max amount is ${maxamount.toFixed(2)}`:''}
            </span>
            <RHFInput 
              register={register(
                {
                  required: {value: true, message: 'Amount required'},
                  min: 0,
                  max: maxamount
                }
              )} 
              unregister={unregister}
              className={classes.input} 
              name="amount" 
              prefix=""
              setValue={setValue}
              thousandSeparator       
              placeholder={`Amount should be under $${maxamount?maxamount.toFixed(2):0}`}
              as={<NumberFormat />} 
            />
            <span className={classes.alerttext}>
                {errors?.note?.message}
            </span>
            <TextField 
              className={classes.inputtextarea}
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="note"
              name="note"
              label="Note"
              size='small'
              multiline
              rows='4'
              inputRef={
                register({
                  required: {value: true, message:'Require field'}
                })
              }
            />
            <input type="text" ref={register} name="requestType" defaultValue="Add" className={classes.inputhide}></input>
            <input type="text" ref={register} name="isplayer" defaultValue={isplayer} className={classes.inputhide}></input>
            <input type="text" ref={register} name="agentId" defaultValue={id} className={classes.inputhide}></input>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              TRANSFER
            </Button>
          </form>
          {showError()}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default RequestBalanceDlg
