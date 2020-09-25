import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import PlayerGameHistory from './PlayerGameHistory';
import HistoryIcon from '@material-ui/icons/History';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: 'green'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  classbutton: {
    color: 'green'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PlayerGameHistoryDlg = ({id,username}) => {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  }; 

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Tooltip title="Game History" aria-label="gamehistory">
        <IconButton className={classes.classbutton} aria-label="gamehistory" onClick={handleOpen}>
          <HistoryIcon />
        </IconButton>
      </Tooltip>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {`GAME HISTORY ${username.toUpperCase()}`}
            </Typography>
          </Toolbar>
        </AppBar>
        <PlayerGameHistory id={id} username={username}/>
      </Dialog>
    </>
  )
}

export default PlayerGameHistoryDlg
