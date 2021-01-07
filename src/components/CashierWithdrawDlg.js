import React, {useState} from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import {requestPayout} from '../redux/AgentDucks';
import { useForm, Controller } from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux'
import ReactSelect from "react-select";
import DialogActions from '@material-ui/core/DialogActions';

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
    marginTop: '0px'
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
  },
  buttonAdd:{
    color: '#FFFFFF',
    backgroundColor: '#669933',
    fontWeight: '700',
    margin: '5px',
    minWidth: '175px',
    '&:hover': {
      background: "green"
    },  
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const methodOptions = [
  {value:"BTC", label:"BITCOIN"},
  {value:"ETH", label:"ETHEREUM"},
  {value:"USDC", label:"USDC"}
]

function SimpleDialog(props) {
  //const classes = useStyles();
  const { open, message } = props;

  const [opendlg, setOpenDlg] = useState(open);

  const handleClose = () => {
    setOpenDlg(false);
  };

  console.log('LLAMADO', open);

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={opendlg}>
      <DialogTitle id="simple-dialog-title">Agent Admin Message</DialogTitle>
      <div>
        {message}
      </div>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const CashierWithdrawDlg = () => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const {register: register2, errors: errors2, handleSubmit: handleSubmit2, control: control2} =  useForm();

  const onSubmit2 = (data, e) => {
    e.preventDefault();  
    console.log('DATA WITHDRAW', data);
    dispatch(requestPayout(data)).then(() => {
      console.log('DESPACHADO PAYOUT');
    });         
  }; 

  const handleClose = () => {
    setOpen(false);
  }; 

  const handleOpen = () => {
    setOpen(true);
  };

  const responseWithdraw = useSelector(store => store.agent.responseWithdraw);

  return (
    <>
      <Button 
        className={classes.buttonAdd} 
        aria-haspopup="true" 
        onClick={handleOpen}
        variant="contained"
        >
          <GetAppIcon />
        &nbsp;WITHDRAWALS
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="sm" fullWidth={true}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography component="h1" variant="h5" className={classes.title}>
          {`REQUEST WITHDRAW`}
          </Typography>          
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.paper}>
            <form className={classes.form} noValidate onSubmit={handleSubmit2(onSubmit2)}>
              <Controller
                className={classes.inputcmb}
                as={ReactSelect}
                options={methodOptions}
                name="method"
                isClearable
                control={control2}
                placeholder='Crypto Currency'
                rules={{ required: true }}            
              />
              <input name="amount" className={classes.input} ref={register2} placeholder='Amount' /> 

              <input name="address" className={classes.input} ref={register2} placeholder='Address'/>
                            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                REQUEST WITHDRAW
              </Button>
            </form>
            {responseWithdraw?
              <>
                {<SimpleDialog open={true} message={responseWithdraw.message} />}
                <div className={classes.results}>
                  <a className={classes.results_a}>Deposit Address: </a>
                  {responseWithdraw.result.address}
                  <br/>                                      
                  <a className={classes.results_a}>Amount to deposit in $: </a>
                  {parseFloat(responseWithdraw.result.amount).toFixed(2)}
                  <br/>
                  <a className={classes.results_a}>Fee $: </a>
                  {parseFloat(responseWithdraw.result.fee).toFixed(2)}
                  <br/>
                  <a className={classes.results_a}>Crypto amount to deposit:</a> 
                  {parseFloat(responseWithdraw.result.cryptoAmount).toFixed(8)}
                </div>
              </>
            :null}
          </div> 
        </DialogContent>
      </Dialog>
    </>
    
  )
}

export default CashierWithdrawDlg
