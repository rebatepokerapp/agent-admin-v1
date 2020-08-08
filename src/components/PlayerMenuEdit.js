import React, { Fragment, useState } from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import HistoryIcon from '@material-ui/icons/History';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { Redirect, Route } from 'react-router-dom';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
  })((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
  button:{
      color: '#FFFFFF',
      backgroundColor: '#669933',
      fontWeight: '700',
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
}));

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

//Crea el componente de menu para los player en el player list
const PlayerMenuEdit = (props) => {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {    
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (from,id) => {    
    setAnchorEl(null);
    if(from === 'GH'){
      var urlred = `/app/gameHistory/${id}`
      window.location.href=urlred;
    }           
  };  

  return (
    <Fragment>
      <Button 
        className={classes.button} 
        aria-haspopup="true" 
        onClick={handleClick}
        aria-controls="customized-menu"
        variant="contained"
        >
          <ArrowForwardIosIcon />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose}
      >
        <center><span className={classes.menuheader} >Player:</span>&nbsp;<span className={classes.menuheaderbold} >{props.player}</span></center>
        <StyledMenuItem disabled>&nbsp;</StyledMenuItem>
        <Divider />
        <StyledMenuItem onClick={() => handleClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit Player"/>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleClose('GH',props.id)}>
          <ListItemIcon>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Game History" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleClose}>
          <ListItemIcon>
            <SwapHorizIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Transaction History" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleClose}>
          <ListItemIcon>
            <GpsFixedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="IP List" />
        </StyledMenuItem>
      </StyledMenu>
    </Fragment>
  )
}

export default PlayerMenuEdit
