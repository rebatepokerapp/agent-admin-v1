import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import FiguresReport from './FiguresReport';
import LastThreeWeeks from './LastThreeWeeks';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    maxWidth: '100%', 
    margin: '0',
    padding: '0',
    verticalAlign: 'top',
  },
}));

const RakeFigures = () => {
  const classes = useStyles();
  const maincontainer = clsx(classes.main);

  return (
    <div  className={maincontainer}>
      <div>&nbsp;</div>
      <FiguresReport />
      <LastThreeWeeks />
    </div>
  )
}

export default RakeFigures;
