import React, { useEffect, Fragment, useState } from 'react'
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
import {useDispatch, useSelector} from 'react-redux';
import { setPlayerInfo, getPlayerGameHistory } from '../redux/PlayerDucks';
import PlayerGameHistoryDetail from './PlayerGameHistoryDetail';
import moment from 'moment';
import TablePagination from '@material-ui/core/TablePagination';

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

const PlayerGameHistory = ({id,username}) => { 

  const dispatch = useDispatch();

  let start = 0;

  const [length, setLength] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    start = length * newPage;
    dispatch(getPlayerGameHistory(start,length));
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLength(parseInt(event.target.value, 10));    
    setPage(0);
  };
  
  useEffect(() => {
    dispatch(setPlayerInfo(id,username));
    dispatch(getPlayerGameHistory(start,length));
  }, [id, username, start, length, dispatch])

  const gamehistorylist = useSelector(store => store.player.gamehistory);
  const recordsTotal = useSelector(store => store.player.recordsTotal);
  
  return gamehistorylist ? (

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
        title={`Game History: ${username.toUpperCase()}`}
        columns={[
          { title: "Id", field: "gameNumber", filtering: true},
          { title: "Small Blind", field: "smallBlind", filtering: false},
          { title: "Big Blind", field: "bigBlind", filtering: false},
          { title: "Status", field: "status", filtering: false},
          { title: "Pot", field: "pot", filtering: false},
          { title: "Date", field: "createdAt", filtering: true, render: rowData => moment(rowData.createdAt).format("YYYY/MM/DD HH:mm")},
          { title: 'Action', field: 'action', filtering: false}
        ]}
        data={gamehistorylist}
        detailPanel={ (rowData, index) => {
          return (
            <Fragment>
                <PlayerGameHistoryDetail gameHistoryDetail={rowData} key={index}/>         
            </Fragment>
          )
        }}
      />
      <TablePagination
        component="div"
        count={recordsTotal}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={length}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  ) : null;
}

export default PlayerGameHistory;
