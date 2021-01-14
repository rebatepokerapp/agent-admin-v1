import React from 'react'
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddAgent from './AddAgent';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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
  buttonAdd:{
    color: '#FFFFFF',
    backgroundColor: '#669933',
    fontWeight: '700',
    margin: '5px',    
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const AddAgentDlg = () => {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [changes, setChanges] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    if(changes){
      window.location.replace(`${window.location.href}`);
    }    
  }; 

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button 
        className={classes.buttonAdd} 
        aria-haspopup="true" 
        onClick={handleOpen}
        variant="contained"
        >
          <PersonAddIcon />
        &nbsp;Add Agent
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="sm" fullWidth={true}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography className={classes.title}>
            ADD AGENT
          </Typography>          
        </DialogTitle>
        <DialogContent dividers>
          <AddAgent setChanges={setChanges}/>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddAgentDlg
