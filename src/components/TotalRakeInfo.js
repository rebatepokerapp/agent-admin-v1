import React from 'react';
import Title from './Title';

export default function Deposits({ totalRake }) {
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