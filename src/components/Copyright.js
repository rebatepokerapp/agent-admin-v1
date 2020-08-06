import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  copyright: {
      color: '#666666',
  },
  link: {
    color: '#FFA900',
  },
}));

const Copyright = () => {  
  const classes = useStyles();
  return (
    <Typography variant="body2" className={classes.copyright} align="center">
      {'Copyright © '}
      <Link className={classes.link} href="http://www.rebatepokerclub.com/">
        RebatePokerClub.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;