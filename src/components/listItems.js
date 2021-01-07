import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import WorkIcon from '@material-ui/icons/Work';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { Home as HomeIcon } from '@material-ui/icons'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';



export const mainListItems = (
  <div>
    <ListItem button component="a" href="/app/dashboard">
      <ListItemIcon>
        <HomeIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a" href="/app/rakefigures">
      <ListItemIcon>
        <TrendingUpIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Rake Figures" />
    </ListItem>
    <ListItem button component="a" href="/app/cashhistoryagent">
      <ListItemIcon>
        <MonetizationOnIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Cash History" />
    </ListItem>
    <ListItem button component="a" href="/app/agents">
      <ListItemIcon>
        <WorkIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Agents" />
    </ListItem>
    <ListItem button component="a" href="/app/players">
      <ListItemIcon>
        <PeopleIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Players" />
    </ListItem>
    <ListItem button component="a" href="/app/cashier">
      <ListItemIcon>
        <AccountBalanceIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Cashier" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
  </div>
);