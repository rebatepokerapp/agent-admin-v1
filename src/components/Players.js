import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
// context
import { useUserState } from "./UserContext";

import { getPlayersByAgent } from '../core/apiCore';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  button: {
      color: '#000000',
      backgroundColor: '#009900',
      fontWeight: '700',
  },
}));

// Generate Order Data
function createData(playerid, username, balance, agentid, agentname) {
    return { playerid, username, balance, agentid, agentname };
}
  
const rows = [
    createData('SP1000','omegacr',13009.23,100,'admin'),
    createData('SP1001','canazo',6786.7,100,'admin'),
    createData('SP1002','banfield',11511.33,100,'admin'),
];

function Players(props) {

  const classes = useStyles();

  const [playersList, setPlayersList] = useState([]);
  const [error, setError] = useState(false);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);    

  // global
  const { agent } = useUserState();

  const loadPlayers = () => {
    getPlayersByAgent(agent).then(data => {
      if (data.error) {
        setError(data.error);
      } else { 
        const lst = data.data;       
        setPlayersList(lst);
        console.log('RESPUESTAAAAAAAAAAA', lst);
        console.log(data.data);
      }
      
    })
  }

  useEffect(() => {
    loadPlayers();
  }, [])

  return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Players</Title>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell>PlayerID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Agent</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {playersList.map((row) => (
                    <TableRow key={row.uniqId}>
                    <TableCell>{row.uniqId}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.agentName}</TableCell>
                    <TableCell>{row.chips}</TableCell>
                    <TableCell><Button className={classes.button} onClick={() => { alert('Player') }}><MenuOpenIcon /></Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}></div>
          </Paper>
        </Grid>
      </Grid>
  )
}

export default Players;

