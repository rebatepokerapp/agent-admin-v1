import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import FiguresReport from './FiguresReport';
import { useParams } from 'react-router-dom'
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


const SubRakeHistory = () => {
  const classes = useStyles();
  const maincontainer = clsx(classes.main);

  const { id } = useParams();

  const params = id.split('&');

  const idreal = params[0];
  //const username = params[1];

  return (
    <div  className={maincontainer}>
      <FiguresReport byagentid={idreal}/>
      <LastThreeWeeks byagentid={idreal}/>
    </div>
  )
}

export default SubRakeHistory
