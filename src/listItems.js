import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Rake Figures" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Agents" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Players" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Transactions" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Accounting" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);