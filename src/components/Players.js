import React, { useState, useEffect, Component } from 'react'
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import HistoryIcon from '@material-ui/icons/History';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';



import { useUserDispatch, signOut } from "./UserContext";
// context
import { useUserState } from "./UserContext";

import { getPlayersByAgent } from '../core/apiCore';
import { SettingsApplications, CenterFocusStrong } from '@material-ui/icons';

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


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function PlayerMenu(playerid) {
  alert(playerid);
}


function Players(props) {

  const classes = useStyles();

  const [playersList, setPlayersList] = useState([]);
  const [error, setError] = useState(false);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);    

  // global
  const { agent } = useUserState();

  const [anchorEl, setAnchorEl] = React.useState(null);

  var userDispatch = useUserDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  const loadPlayers = () => {
    getPlayersByAgent(agent).then(data => {
      if (data.error) {
        setError(data.error);
      } else { 
        const lst = data.data;       
        setPlayersList(lst);
        console.log('RESPUESTAAAAAAAAAAA', lst);
        console.log(data.data);
      }
      
    })
  }

  useEffect(() => {
    loadPlayers();
  }, [])

  return (

    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        icons={tableIcons}
        options={{
          headerStyle: {
            backgroundColor: '#666666',
            color: '#FFF'
          },
          search: true,
          exportButton: true,
          padding: false,
          paging: false,

        }}
        columns={[
          { title: "PlayerID", field: "uniqId" },
          { title: "Username", field: "username" },
          { title: "Agent", field: "agentName"},
          { title: "Balance", field: "chips"},
          {
            title: 'Action',
            field: 'action',
            render: row => (
              <div>
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
                <center><span className={classes.menuheader} >Player:</span>&nbsp;<span className={classes.menuheaderbold} >{row.username}</span></center>
                <StyledMenuItem disabled>&nbsp;</StyledMenuItem>
                <Divider />
                <StyledMenuItem>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Edit Player" />
                </StyledMenuItem>
                <StyledMenuItem>
                  <ListItemIcon>
                    <HistoryIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Game History" />
                </StyledMenuItem>
                <StyledMenuItem>
                  <ListItemIcon>
                    <SwapHorizIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Transaction History" />
                </StyledMenuItem>
                <StyledMenuItem>
                  <ListItemIcon>
                    <GpsFixedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="IP List" />
                </StyledMenuItem>
              </StyledMenu>
              </div>
            ),
          },
        ]}
        data={playersList}
        title="Players"
      />
    </div>
  )
}

export default Players;

