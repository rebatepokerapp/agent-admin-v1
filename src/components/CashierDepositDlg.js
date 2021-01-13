import React, {useState} from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import QRCode from 'qrcode.react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import {requestDeposit, confirmTxidHash, setWithdrawDepositNull} from '../redux/AgentDucks';
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
    marginTop: '0px',
    minWidth: '100%',
    minHeight: '30px'
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
  results:{
    alignContent: 'center',
    alignItems: 'center',
  },
  results_a:{
    fontSize: '16px',
    color:'green',
    fontWeight: 'bold',
    marginTop: '15px'
  },
  results_b:{
    fontSize: '14px',
    color:'black',
    fontWeight: 'bold',
    marginTop: '15px'
  }
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

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

const CashierDepositDlg = () => {

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const {register, errors, handleSubmit, control} =  useForm();

  const responseDeposit = useSelector(store => store.agent.responseDeposit);
  const responseConfirm = useSelector(store => store.agent.responseConfirm);

  const dispatch = useDispatch();  

  const handleClose = () => {    
    dispatch(setWithdrawDepositNull()).then(() => {
      console.log('DESPACHADO');
    });
    setOpen(false);
  }; 

  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmit = (data, e) => {
    e.preventDefault(); 
    console.log('DATA DEPOSIT', data);
    dispatch(requestDeposit(data)).then(() => {
      if(data.method !== 'BTC'){
        document.getElementById("divconfirm").style.display = 'block';             
      }
      document.getElementById("submitRequest").style.display = 'none';  
    });
  }

  const copyLink = (copytext) => {
    navigator.clipboard.writeText(copytext).then( () => {
      console.log('copy to clipboard');
    }).catch(() => {
      console.log('error copy to clipboard');
    })   
  }

  const updateTransactionId = () => {
    let txid_hash = document.getElementById("txid_hash");
    if(txid_hash){      
      dispatch(confirmTxidHash(txid_hash.value)).then(() => {
        console.log('Trsansaction Id Updated');
        document.getElementById("txid_hash").value=''
        document.getElementById("amount").value=''
        document.getElementById("method").selectedIndex=0
      });
    }    
  } 

  return (
    <>
      <Button 
        className={classes.buttonAdd} 
        aria-haspopup="true" 
        onClick={handleOpen}
        variant="contained"
        >
          <MonetizationOnIcon />
        &nbsp;DEPOSIT
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="sm" fullWidth={true}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography component="h1" variant="h5" className={classes.title}>
          {`DEPOSIT REQUEST`}
          </Typography>          
        </DialogTitle>
        <DialogContent dividers>
          <div style={{ maxWidth: "100%", backgroundColor: "white", alignItems: "center"}}>
            <div className={classes.paper}>
              <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                <p>
                  Select Crypto Currency Type
                  <select name="method" ref={register} className={classes.inputcmb} placeholder='Crypto Currency' defaultValue="-1">
                    <option value="BTC" selected>BITCOIN</option>
                    <option value="ETH">ETHEREUM</option>
                    <option value="USDC">USDC</option>
                  </select>
                </p>
                <p>
                  Amount to deposit in American Dollars $
                  <input name="amount" id="amount" className={classes.input} ref={register} placeholder='Amount' /> 
                </p>
                {responseDeposit?
                <>
                  
                  <div className={classes.results}>
                    <a className={classes.results_a}>Deposit Address: </a>&nbsp;
                    <a className={classes.results_b}>{responseDeposit.result.address}</a>                    
                    <Tooltip title="Copy Address">
                      <IconButton onClick={() => copyLink(responseDeposit?responseDeposit.result.address:null)} className={classes.toolbarIcon}>
                        <FileCopyIcon />
                      </IconButton>
                    </Tooltip>
                    <br/>
                    <QRCode value={responseDeposit.result.address} />                    
                  </div>
                  <div className={classes.results}>
                    <a className={classes.results_a}>Amount in $: </a>&nbsp;
                    <a className={classes.results_b}>{parseFloat(responseDeposit.result.amount).toFixed(2)}</a>
                    <br/>
                    <a className={classes.results_a}>Fee $: </a>&nbsp;
                    <a className={classes.results_b}>{parseFloat(responseDeposit.result.fee).toFixed(2)}</a>
                    <br/>
                    <a className={classes.results_a}>Crypto amount to deposit:</a> &nbsp;
                    <a className={classes.results_b}>{parseFloat(responseDeposit.result.cryptoAmount).toFixed(8)}</a>
                    <Tooltip title="Copy Amount">
                      <IconButton onClick={() => copyLink(responseDeposit?parseFloat(responseDeposit.result.cryptoAmount).toFixed(8).toString():null)} className={classes.toolbarIcon}>
                        <FileCopyIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </>
                :null}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  id="submitRequest"
                  className={classes.submit}
                >
                  REQUEST DEPOSIT ADDRESS
                </Button>
                <div id="divconfirm" style={{display:'none'}}>
                  <input name="txid_hash" id="txid_hash"  className={classes.input} placeholder='Transaction Id or Hash' /> 
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    onClick={() => {updateTransactionId()}}
                  >
                    SEND TRANSACTION ID
                  </Button> 
                  {responseConfirm?
                  <SimpleDialog open={true} message={responseConfirm.message} />
                  :null
                  }
                </div>                     
                
              </form>          
            </div>           
          </div> 
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CashierDepositDlg
