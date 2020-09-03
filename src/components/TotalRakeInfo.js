import React from 'react';
import Title from './Title';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  main: {
    margin: '0',
    padding: '0',
  },

  row: {
    margin: '0',
    paddingTop: '15px',
    paddingBottom: '20px',
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

export default function Deposits({ totalRake }) {
  const classes = useStyles();
  const maincontainer = clsx(classes.main); 
  const mainrow = clsx(classes.row); 
  const mainrowitemleft = clsx(classes.rowItemLeft); 
  const mainrowitemright = clsx(classes.rowItemRight); 

  return (
    <div className={maincontainer}>
      <div className={mainrow}>
        <div className={mainrowitemleft}>
          Today's Rake:
        </div>
        <div className={mainrowitemright}>
          ${`${totalRake}`}
        </div>
      </div>
      <div className={mainrow}>
        <div className={mainrowitemleft}>
          Today's Players:
        </div>
        <div className={mainrowitemright}>
          12
        </div>
      </div>
      <div className={mainrow}>
        <div className={mainrowitemleft}>
          Today's Tables:
        </div>
        <div className={mainrowitemright}>
          122
        </div>
      </div>
      <div className={mainrow}>
        <div className={mainrowitemleft}>
          Online Players:
        </div>
        <div className={mainrowitemright}>
          8
        </div>
      </div>
      <div className={mainrow}>
        <div className={mainrowitemleft}>
          Online Tables:
        </div>
        <div className={mainrowitemright}>
          12
        </div>
      </div>   
    </div>
  );
}