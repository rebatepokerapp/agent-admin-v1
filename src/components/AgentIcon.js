import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import MessageIcon from '@material-ui/icons/Message';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { signOut,setMenuState } from "../redux/AgentDucks";
import {useDispatch,useSelector} from 'react-redux';
import AgentProfileDlg from './AgentProfileDlg';
import { Badge, Typography, Button } from "./Wrappers";

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
    dispatch(setMenuState(!menustate))
  };

  const handleClose = () => {
    dispatch(setMenuState(false))
  };

  const goMessages = () => {    
    window.location.href='/app/messages';
  }

  const menustate = useSelector(store => store.agent.menustate);
  const unreadmessages = useSelector(store => store.agent.unreadmessages);

  console.log('unreadmessages',unreadmessages);
  console.log('menustate',menustate);

  return (
    <div>
      <IconButton className={classes.topIcon} aria-controls="customized-menu" aria-haspopup="true" onClick={handleClick}>
        <Badge
          badgeContent={unreadmessages>0?unreadmessages:null}
          color="warning"
        >
          <PersonIcon/>
        </Badge>
      </IconButton>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(menustate)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <Badge
              badgeContent={unreadmessages>0?unreadmessages:null}
              color="warning"
            >
              <MessageIcon className={classes.menuIcon}/>
            </Badge>            
          </ListItemIcon>
          <ListItemText onClick={() => goMessages()} primary="Messages" />
        </MenuItem>
        <AgentProfileDlg />
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
