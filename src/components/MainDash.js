import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Deposits from './Deposits';
import Figures from './Figures';
import Chart from './Chart';
import HistoricRakePerWeek from './HistoricRakePerWeek'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useSelector} from 'react-redux';


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

  const agent = useSelector(store => store.agent);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);  

  return (
    <>
      <Grid container spacing={3}>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Figures agent={agent}/>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default MainDash;

