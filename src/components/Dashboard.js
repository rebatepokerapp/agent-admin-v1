import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
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
import Copyright from './Copyright';
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

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { useSelector} from 'react-redux';

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
    color: '#FFA900',
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
    color: '#FFFFFF',
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
    marginRight: 36,
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
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const agent = useSelector(store => store.agent);

  return (
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
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {`${agent.agent.name.toUpperCase()} - Balance: $${agent.agent.rake_chips}`}
          </Typography>
          <AgentMenu agent={agent.agent} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
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
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
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
            </Switch>
          </Router>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
