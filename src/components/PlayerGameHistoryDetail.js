import React, { Fragment } from 'react'

const PlayerGameHistoryDetail = ({gameHistoryDetail, key}) => {
  console.log('DETALLE ', gameHistoryDetail)
  return (
    <div key={key}>
      {gameHistoryDetail.players.map( (row, i) => (
        <div key={i}>
          <div>{row.playerName}</div>
          <div><img src={`/card/${row.cards[0]}.png`} width="50px" height="70px" /><img src={`/card/${row.cards[0]}.png`} width="50px" height="70px" /></div>
        </div>
      ))}    
    </div>
  )
}

export default PlayerGameHistoryDetail
