import React, { useEffect } from 'react'
import MaterialTable from "material-table";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import {useDispatch, useSelector} from 'react-redux';
import {getSubsByAgent} from '../redux/AgentDucks';
import AgentMenuEdit from './AgentMenuEdit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  button:{
      color: '#FFFFFF',
      backgroundColor: '#669933',
      fontWeight: '700',
  },
  buttonAdd:{
    color: '#FFFFFF',
    backgroundColor: '#669933',
    fontWeight: '700',
    margin: '5px',    
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
  textcode: {
    display: 'none'
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

  const subsList = useSelector(store => store.agent.subagents);

  const faddAgent = () => {
    var urlred = `/app/addagent`
    window.location.href=urlred;
  }

  const copyLink = (id) => {
    var texto = document.getElementById(id);
    navigator.clipboard.writeText(texto.value).then( () => {
      console.log('copy to clipboard');
    }).catch(() => {
      console.log('error copy to clipboard');
    })   
  }

  const getLink = (code) => {
    return `https://${window.location.href.toString().split('/')[2]}/register.html?accesscode=${code}`;
  }

  return  subsList ? (

    <div style={{ maxWidth: "100%" }}>
      <div style={{ maxWidth: "100%", textAlign: 'right' }}>
        <Button 
          className={classes.buttonAdd} 
          aria-haspopup="true" 
          onClick={() => faddAgent()}
          variant="contained"
          >
            <PersonAddIcon />
          &nbsp;Add Agent
        </Button>
      </div>      
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
          { title: "Access Code", field: "accessCode", filtering: false,
            render: agent => (
              <>
                {`${agent.accessCode} `}
                <Tooltip title="Copy register link">
                  <IconButton onClick={() => copyLink(agent.accessCode)} className={classes.toolbarIcon}>
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip>
                <input type="text" className={classes.textcode} value={getLink(agent.accessCode)} id={agent.accessCode} readOnly></input>
              </>
            )          
          },
          { title: "Username", field: "username", filtering: false},
          { title: "Email", field: "email", filtering: false},
          { title: "Rake %", field: "commission", filtering: false},
          { title: "Active", field: "status", lookup: { "active": 'yes', "Block": 'no' }},
          
          {
            title: '',field: '',filtering: false,
            render: row => (
              <AgentMenuEdit agent={row.username} id={row._id}/>
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

