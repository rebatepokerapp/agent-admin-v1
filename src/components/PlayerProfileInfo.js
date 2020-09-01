import React, {useEffect, Fragment} from 'react';
import { useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getPlayerProfile,setPlayerInfo} from '../redux/PlayerDucks';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import PlayerGameChart from './PlayerGameChart';

const useStyles = makeStyles((theme) => ({
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
    border: '3px solid gray',
    padding: '25px',
    margin: '20px'
  },
  divTable: {
    display: 'table',
    width: '100%'
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

const PlayerProfileInfo = () => {
  const { id } = useParams();

  const classes = useStyles();

  const params = id.split('&');

  const idreal = params[0];
  const username = params[1];

  const dispatch = useDispatch();

  const setPlayer = () => {
    dispatch(setPlayerInfo(idreal,username));
  }

  useEffect(() => {
    setPlayer();
    dispatch(getPlayerProfile())
  },[dispatch])

  const profile = useSelector(store => store.player.statistics);

  const dataChart = {
    play:profile.gamePlay,
    won: profile.gameWon,
    lost: profile.gameLost
  }
  

  return (
    <Fragment>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <div className={classes.info}>
          <div className={classes.divTable}>
            <div className={classes.divTableBody}>
              <div className={classes.divTableRow}>
                <div className={classes.divTableCell}>
                  <div className={classes.paper}>
                    <Typography component="h1" variant="h5" className={classes.title}>
                      Player Profile
                    </Typography>
                    <Typography component="h3" variant="h5" className={classes.title}>
                      {profile.username.toUpperCase()}
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
    </Fragment>
  )
}

export default PlayerProfileInfo
