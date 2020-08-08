import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { forwardRef } from 'react';
import MaterialTable from "material-table";
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
import { getPlayerGameHistory } from '../core/apiCore';
import GameDetail from './GameDetail';

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

const PlayerGameHistory = () => {
  const { id } = useParams();

  const [gamehistorylist, setGameHistoryList] = useState([]);

  function loadGameHistory () {    
    getPlayerGameHistory(id).then(data => {
      if (data.error) {
        console.log('ERROR ',data.error)
      } else {
        const lst = data.data;
        console.log('GAME HISTORYYYYYYYYY ',lst)      
        setGameHistoryList(lst);
      }      
    })
  }

  useEffect(() => {
    loadGameHistory();
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
          default: "dense",
          paging:false,
          filtering: true,

        }}
        title={`Game History: `}
        columns={[
          { title: "Id", field: "gameNumber", filtering: false},
          { title: "Small Blind", field: "smallBlind", filtering: false},
          { title: "Big Blind", field: "bigBlind", filtering: false},
          { title: "Status", field: "status", filtering: false},
          { title: "Pot", field: "pot", filtering: true},
          { title: "Date", field: "createdAt", filtering: true},
          { title: 'Action', field: 'action', filtering: false}
        ]}
        data={gamehistorylist}
        detailPanel={rowData => {
          return (
            <Fragment>
              {rowData.players.map( (row, index) => {
                return(
                <div key={index}>
                  <div>
                    {row.playerName}
                  </div>
                  <div>
                    <img src={`/card/${row.cards[0]}.png`} width="50px"></img> - <img src={`/card/${row.cards[1]}.png`} width="50px"></img>
                  </div>
                </div>
                )
              })}              
            </Fragment>
          )
        }}
      />
    </div>
  )
}

export default PlayerGameHistory;
