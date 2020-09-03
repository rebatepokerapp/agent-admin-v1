import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  main: {
    margin: '0',
  },
  header: {
    backgroundColor: '#CCCCCC', 
    margin: '0',
    height: '30px',
    padding: '5px',
    borderBottom: 'solid 1px #999999',
    borderTop: 'solid 1px #999999',
  },
  headerItem: {
    float: 'left',
    width: '200px',
    verticalAlign: 'top',
    textAlign: 'center',
  },
  row: {
    margin: '0',
    padding: '20px',
  },

  rowItem: {
    float: 'left',
    width: '200px',
    height: '100%',
  },

  rowSubItemCenter: {
    textAlign: 'center',
  },

  rowSubItemLeft: {
    float: 'left',
    height: '60px',
    width: '80px',
    textAlign: 'left',
  },
  rowSubItemRight: {
    float: 'left',
    height: '60px',
    width: '60px',
    textAlign: 'right',
  },
}));

const PlayerGameHistoryDetail = ({gameHistoryDetail, key}) => {
  console.log('DETALLE ', gameHistoryDetail)

  const classes = useStyles();
  const maincontainer = clsx(classes.main); 
  const mainheader = clsx(classes.header); 
  const mainheaderitem = clsx(classes.headerItem); 
  const mainrow = clsx(classes.row); 
  const mainrowitem = clsx(classes.rowItem); 
  const mainrowsubitemcenter = clsx(classes.rowSubItemCenter); 
  const mainrowsubitemleft = clsx(classes.rowSubItemLeft); 
  const mainrowsubitemright = clsx(classes.rowSubItemRight); 

  return (
    <div key={key} className={maincontainer}>
      <div className={mainheader}>
          <div className={mainheaderitem}>Hands</div>
          <div className={mainheaderitem}>Common Cards</div>
          <div className={mainheaderitem}>Winners</div>
      </div>
      <div className={mainrow}>
          <div className={mainrowitem}>
            {gameHistoryDetail.players.map( (row, i) => (
              <div key={i}>
                <div>{row.playerName}</div>
                <div><img src={`/card/${row.cards[0]}.png`} width="50px" height="70px" /><img src={`/card/${row.cards[0]}.png`} width="50px" height="70px" /></div>
              </div>
            ))}    
          </div>
          <div className={mainrowitem}>
              <div>&nbsp;</div>
              {gameHistoryDetail.board.map( (row, j) => (
                <div key={j} className={mainrowsubitemcenter}>
                  <img src={`/card/${gameHistoryDetail.board[j]}.png`} width="50px" height="70px" />
                </div>
              ))}    
          </div>
          <div className={mainrowitem}>
            {gameHistoryDetail.winners.map( (row, k) => (
              <div key={k}>
                <div className={mainrowsubitemleft}>{row.playerName}:</div>
                <div className={mainrowsubitemright}>${row.amount}</div>
              </div>
            ))}    
          </div>
      </div>
    </div>          
  )
}

export default PlayerGameHistoryDetail
