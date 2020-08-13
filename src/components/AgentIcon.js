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
import { withStyles } from '@material-ui/core/styles';
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

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
  })((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#669933',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#FFFFFF',
      },
    },
  },
}))(MenuItem);

export default function AgentMenu(props) {
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
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <center><span className={classes.menuheader}>Agent:</span>&nbsp;<span className={classes.menuheaderbold}>{props.agent.username}</span></center>
        <StyledMenuItem disabled>&nbsp;</StyledMenuItem>
        <Divider />
        <StyledMenuItem>
          <ListItemIcon>
            <MessageIcon className={classes.menuIcon}/>
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
          <LocalAtmIcon className={classes.menuIcon}/>
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <SettingsIcon className={classes.menuIcon}/>
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </StyledMenuItem>
        <StyledMenuItem disabled>&nbsp;</StyledMenuItem>
        <Divider />
        <StyledMenuItem>
          <ListItemIcon>
            <ExitToAppIcon className={classes.menuIcon}/>
          </ListItemIcon>
          <ListItemText onClick={() => dispatch(signOut())} primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
