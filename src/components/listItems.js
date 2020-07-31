import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import LayersIcon from '@material-ui/icons/Layers';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import WorkIcon from '@material-ui/icons/Work';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';



export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <TrendingUpIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Rake Figures" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <WorkIcon style={{color:'#FFA900'}}/>
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
        <LocalAtmIcon style={{color:'#FFA900'}}/>
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
        <SettingsIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon style={{color:'#FFA900'}}/>
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);