import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useForm, Controller } from 'react-hook-form';
import { RHFInput } from "react-hook-form-input";
import NumberFormat from "react-number-format";
import {useDispatch,useSelector} from 'react-redux'
import {agentTransfer} from '../redux/AgentDucks';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';



const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: 'green',
    borderColor: 'black',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: 'darkgreen',
      borderColor: 'black',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
  },
})(Button);

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
  botonmobile: {
    fontSize: 12,
  }
}));

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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const TransferChips = ({maxamount,isMobile}) => {

  const {register, unregister, errors, handleSubmit, control, setValue} =  useForm(); 

  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const error = useSelector(store => store.agent.error);
  const messageupdate = useSelector(store => store.agent.messageupdate);

  const onSubmit = (data, e) => {
    e.preventDefault(); 
    dispatch(agentTransfer(data)).then(() => {
      if(document.getElementById('alertmes')){
        document.getElementById('alertmes').style.display='';
      }     
    });     
    setTimeout(() => {
      handleClose()      
    },3000);
  }

  const showError = () => (
    <Alert severity={error ? 'warning' : 'success'} style={{display: (error || messageupdate) ? '': 'none'}} id="alertmes">
      <AlertTitle>{error ? 'Warning' : 'Success'}</AlertTitle>
        {error ? error : messageupdate}<strong>{error ? ' — Check it out!' : ''}</strong>        
    </Alert>
  )

  return (
    <>
      <BootstrapButton variant="contained" color="primary" disableRipple className={isMobile?classes.botonmobile:classes.margin} onClick={handleClickOpen}>
        {`Transfer >`}
      </BootstrapButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Transfer Balance
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You can transfer from your Rake Balance to your Balance.
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
              placeholder={`Amount should be under $${maxamount.toFixed(2)}`}
              as={<NumberFormat />} 
            />
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

export default TransferChips
