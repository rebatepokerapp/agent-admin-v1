import React, {useState} from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import EditAgentForm from './EditAgentForm';


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

const EditAgentFormDlg = ({id,username}) => {

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }; 

  const handleOpen = () => {
    setOpen(true);
  };  

  return username ? (
    <>
      <Tooltip title="Edit Agent" aria-label="editagent">
        <IconButton className={classes.classbutton} aria-label="editagent" onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="sm" fullWidth={true}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography component="h1" variant="h5" className={classes.title}>
          {`EDIT AGENT ${username.toUpperCase()}`}
          </Typography>          
        </DialogTitle>
        <DialogContent dividers>
          <EditAgentForm id={id} username={username}/>
        </DialogContent>
      </Dialog>
    </>
  ) : null;
}

export default EditAgentFormDlg
