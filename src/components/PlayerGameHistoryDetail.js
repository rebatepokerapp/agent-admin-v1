import React from 'react'

const PlayerGameHistoryDetail = ({gameHistoryDetail}) => {
  console.log('DETALLE ', gameHistoryDetail)
  return (
    <div>
      {gameHistoryDetail.playerName}
    </div>
  )
}

export default PlayerGameHistoryDetail
