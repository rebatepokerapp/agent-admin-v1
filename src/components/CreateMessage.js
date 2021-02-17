import React, {useState,useEffect} from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MessageIcon from '@material-ui/icons/Message';
import { useForm } from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux'
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { green,grey } from '@material-ui/core/colors';
import {KeyboardDatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {getAgentsForMessages,getPlayersByAgent,sendAgentMessage} from '../redux/AgentDucks';
import moment from 'moment';

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
    fontWeight: '700',
    textAlign: 'center',
    fontSize: '24px'
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

  inputcmboculto: {
    marginTop: '0px',
    minWidth: '100%',
    minHeight: '30px',
    display:'none',
  },

  submit: {
    margin: theme.spacing(3, 1, 2),
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
  },
  ocultar:{
    display:'none',
  },
  popup:{
    marginTop:'10px',
    marginLeft:'10px',
    marginRight: '10px',
    marginBottom: '10px',
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

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={opendlg}>
      <DialogTitle id="simple-dialog-title">Agent Admin Message</DialogTitle>
      <div className={useStyles().popup}>
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

  const [expires, setExpires] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [showmsg, setShowMsg] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChangeExpire = (event) => {
    setExpires(event.target.checked);
  };

  const {register, errors, handleSubmit} =  useForm();

  const dispatch = useDispatch();  

  const handleClose = () => {        
    setOpen(false);
  }; 

  const handleOpen = () => {
    setOpen(true);
  };    

  const loadType = (e) => {
    const ltype = parseInt(e.target.value);
    if(ltype === 2){
      if(document.getElementById("selectionidagent") !== null){
        document.getElementById("selectionidagent").style.display = 'block';
      }
      if(document.getElementById("labelagentcombo") !== null){
        document.getElementById("labelagentcombo").style.display = 'block';
      }
      if(document.getElementById("selectionidplayer") !== null){
        document.getElementById("selectionidplayer").style.display = 'none';
      }
      if(document.getElementById("labelplayercombo") !== null){
        document.getElementById("labelplayercombo").style.display = 'none';
      }        
    }else if(ltype === 3){
      if(document.getElementById("selectionidagent") !== null){
        document.getElementById("selectionidagent").style.display = 'none';
      }
      if(document.getElementById("labelagentcombo") !== null){
        document.getElementById("labelagentcombo").style.display = 'none';
      }
      if(document.getElementById("selectionidplayer") !== null){
        document.getElementById("selectionidplayer").style.display = 'block';
      }
      if(document.getElementById("labelplayercombo") !== null){
        document.getElementById("labelplayercombo").style.display = 'block';
      }       
    }else if(ltype === 0){
      if(document.getElementById("selectionidagent") !== null){
        document.getElementById("selectionidagent").style.display = 'none';
      }
      if(document.getElementById("labelagentcombo") !== null){
        document.getElementById("labelagentcombo").style.display = 'none';
      }
      if(document.getElementById("selectionidplayer") !== null){
        document.getElementById("selectionidplayer").style.display = 'none';
      }
      if(document.getElementById("labelplayercombo") !== null){
        document.getElementById("labelplayercombo").style.display = 'none';
      }       
    }else if(ltype === 1){
      if(document.getElementById("selectionidagent") !== null){
        document.getElementById("selectionidagent").style.display = 'none';
      }
      if(document.getElementById("labelagentcombo") !== null){
        document.getElementById("labelagentcombo").style.display = 'none';
      }
      if(document.getElementById("selectionidplayer") !== null){
        document.getElementById("selectionidplayer").style.display = 'none';
      }
      if(document.getElementById("labelplayercombo") !== null){
        document.getElementById("labelplayercombo").style.display = 'none';
      }        
    }
  }

  const onSubmit = (data, e) => {
    e.preventDefault();
    data.expirationdate = moment(selectedDate).format('MM/DD/yyyy');
    dispatch(sendAgentMessage(data)).then(() => {
      setShowMsg(true);
      setTimeout(() => {
        handleClose();      
      },6000);      
    });
  }
  
  useEffect(() => {
    const fetchData = () => {
      dispatch(getAgentsForMessages())
      dispatch(getPlayersByAgent())
    }
    fetchData();    
  }, [dispatch])

  let playersList = useSelector(store => store.agent.players);
  
  let agentsList = useSelector(store => store.agent.agentsmessages);

  return (
    <>
      <Button 
        className={classes.buttonAdd} 
        aria-haspopup="true" 
        onClick={handleOpen}
        variant="contained"
        >
          <MessageIcon />
        &nbsp;New Message
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="md" fullWidth={true}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography className={classes.title}>
          {`NEW MESSAGE`}
          </Typography>          
        </DialogTitle>
        <DialogContent dividers>
          <div style={{ maxWidth: "100%", backgroundColor: "white", alignItems: "center"}}>
            <div className={classes.paper}>
              <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="type">To:</label>
                <select name="type" id="type" ref={register} className={classes.inputcmb} placeholder='Crypto Currency' defaultValue="0" onChange={loadType}>
                  <option value="0">ADMIN</option>
                  <option value="1">SUPPORT</option>
                  <option value="2">AGENT</option>
                  <option value="3">PLAYER</option>
                </select>
                {agentsList?agentsList.length>0?
                  (
                    <>
                    <label htmlFor="selectionidagent" id="labelagentcombo" className={classes.ocultar}>Agent:</label>
                    <select name="selectionidagent" id="selectionidagent" ref={register} className={classes.inputcmboculto} placeholder='Agent' defaultValue="0">
                      {agentsList.map( item => (
                        <option value={item._id.toString()}>{item.username}</option>
                      ))}
                    </select>
                    </>
                  )
                  :null:null
                }

                {playersList?playersList.length>0?
                  (
                    <>
                    <label htmlFor="selectionidplayer" id="labelplayercombo" className={classes.ocultar}>Player:</label>
                    <select name="selectionidplayer" id="selectionidplayer" ref={register} className={classes.inputcmboculto} placeholder='Player' defaultValue="0">
                      {playersList.map( item => (
                        <option value={item._id.toString()}>{item.username}</option>
                      ))}
                    </select>
                    </>
                  )
                  :null:null
                }
                              
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <FormControlLabel
                      control={
                        <GreenSwitch
                          checked={expires}
                          onChange={handleChangeExpire}
                          name="expire"
                          color="primary"
                          inputRef={register}
                        />
                      }
                      label="Expire"
                    />
                    <KeyboardDatePicker
                      disableToolbar
                      inputRef={register}
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="expirationdate"
                      name="expirationdate"
                      label="Expiration Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}                      
                    />
                  </Grid>
                </MuiPickersUtilsProvider>                                  
                Message:
                <TextField 
                  className={classes.inputtextarea}
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="message"
                  name="message"
                  label=""
                  size='small'
                  multiline
                  rows='8'
                  inputRef={
                    register({
                      required: {value: true, message:'Require field'}
                    })
                  }
                /> 
                <span className={classes.alerttext}>
                    {errors?.amount?.message}
                </span>                
                <Button
                  type="submit"              
                  variant="contained"
                  id="submitRequest"
                  className={classes.submit}
                >
                  SEND MESSAGE
                </Button>
                <Button
                  type="button"                  
                  variant="contained"
                  id="submitRequest"
                  className={classes.submit}
                  onClick={() => handleClose()}
                >
                  CANCEL
                </Button>                                     
                {showmsg?
                  <SimpleDialog open={true} message={'Mensaje Enviado'} />
                  :null
                }
              </form>          
            </div>           
          </div> 
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CashierDepositDlg