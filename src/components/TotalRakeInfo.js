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
      <Title>{`Today's Rake: ${totalRake}`}</Title>
      <Title>Today's Players: 12</Title>
      <Title>Today's Tables: 122</Title>  
      <Title>Online Players: 25</Title>
      <Title>Online Tables: 18</Title>    
    </React.Fragment>
  );
}