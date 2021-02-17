import React,{useEffect,useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { setMenuState } from "../redux/AgentDucks";
import { getAgentMessages,getAgentSentMessages,setUnreadMessages } from '../redux/AgentDucks';
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
import moment from 'moment';
import TablePagination from '@material-ui/core/TablePagination';
import clsx from 'clsx';
import NewMessage from './CreateMessage';
import DeleteMessage from './DeleteMessage';


import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const AntTabs = withStyles({
  root: {
    borderBottom: '5px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#072824',
  },
})(Tabs);

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


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    maxWidth: '100%', 
    margin: '0',
    padding: '0',
    verticalAlign: 'top',
  },
  mainDiv: {
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    maxWidth: '100%', 
    margin: '0',
    padding: '0',
    verticalAlign: 'top',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginTop: '50px',
    marginBottom: '30px',
    color: '#333333',
    fontWeight: '700',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    display: 'block',
    boxSizing: 'border-box',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #AAAAAA',
    padding: '10px 15px',
    marginBottom: '10px',
    fontSize: '14px'
  },

  clsfrom:{
    fontWeight:'bold',
    marginLeft: '10px',
    marginTop: '10px',
  },

  clsfromtype:{
    marginLeft: '10px',
    marginTop: '10px',
  },

  clsmessage:{
    marginLeft: '10px',
    marginTop: '10px',
  },

  tablemessage:{
    margin: theme.spacing(3, 3, 3),
  },

  inputcmb: {
    marginTop: '10px'
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#000000',
    backgroundColor: '#FF9A00',
    fontWeight: '700',
    ':hover': {
      backgroundColor: '#FFCC00'
    },
  },

  alerttext: {
    color: 'red'
  },
  tabsst:{
    backgroundColor: 'green',    
  },

}));

const Messages = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const maincontainer = clsx(classes.mainDiv);

  let start = 0;

  const [length, setLength] = useState(10);
  const [page, setPage] = useState(0);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  dispatch(setUnreadMessages(0));

  const handleChangePage = (event, newPage) => {
    start = length * newPage;
    dispatch(getAgentMessages(start,length));
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLength(parseInt(event.target.value, 10));    
    setPage(0);
  };
  
  useEffect(() => {
    dispatch(setMenuState(false))
    dispatch(getAgentMessages(start,length));
    dispatch(getAgentSentMessages(start,length))
  }, [start, length, dispatch])

  const messages = useSelector(store => store.agent.messages);
  const sentmessages = useSelector(store => store.agent.sentmessages);
  const recordsTotal = useSelector(store => store.agent.recordsTotal);
  const recordsTotalSent = useSelector(store => store.agent.recordsTotalSent);


  return (
    <div  className={maincontainer}>
      <div className={classes.root}>
        <AppBar position="static">
          <AntTabs value={value} onChange={handleChange} aria-label="" className={classes.tabsst}>
            <Tab label="Messages" {...a11yProps(0)} />
            <Tab label="Sent" {...a11yProps(1)} />
          </AntTabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div style={{ maxWidth: "100%" }}>
            <NewMessage />
            <MaterialTable
              icons={tableIcons}
              options={{
                headerStyle: {
                  backgroundColor: '#666666',
                  color: '#FFF'
                },
                rowStyle: {
                  fontSize: '16px',
                  marginTop: '2px',
                  marginBottom: '2px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                },
                search: false,
                exportButton: true,
                default: "dense",
                paging:false,
                filtering: true,

              }}
              title={`Messages`}
              columns={[
                { title: "From", field: "from.username", filtering: true,
                cellStyle: {
                  paddingTop: '0px',
                  paddingBottom: '0px',
                },
                },          
                { title: "Date", field: "createdAt", cellStyle: {
                  paddingTop: '0px',
                  paddingBottom: '0px',
                }, filtering: false, render: rowData => moment(rowData.createdAt).format("YYYY/MM/DD HH:mm")},
                { title: 'Action', field: 'action', filtering: false,
                  cellStyle: {
                    paddingTop: '0px',
                    paddingBottom: '0px',
                  }, 
                  render: row => (
                    <DeleteMessage id={row._id} />
                  )
                }
              ]}
              data={messages?messages:[]}
              detailPanel={ (rowData, index) => {
                return (
                  <table className={classes.tablemessage}>
                    <thead>
                      <tr>
                        <td className={classes.clsfrom}>
                          From:
                        </td>
                        <td className={classes.clsfromtype}>
                          {rowData.from.username}
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={classes.clsmessage}>
                        <td colSpan="2">
                          {rowData.message}
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
        </TabPanel>
        <TabPanel value={value} index={1}>
        <div style={{ maxWidth: "100%" }}>
            <NewMessage />
            <MaterialTable
              icons={tableIcons}
              options={{
                headerStyle: {
                  backgroundColor: '#666666',
                  color: '#FFF'
                },
                search: false,
                exportButton: true,
                default: "dense",
                paging:false,
                filtering: true,

              }}
              title={`Sent Messages`}
              columns={[
                { title: "To", field: "to.username", filtering: true},          
                { title: "Date", field: "createdAt", filtering: false, render: rowData => moment(rowData.createdAt).format("YYYY/MM/DD HH:mm")},
                { title: 'Action', field: 'action', filtering: false, 
                  render: row => (
                    <DeleteMessage id={row._id} />
                  )
                }
              ]}
              data={sentmessages?sentmessages:[]}
              detailPanel={ (rowData, index) => {
                return (
                  <table className={classes.tablemessage}>
                    <thead>
                      <tr>
                        <td className={classes.clsfrom}>
                          From:
                        </td>
                        <td className={classes.clsfromtype}>
                          {rowData.from.username}
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={classes.clsmessage}>
                        <td colSpan="2">
                          {rowData.message}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )
              }}
            />
            <TablePagination
              component="div"
              count={recordsTotalSent}
              page={page}
              onChangePage={handleChangePage}
              rowsPerPage={length}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        </TabPanel>
      </div>      
    </div>    
  )
}

export default Messages
