import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import moment from 'moment';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({ totalRake }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Todays profit</Title>
      <Typography component="p" variant="h4">
        ${totalRake}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {moment().format("dddd, MMMM Do YYYY, hh:mm a")}
      </Typography>
      <div>
        <Link href="/app/rakefigures" style={{color:'#009900'}}>
          More figures
        </Link>
      </div>
    </React.Fragment>
  );
}