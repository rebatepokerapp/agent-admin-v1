import React, { Fragment, useState } from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
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
const AgentMenuEdit = ({ id, agent }) => {

  const classes = useStyles(); 

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => { 
    if (event.currentTarget)   {
      setAnchorEl(event.currentTarget);
    }    
  };

  const handleClose = (from,id,player) => {    
    setAnchorEl(null);
    if(from === 'EA'){
      var urlred = `/app/editagent/${id}&${agent}`
      window.location.href=urlred;
    } else if(from === 'RH') {
      urlred = `/app/rakehistory/${id}&${agent}`
      window.location.href=urlred;
    } else if(from === 'CH') {
      urlred = `/app/cashhistory/${id}&${agent}`
      window.location.href=urlred;
    } else if(from === 'TC') {
      urlred = `/app/transferchips/${id}&${agent}`
      window.location.href=urlred;
    } else if(from === 'RC') {
      urlred = `/app/requestcash/${id}&${agent}`
      window.location.href=urlred;
    } else if(from === 'CN') {
      urlred = `/app/chipsnotes/${id}&${agent}`
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
        onClose={handleClose}
      >
        <center><span className={classes.menuheader} >Agent:</span>&nbsp;<span className={classes.menuheaderbold} >{agent}</span></center>
        <StyledMenuItem disabled>&nbsp;</StyledMenuItem>
        <Divider />
        <StyledMenuItem onClick={() => handleClose('EA',id,agent)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit Agent"/>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleClose('RH',id,agent)}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Rake History"/>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleClose('CH',id,agent)}>
          <ListItemIcon>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cash History" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleClose('TC',id,agent)}>
          <ListItemIcon>
            <GpsFixedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Transfer Chips" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleClose('RC',id,agent)}>
          <ListItemIcon>
            <SwapHorizIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Request Cash" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleClose('CN',id,agent)}>
          <ListItemIcon>
            <GpsFixedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit Chips Notes" />
        </StyledMenuItem>
      </StyledMenu>
    </Fragment>
  )
}

export default AgentMenuEdit
