import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TotalRakeInfo from './TotalRakeInfo';
import ChartFiguresPerWeek from './ChartFiguresPerWeek';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {useDispatch, useSelector} from 'react-redux';
import {getFiguresByAgent,getAgentDashboard} from '../redux/AgentDucks';
import FiguresReport from './FiguresReport';


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
}));

function MainDash() {

  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);  

  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchData = () => {
      dispatch(getFiguresByAgent(0))
    }
    const fetchDash = () => {
      dispatch(getAgentDashboard())
    }    
    fetchData();
    fetchDash();
  }, [dispatch])

  const dashboarddata = useSelector(store => store.agent.dashboard);
  const totalRake = useSelector(store => store.agent.totalrake);
  const totalperday = useSelector(store => store.agent.totalperday);

  return (
    <>
      <Grid container spacing={3}>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <TotalRakeInfo dashboard={dashboarddata} totalRake={totalRake} totalperday={totalperday}/>
          </Paper>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <ChartFiguresPerWeek totalperday={totalperday}/>
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <FiguresReport/>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default MainDash;

