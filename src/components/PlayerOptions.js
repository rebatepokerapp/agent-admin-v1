import React from 'react';
import PlayerCashOptions from './PlayerCashOptions';
import PlayerEditForm from './PlayerEditForm';

const PlayerOptions = () => {
  return (
    <table>
      <tr>
        <td>
          <PlayerEditForm />
        </td>
        <td>
        <PlayerCashOptions />
        </td>
      </tr>
    </table>    
  )
}

export default PlayerOptions
