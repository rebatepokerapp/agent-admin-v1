import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  main: {
    margin: '0',
    padding: '0',
  },

  row: {
    margin: '0',
    paddingTop: '14px',
    paddingBottom: '14px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },

  rowItemLeft: {
    float: 'left',
    textAlign: 'left',
    fontSize: 'medium',
    color: '#333333',
    width: '130px',
    fontWeight: '700'  
  },

  rowItemRight: {
    float: 'right',
    textAlign: 'right',
    fontSize: 'medium',
    color: '#009900',
    width: '70px',
    fontWeight: '600',
  },
}));

export default function Deposits({ dashboard, totalRake, totalperday }) {
  const classes = useStyles();
  const maincontainer = clsx(classes.main); 
  const mainrow = clsx(classes.row); 
  const mainrowitemleft = clsx(classes.rowItemLeft); 
  const mainrowitemright = clsx(classes.rowItemRight);
  
  let totalPlayer = 0;
  let totalOnlinePlayers = 0;
  //let topPlayers = 0;
  let totalPlayinPly = 0;
  let totalRunningGame = 0;
  let totalRk = 0;
  let totalPday = 0;
  let totalGamePlayed = 0;
  let numday = 0;
  numday=moment().isoWeekday();

  if(totalRake){
    totalRk = totalRake;
  }

  if(totalperday){
    if(totalperday.length > 0){
      for (let index = 0; index < totalperday.length; index++) {
        
        if(parseInt(totalperday[index]._id.day - 1) === parseInt(numday)){
          totalPday = totalperday[index].total;
        }        
      }
    }else{
      totalPday = 0;
    }
  }  

  if(dashboard){
    totalPlayer = dashboard.totalPlayer;
    totalOnlinePlayers = dashboard.totalOnlinePlayers;
    //topPlayers = dashboard.topPlayers;
    totalPlayinPly = dashboard.totalPlayingPly;
    totalRunningGame = dashboard.totalRunningGame;            
    totalGamePlayed = dashboard.totalGamePlayed;
  }
  
  return (
    <div className={maincontainer}>
      <div className={mainrow}>
        <div className={mainrowitemleft}>
          Week Rake:
        </div>
        <div className={mainrowitemright}>
          ${`${totalRk.toFixed(2)}`}
        </div>
      </div>
      <div className={mainrow}>
        <div className={mainrowitemleft}>
          Today's Rake:
        </div>
        <div className={mainrowitemright}>
          ${`${totalPday.toFixed(2)}`}
        </div>
      </div>
      <div className={mainrow}>
        <div className={mainrowitemleft}>
          Total Players:
        </div>
        <div className={mainrowitemright}>
        {totalPlayer}
        </div>
      </div>
      <div className={mainrow}>
        <div className={mainrowitemleft}>
          Game's Played:
        </div>
        <div className={mainrowitemright}>
        {totalGamePlayed}
        </div>
      </div>
      <div className={mainrow}>
        <div className={mainrowitemleft}>
          Today's Tables:
        </div>
        <div className={mainrowitemright}>
          {totalPlayinPly}
        </div>
      </div>
      <div className={mainrow}>
        <div className={mainrowitemleft}>
          Online Players:
        </div>
        <div className={mainrowitemright}>
          {totalOnlinePlayers}
        </div>
      </div>
      <div className={mainrow}>
        <div className={mainrowitemleft}>
          Online Tables:
        </div>
        <div className={mainrowitemright}>
          {totalRunningGame}
        </div>
      </div>   
    </div>
  );
}