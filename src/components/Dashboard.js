import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import AgentMenu from './AgentIcon';
import MainDash from './MainDash';

import Agents from './Agents';
import Players from './Players';
import Transactions from './Transactions';
import Accounting from './Accounting';
import Settings from './Settings';
import RakeFigures from './RakeFigures';
import PlayerGameHistory from './PlayerGameHistory';
import PlayerCashTransHistory from './PlayerCashTransHistory';
import PlayerIpLoginHistory from './PlayerIpLoginHistory';
import PlayerEditForm from './PlayerOptions';
import PlayerProfileInfo from './PlayerProfileInfo';
import EditAgent from './EditAgent';
import SubRakeHistory from './SubRakeHistory';
import PlayerTransferChips from './PlayerTransferChips';
import AddAgent from './AddAgent';
import AddPlayer from './AddPlayer';
import AgentCashTransactionHistory from './AgentCashTransactionHistory';
import agentCashier from './AgentCashier';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AgentCashHistory from './AgentCashHistory';
import TransferChips from './TransferChips';
import {isMobile} from 'react-device-detect';
import {getAgentBalances} from '../redux/AgentDucks';
import {useDispatch, useSelector} from 'react-redux'


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  topIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: '#FFFFFF',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: '#669933',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'linear-gradient(45deg, #333333 30%, #000000 90%)',
    color: '#669933',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 0,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    color: '#FFFFFF',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: 'linear-gradient(45deg, #000000 30%, #333333 90%)',
    color: '#FFFFFF',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  access: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: '#FFA900',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  textcode: {
    display: 'none'
  },
  balance: {
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  balancemobil: {
    color: 'white',
    fontSize: '11px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
  }
}));

export default function Dashboard() {
  const classes = useStyles();  

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  }; 

  const agent = useSelector(store => store.agent.agentsession);
  const balance = useSelector(store => store.agent.balance);
  const rakebalance = useSelector(store => store.agent.rakebalance);

  const copyLink = () => {
    var texto = document.getElementById('accesscod');
    navigator.clipboard.writeText(texto.value).then( () => {
      console.log('copy to clipboard');
    }).catch(() => {
      console.log('error copy to clipboard');
    })   
  }
  if(agent){
    setInterval(() => {
      dispatch(getAgentBalances());    
    }, 20000);
  }

  const getLink = (code) => {
    return `https://${window.location.href.toString().split('/')[2]}/register.html?accesscode=${code}`;
  }
  
  return agent ? (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawerOpen()}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" className={classes.title}>
            {`${typeof agent.username !== 'undefined' ?agent.username.toUpperCase():''}`}
          </Typography>
          {!isMobile?<div><Typography className={classes.balance}>
            {`Rake Balance: $${rakebalance?rakebalance.toFixed(2):0} `}{
              agent.isTransferAllow === true || agent.isTransferAllow === 'true' ? <TransferChips maxamount={agent.rake_chips}/> : null
            }{` Balance: $${balance?balance.toFixed(2):0}`}
          </Typography></div>:null}                              
          {
          agent.role !== 'master' ? 
            (<><Typography component="h1" variant="h6" color="inherit" noWrap className={classes.access}>
              {`Access Code: ${agent.accessCode}`}<input type="text" className={classes.textcode} value={getLink(agent.accessCode)} id="accesscod" readOnly></input>            
            </Typography>
            <IconButton onClick={() => copyLink()} className={classes.toolbarIcon}>
              <FileCopyIcon />
            </IconButton></>)
          :
          ''
          }
          
          <AgentMenu agent={agent} />
        </Toolbar>
        {isMobile?<Typography className={classes.balancemobil}>
          {`Rake Balance: $${rakebalance?rakebalance.toFixed(2):0} `}{
            agent.isTransferAllow === true || agent.isTransferAllow === 'true' ? <TransferChips maxamount={agent.rake_chips} isMobile={isMobile}/> : null
          }{` Balance: $${balance?balance.toFixed(2):0}`}
        </Typography>:null}        
      </AppBar>
      <Drawer
        variant={isMobile?"temporary":"permanent"}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => handleDrawerClose()} className={classes.toolbarIcon}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
          {isMobile?<><List>{' '}</List><List>{' '}</List></>:null}
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {isMobile?<br/>:null}
          <Router>
            <Switch>                   
              <Route path="/app/playeriphistory/:id" component={PlayerIpLoginHistory} />      
              <Route path="/app/cashtransactionhistory/:id" component={PlayerCashTransHistory} /> 
              <Route path="/app/gamehistory/:id" component={PlayerGameHistory} />            
              <Route path="/app/dashboard" component={MainDash} />      
              <Route path="/app/rakefigures" component={RakeFigures} />
              <Route path="/app/agents" component={Agents} />
              <Route path="/app/players" component={Players} agent={agent}/>
              <Route path="/app/transactions" component={Transactions} /> 
              <Route path="/app/accounting"  component={Accounting} />
              <Route path="/app/settings" component={Settings} />
              <Route path="/app/playeroptions/:id" component={PlayerEditForm} />
              <Route path="/app/playerprofile/:id" component={PlayerProfileInfo} />              
              <Route path="/app/editagent/:id" component={EditAgent} />
              <Route path="/app/playertransferchips/:id" component={PlayerTransferChips} />  
              <Route path="/app/rakehistory/:id" component={SubRakeHistory} />
              <Route path="/app/addagent" component={AddAgent} />  
              <Route path="/app/addplayer" component={AddPlayer} /> 
              <Route path="/app/cashhistoryagent" component={AgentCashHistory} />  
              <Route path="/app/cashhistory/:id" component={AgentCashTransactionHistory} />                                      
              <Route path="/app/cashier" component={agentCashier} /> 
            </Switch>
          </Router>
          {/*<Box pt={4}>
            <Copyright />
          </Box>*/}
        </Container>
      </main>
    </div>
  ) : null;
}
