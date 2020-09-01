import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import MessageIcon from '@material-ui/icons/Message';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { signOut } from "../redux/AgentDucks";
import {useDispatch} from 'react-redux';

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
    menuheader:{
      color: '#000000',
      fontSize: 'medium',
    },
    menuheaderbold:{
      color: '#000000',
      fontWeight: '700',
      fontSize: 'large',
    },
    menuIcon: {
        textAlign: 'left',
        color: '#666666',
    },
    menuText: {
        color: '#333333',
    }, 
}));

export default function AgentMenu({agent}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton className={classes.topIcon} aria-controls="customized-menu" aria-haspopup="true" onClick={handleClick}>
          <PersonIcon />
      </IconButton>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <MessageIcon className={classes.menuIcon}/>
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
          <LocalAtmIcon className={classes.menuIcon}/>
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon className={classes.menuIcon}/>
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <ExitToAppIcon className={classes.menuIcon}/>
          </ListItemIcon>
          <ListItemText onClick={() => dispatch(signOut())} primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
}
