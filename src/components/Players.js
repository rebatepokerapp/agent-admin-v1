import React, { useEffect } from 'react'
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
import PlayerMenuEdit from './PlayerMenuEdit';
//import TableCell from '@material-ui/core/TableCell';
//import TableRow from '@material-ui/core/TableRow';

import {useDispatch, useSelector} from 'react-redux';
import {getPlayersByAgent} from '../redux/AgentDucks';

import AddPlayerDlg from './AddPlayerDlg';


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

//Funcion que pinta la lista de players por agente
function Players() {

  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchData = () => {
      dispatch(getPlayersByAgent())
    }
    fetchData();
  }, [dispatch])

  const playersList = useSelector(store => store.agent.players);
  //let actualAgent = '';
  //var indx = 100000;

  /*const agentHeader = (agentName, i) => {
    if(agentName.toString().trim() !== actualAgent.toString().trim()){
      actualAgent = agentName;
      let ind = indx+1;
      return(
        <>
          <TableRow key={ind}>
            <TableCell align="center" className={classes.header} colSpan={10}>{agentName.toString().toUpperCase()}</TableCell>
          </TableRow>
        </>
      )
    }
  }*/

  return playersList ? (

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
          default: "dense",
          paging:false,
          filtering: true
        }}
        title="PLAYERS"               
        columns={[
          { title: "PlayerID", field: "uniqId", filtering: false},
          { title: "Username", field: "username", filtering: true},
          { title: "Agent", field: "agentName", filtering: true},
          { title: "Balance", field: "chips", filtering: false, render: rowData => 
            <>
            {
              rowData.chips.toFixed(2)
            }
            </>
          },
          { title: "Status", field: "status", filtering: false},
          { field: '', filtering: false,
            render: row => (
              <PlayerMenuEdit id={row._id} username={row.username} allowDeposits={row.allowDeposits} allowWithdrawals={row.allowWithdrawals} />
            ),
            title:<AddPlayerDlg/>,
            sorting: false,           
          },
        ]}
        data={playersList}
      />
    </div>
  ) : null;
}

export default Players;

