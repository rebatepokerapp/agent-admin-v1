import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPlayerProfile,setPlayerInfo} from '../redux/PlayerDucks';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PlayerGameChart from './PlayerGameChart';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    maxWidth: '100%', 
    margin: '0',
    padding: '0',
    verticalAlign: 'top',
  },

  title: {
    color: 'black',
  }, 
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  info: {
    backgroundColor: 'white',
    width: '100%',
    padding: '25px',
  },
  divTable: {
    display: 'table',
    width: '100%',
    marginTop: '20px',
  },
  divTableRow: {
    display: 'table-row'
  },
  divTableCell: {
    border: '0px solid #999999',
    display: 'table-cell',
    padding: '3px 10px'
  },
  divTableHeading: {
    backgroundColor: '#EEE',
    display: 'table-header-group',
    fontWeight: 'bold'
  },
  divTableFoot: {
    backgroundColor: '#EEE',
    display: 'table-footer-group',
    fontWeight: 'bold'
  },
  divTableBody: {
    display: 'table-row-group'
  } 
}));


const PlayerProfileInfo = ({id,username}) => {

  const classes = useStyles();
  const maincontainer = clsx(classes.main); 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlayerInfo(id,username));
    dispatch(getPlayerProfile())
  },[id, username, dispatch])

  const profile = useSelector(store => store.player.statistics);
  const dataChart = {
    play:profile?profile.gamePlay:0,
    won: profile?profile.gameWon:0,
    lost: profile?profile.gameLost:0
  }
  

  return profile ? (
    <div className={maincontainer}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <div className={classes.info}>
          <div className={classes.divTable}>
            <div className={classes.divTableBody}>
              <div className={classes.divTableRow}>
                <div className={classes.divTableCell}>
                  <div className={classes.paper}>
                    <Typography component="h1" variant="h5" className={classes.title}>
                      Player Activity
                    </Typography>
                    <div className={classes.info}>
                      <div className={classes.divTable}>
                        <div className={classes.divTableBody}>
                          <div className={classes.divTableRow}>
                            <div className={classes.divTableCell}>Game Played</div>
                            <div className={classes.divTableCell}>{profile.gamePlay}</div>                  
                          </div>
                          <div className={classes.divTableRow}>
                            <div className={classes.divTableCell}>Game Won</div>
                            <div className={classes.divTableCell}>{profile.gameWon}</div>                  
                          </div>
                          <div className={classes.divTableRow}>
                            <div className={classes.divTableCell}>Game Lost</div>
                            <div className={classes.divTableCell}>{profile.gameLost}</div>                  
                          </div>
                          <div className={classes.divTableRow}>
                            <div className={classes.divTableCell}>Tournament Played</div>
                            <div className={classes.divTableCell}>{profile.tournamentPlay}</div>                  
                          </div>
                          <div className={classes.divTableRow}>
                            <div className={classes.divTableCell}>Tournament Won</div>
                            <div className={classes.divTableCell}>{profile.tournamentWon}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Typography component="h3" variant="h5" className={classes.title}>
                      Player's Rake
                    </Typography>
                    <div className={classes.info}>
                      <div className={classes.divTable}>
                        <div className={classes.divTableBody}>
                          <div className={classes.divTableRow}>
                            <div className={classes.divTableCell}>Today Rake</div>
                            <div className={classes.divTableCell}>{profile.todayRake}</div>                  
                          </div>
                          <div className={classes.divTableRow}>
                            <div className={classes.divTableCell}>Week Rake</div>
                            <div className={classes.divTableCell}>{profile.weekRake}</div>                  
                          </div>
                          <div className={classes.divTableRow}>
                            <div className={classes.divTableCell}>Month Rake</div>
                            <div className={classes.divTableCell}>{profile.monthRake}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.divTableCell}>
                  <PlayerGameChart data={dataChart}/>
                </div>                  
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}

export default PlayerProfileInfo
