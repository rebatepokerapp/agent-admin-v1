import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import MessageIcon from '@material-ui/icons/Message';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import { useUserDispatch, signOut } from "./UserContext";

const useStyles = makeStyles((theme) => ({
    topIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      color: '#FFFFFF',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    menu: {
        backgroundColor: '#333333',
    },
    menuIcon: {
        textAlign: 'left',
        color: '#666666',
    },
    menuText: {
        color: '#333333',
    }, 
}));

export default function AgentMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  var userDispatch = useUserDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton className={classes.topIcon} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <PersonIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={classes.menuText}>Agent: {props.agent.username}</MenuItem>
        <MenuItem disabled>&nbsp;</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}><MessageIcon className={classes.menuIcon}/>&nbsp;&nbsp;&nbsp;<font className={classes.menuText}>Messages</font></MenuItem>
        <MenuItem onClick={handleClose}><LocalAtmIcon className={classes.menuIcon}/>&nbsp;&nbsp;&nbsp;<font className={classes.menuText}>Payments</font></MenuItem>
        <MenuItem onClick={handleClose}><SettingsIcon className={classes.menuIcon}/>&nbsp;&nbsp;&nbsp;<font className={classes.menuText}>Settings</font></MenuItem>
        <MenuItem disabled>&nbsp;</MenuItem>
        <Divider />
        <MenuItem onClick={() => signOut(userDispatch, props.history)}><ExitToAppIcon className={classes.menuIcon}/>&nbsp;&nbsp;&nbsp;<font className={classes.menuText}>Logout</font></MenuItem>
      </Menu>
    </div>
  );
}
