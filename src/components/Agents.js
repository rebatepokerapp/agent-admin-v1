import React, { useEffect } from 'react'
import MaterialTable from "material-table";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import HistoryIcon from '@material-ui/icons/History';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import NotesIcon from '@material-ui/icons/Notes';
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

import {useDispatch, useSelector} from 'react-redux';
import {getSubsByAgent} from '../redux/AgentDucks';

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

function Agents() {

  const classes = useStyles();

  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchData = () => {
      dispatch(getSubsByAgent())
    }
    fetchData();
  }, [dispatch])

  const subsList = useSelector(store => store.agent.subagents).data;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (from,id,agent) => {    
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

  return  subsList ? (

    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        icons={tableIcons}
        options={{
          headerStyle: {
            backgroundColor: '#666666',
            color: '#FFF'
          },
          filterCellStyle: {
            backgroundColor: '#999999',
            color: '#FFF',
            borderColor: '#666666',
            borderBlockColor: '#666666',
          },
          search: true,
          exportButton: true,
          paging: false,
          filtering: true,        
        }}
        columns={[
          { title: "Access Code", field: "accessCode", filtering: false},
          { title: "Username", field: "username", filtering: false},
          { title: "Email", field: "email", filtering: false},
          { title: "Rake %", field: "commission", filtering: false},
          { title: "Active", field: "status", lookup: { "active": 'yes', "Block": 'no' }},
          
          {
            title: '',field: '',filtering: false,
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
              <Menu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem  onClick={() => handleClose('EA',row._id,row.username)}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Edit Agent" />
                </MenuItem>
                <MenuItem onClick={() => handleClose('RH',row._id,row.username)}>
                  <ListItemIcon>
                    <HistoryIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Rake History" />
                </MenuItem>
                <MenuItem onClick={() => handleClose('CH',row._id,row.username)}>
                  <ListItemIcon>
                    <HistoryIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Cash History" />
                </MenuItem>
                <MenuItem onClick={() => handleClose('TC',row._id,row.username)}>
                  <ListItemIcon>
                    <AttachMoneyIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Transfer Chips" />
                </MenuItem>
                <MenuItem onClick={() => handleClose('RC',row._id,row.username)}>
                  <ListItemIcon>
                    <AttachMoneyIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Request Cash" />
                </MenuItem>
                <MenuItem onClick={() => handleClose('CN',row._id,row.username)}>
                  <ListItemIcon>
                    <NotesIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Edit Chips Notes" />
                </MenuItem>
              </Menu>
              </div>
            ),
          },
        ]}
        data={subsList}
        title="Agents"
      />
    </div>
  ) : null
}

export default Agents;

