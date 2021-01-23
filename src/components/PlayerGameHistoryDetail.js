import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
//import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableContainer } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import { useSelector} from 'react-redux'

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
  title: {
    margin: '5px',
    marginLeft: '10px',
    color: 'green',
    marginTop: '10px',
    fontSize: '24px',
  },
  boldletter: {
    fontWeight: "bold",
  },
  boldaccordion: {
    fontWeight: "bold",
    backgroundColor: '#3f4545',
  },
  boldhead: {
    fontSize: '13px',
    marginTop: '2px',
    paddingTop: '2px',
  },
  imgboard: {
    marginLeft: '5px',
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  textRed: {
    color: 'red',
  },
  textGreen: {
    color: 'green',
  },
  tableheade: {    
    backgroundColor: '#303030',
  },
  tablecelltext: {
    fontWeight: "bold",
    color: 'white',
  },
  containersty: {
    backgroundColor: '#9da3a1',
  },
  rdistributiondetail: {
    fontSize: '12px',
  },
  rdistributiondetailTotal: {
    fontSize: '12px',
    fontWeight: 'bold',
    border:'0px',
    backgroundColor:'#666666',
    color:'white',
  }
}));

const PlayerGameHistoryDetail = ({gameHistoryDetail, key}) => {

  const agent = useSelector(store => store.agent.agentsession);
  let totalColumns = 0;

  const diffMinutes = (date1,date2) => {
    var hora_inicio = Date.parse(date2);
    var hora_final = Date.parse(date1);
    
    var diffMs = (hora_final - hora_inicio);

    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    
    return diffMins; 
  }

  console.log('OBJETO HISTORY', gameHistoryDetail);

  const classes = useStyles();
  /*const maincontainer = clsx(classes.main); 
  const mainheader = clsx(classes.header); 
  const mainheaderitem = clsx(classes.headerItem); 
  const mainrow = clsx(classes.row); 
  const mainrowitem = clsx(classes.rowItem); 
  const mainrowsubitemcenter = clsx(classes.rowSubItemCenter); 
  const mainrowsubitemleft = clsx(classes.rowSubItemLeft); 
  const mainrowsubitemright = clsx(classes.rowSubItemRight);*/ 

  const setPotValue = () => {
    let distribution = [];
    let totalRake = 0;
    let totalBet = 0;
    let totalBetAmount = gameHistoryDetail.roundBets.reduce((a, b) => a + b, 0)
    var totalRackOfTheGame = 0;
    let remaining_Chips = 0;
    let RackDeductions = [];
    let AgentsRole = [];    

    if(!gameHistoryDetail.rakeCap.length){
      gameHistoryDetail.roundBets.forEach( bet =>{ 
        totalBet = bet ?  parseFloat(parseFloat(bet).toFixed(2)) + parseFloat(parseFloat( totalBet ).toFixed(4)): parseFloat(totalBet)
      })
      totalRackOfTheGame=eval(parseFloat((parseFloat(totalBet) * parseFloat(gameHistoryDetail.rakePercenage)) / 100).toFixed(4));
    }else{
      totalRackOfTheGame=gameHistoryDetail.rakeCap[0].totalRackOfGame;
    }

    remaining_Chips = parseFloat(remaining_Chips + gameHistoryDetail.pot);
    
    let totalPot = {
      name: "Total Game Pot",
      action: "Pot",
      type: "Deposit",
      chips: gameHistoryDetail.pot
    }
    distribution.push(totalPot);

    for (let index = 0; index < gameHistoryDetail.players.length; index++) {
      let player = {};
      player.playerName = gameHistoryDetail.players[index].playerName;
      player.plrRake = gameHistoryDetail.rakeDistribution.length ? gameHistoryDetail.roundBets[index] ? parseFloat(gameHistoryDetail.roundBets[index] / totalBetAmount * totalRackOfTheGame).toFixed(2) : " " : " "
      player.bets = gameHistoryDetail.roundBets[index] ? parseFloat(gameHistoryDetail.roundBets[index]).toFixed(4) : "-"
      totalRake = gameHistoryDetail.rakeDistribution.length && gameHistoryDetail.roundBets[index] ? parseFloat(player.plrRake) + totalRake : totalRake;
      totalBet = player.bets && player.bets !== '-' ? parseFloat(player.bets) + totalBet : totalBet;  
      player.agentRake = [];
      gameHistoryDetail.rakeDistribution.forEach(rakeDistribution => {
        let rackData = {}
        if (rakeDistribution.playerId === gameHistoryDetail.players[index].id && !rakeDistribution.adminChips) {
          rackData.name = rakeDistribution.email
          rackData.rackTo = parseFloat(rakeDistribution.totalRake).toFixed(4)
          rackData.role = rakeDistribution.role
          rackData.rackPercent = rakeDistribution.rackPercent
          player.agentRake.push(rackData)
        }
        AgentsRole.push({
          role: rakeDistribution.role,
          level: rakeDistribution.level
        })
      })

      RackDeductions.push(player)
    }

    let result = [];
    let map = new Map();
    for (const item of AgentsRole) {
      if (!map.has(item.level)) {
        map.set(item.level, true); // set any value to Map
        result.push({
          level: item.level,
          role: item.role
        });
      }
    }
    result.sort(function (a, b) {
      return a.level - b.level
    })

    for (var w = 0; w < gameHistoryDetail.winners.length; w++) {
      //winner[w].count = count = count + 1;
      let winnerChips = {
        name: "winner Chips " + gameHistoryDetail.winners[w].playerName,
        action: "Winner",
        type: "Deduct",
        chips: parseFloat(gameHistoryDetail.winners[w].amount - gameHistoryDetail.winners[w].rackAmount)
      }
      remaining_Chips = parseFloat(remaining_Chips - parseFloat(gameHistoryDetail.winners[w].amount - gameHistoryDetail.winners[w].rackAmount))
      distribution.push(winnerChips);
    }

    for (var b = 0; b < gameHistoryDetail.rakeDistribution.length; b++) {      
      if (gameHistoryDetail.rakeDistribution[b].adminChips === true) { 
        let player = {
          playerName: gameHistoryDetail.rakeDistribution[b].playerId,
          plrRake: parseFloat(gameHistoryDetail.rakeDistribution[b].totalRake).toFixed(4),
          agentRake: [{
            name: "admin",
            rackTo: parseFloat(gameHistoryDetail.rakeDistribution[b].totalRake).toFixed(4),
            role: "admin",
            rackPercent: gameHistoryDetail.rakeDistribution[b].rackPercent
          }],
        }
        RackDeductions.push(player)       
        totalRake += parseFloat(gameHistoryDetail.rakeDistribution[b].totalRake);        
      }
    }

    for (var d = 0; d < gameHistoryDetail.history.length; d++) {
      if (gameHistoryDetail.history[d].boardCard != null) {
        if (gameHistoryDetail.history[d].playerAction === 10) {
          let TotalRake = {
            name: "Revert Chips " + gameHistoryDetail.history[d].playerName,
            action: "Revert",
            type: "Deduct",
            chips: parseFloat(gameHistoryDetail.history[d].totalPot).toFixed(4) - parseFloat(totalBet).toFixed(4)
          }
          remaining_Chips = parseFloat(remaining_Chips).toFixed(4) - parseFloat(gameHistoryDetail.history[d].totalPot - totalBet).toFixed(4)
          distribution.push(TotalRake);

          if (!gameHistoryDetail.winners.length) {
            let TotalRake = {
              name: "Winner Chips " + gameHistoryDetail.history[d].playerName,
              action: "Winner",
              type: "Deduct",
              chips: parseFloat(gameHistoryDetail.history[d].totalPot - parseFloat(gameHistoryDetail.history[d].totalPot - totalBet) - totalRake)
            }
            remaining_Chips = parseFloat(remaining_Chips - parseFloat(gameHistoryDetail.history[d].totalPot - parseFloat(gameHistoryDetail.history[d].totalPot - totalBet) - totalRake))
            distribution.push(TotalRake);
          }
        }
        gameHistoryDetail.history[d].totalPotValue = d !== 0 ? gameHistoryDetail.history[d].playerAction === 10 ? parseFloat(gameHistoryDetail.history[d - 1].totalPotValue) : parseFloat(parseFloat(gameHistoryDetail.history[d - 1].totalPotValue) + parseFloat(gameHistoryDetail.history[d].betAmount)).toFixed(2) : parseFloat(gameHistoryDetail.history[d].betAmount)      
      }      
    }
    if (totalRake) {
      let totalRakeData = {
        name: "Rake Chips",
        action: "Rake",
        type: "Deduct",
        chips: totalRake
      }
      remaining_Chips = parseFloat(remaining_Chips - totalRake)
      distribution.push(totalRakeData);
    }
    if (remaining_Chips) {
      let reaminchips = {
        name: "Total Remaining Chips",
        action: "",
        type: "",
        chips: remaining_Chips
      }
      distribution.push(reaminchips);
    }
    gameHistoryDetail.distribution=distribution;
    gameHistoryDetail.RackDeductions = RackDeductions;
    gameHistoryDetail.AgentsRole = result;
    gameHistoryDetail.totalBet = totalBet;
    gameHistoryDetail.totalRakes = totalRake;
  }

  setPotValue();

  console.log('Detail',gameHistoryDetail)

  return (
    <TableContainer className={classes.containersty}>
      <Table size="small">
        <TableBody>
          <TableRow key={1000}>
            <TableCell align="left">              
              <Typography component="h1" variant="h6" color="inherit" className={classes.title}>
                <img src={`/card/cardsIcon.png`} alt="" />{` ${gameHistoryDetail.gameNumber}`}
              </Typography>            
            </TableCell>
            <TableCell align="left">
              &nbsp;
            </TableCell>
            <TableCell align="right">
              {moment(gameHistoryDetail.updatedAt).format("YYYY/MM/DD HH:mm")}
            </TableCell>
          </TableRow>
          <TableRow key={1001}>
            <TableCell align="left">
              <div className={classes.boldhead}>
                <b>Small Blind:</b> {` ${gameHistoryDetail.smallBlind}`}
              </div> 
              <div className={classes.boldhead}>
                <b>Big Blind:</b> {` ${gameHistoryDetail.bigBlind}`}
              </div>  
              <div className={classes.boldhead}>
                <b>Total Players:</b> {` ${gameHistoryDetail.players.length}`}
              </div>                 
            </TableCell>
            <TableCell align="left">
              <div className={classes.boldhead}>
                <b>Status:</b> {` ${gameHistoryDetail.status}`}
              </div> 
              <div className={classes.boldhead}>
                <b>Pot:</b> {` ${gameHistoryDetail.pot}`}
              </div>  
              <div className={classes.boldhead}>
                &nbsp;
              </div> 
            </TableCell>
            <TableCell align="left">
              <div className={classes.boldhead}>
                <b>Game Start Time:</b> {` ${moment(gameHistoryDetail.createdAt).format("YYYY/MM/DD HH:mm")}`}
              </div> 
              <div className={classes.boldhead}>
                <b>Game End Time:</b> {` ${moment(gameHistoryDetail.updatedAt).format("YYYY/MM/DD HH:mm")}`}
              </div>  
              <div className={classes.boldhead}>
                <b>Game Duration:</b> {`${`${diffMinutes(gameHistoryDetail.updatedAt,gameHistoryDetail.createdAt)} Minutes`}`}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table size="small">
        <TableHead>
          <TableRow className={classes.tableheade} key={1002}>
            <TableCell align="left" className={classes.tablecelltext}>Player Name</TableCell>
            <TableCell align="left" className={classes.tablecelltext}>Chips</TableCell>
            <TableCell align="left" className={classes.tablecelltext}>Status</TableCell>
            <TableCell align="left" className={classes.tablecelltext}>Player Cards</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gameHistoryDetail.players.map( (player, idx) => (
            <TableRow key={idx}>            
              <TableCell align="left">{player.playerName}</TableCell>
              <TableCell align="left">{player.chips.toFixed(2)}</TableCell>
              <TableCell align="left">{player.status}</TableCell>              
              <TableCell align="left">
                {player.cards.map( card => (
                  <img src={`/card/${card}.png`} width="50px" height="70px" alt="" className={classes.imgboard} />
                ))}
              </TableCell>
            </TableRow>
          ) )}
          <TableRow key={1003}>
            <TableCell align="left" colSpan={4}>
              <Typography className={classes.boldletter}>
                BOARD
              </Typography>
              {gameHistoryDetail.board.map( bc => (
                <img src={`/card/${bc}.png`} width="50px" height="70px" alt="" className={classes.imgboard}/>
              ))}
            </TableCell>
          </TableRow>          
        </TableBody>
      </Table>      
      <Table size="small">
        <TableHead>
          <TableRow key={1004}>
            <TableCell align="left" colSpan={4}>
              <Typography className={classes.boldletter}>
                WINNER
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow className={classes.tableheade} key={1005}>
            <TableCell align="left" className={classes.tablecelltext}>Player Name</TableCell>
            <TableCell align="left" className={classes.tablecelltext}>Chips</TableCell>
            <TableCell align="left" className={classes.tablecelltext}>Type</TableCell>
            <TableCell align="left" className={classes.tablecelltext}>Best Cards</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gameHistoryDetail.winners.map( (player, ind) => (
            <TableRow key={ind}>            
              <TableCell align="left">{player.playerName}</TableCell>
              <TableCell align="left">{player.chips}</TableCell>
              <TableCell align="left">{player.winningType}</TableCell>
              <TableCell align="left">
                {player.bestCards.map( card => (
                  <img src={`/card/${card}.png`} width="50px" height="70px" alt="" className={classes.imgboard} />
                ))}
              </TableCell>
            </TableRow>
          ) )}          
        </TableBody>
      </Table>      
      <Accordion className={classes.containersty}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.boldaccordion}
        >
          <Typography className={classes.boldletter}>History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small">
            <TableHead>
              <TableRow className={classes.tableheade} key={1006}>
                <TableCell align="left" className={classes.tablecelltext}>Player Name</TableCell>
                <TableCell align="left" className={classes.tablecelltext}>Bet Amount</TableCell>
                <TableCell align="left" className={classes.tablecelltext}>Total Bet Amount</TableCell>
                <TableCell align="left" className={classes.tablecelltext}>Total Pot</TableCell>
                <TableCell align="left" className={classes.tablecelltext}>Action</TableCell>
                <TableCell align="left" className={classes.tablecelltext}>Remaining</TableCell>
                <TableCell align="left" className={classes.tablecelltext}>Round</TableCell>
                <TableCell align="left" className={classes.tablecelltext}>Board Cards</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameHistoryDetail.history.map( (player, indic) => (
                <TableRow key={indic}>            
                  <TableCell align="left">{player.playerName}</TableCell>
                  <TableCell align="left">{player.betAmount.toFixed(2)}</TableCell>
                  <TableCell align="left">{player.totalBetAmount !== '-' ? player.totalBetAmount.toFixed(2) : player.totalBetAmount}</TableCell>
                  <TableCell align="left">{player.totalPotValue}</TableCell>
                  <TableCell align="left">{
                    player.playerAction === 0 ? 'SmallBlind': 
                    player.playerAction === 1 ? 'BigBlind': 
                    player.playerAction === 2 ? 'Check': 
                    player.playerAction === 3 ? 'Bet': 
                    player.playerAction === 4 ? 'Call': 
                    player.playerAction === 8 ? 'AllIn': 
                    player.playerAction === 6 ? 'Fold' :
                    player.playerAction === 10 ? 'Revert Chips'
                    : ''
                    }</TableCell>
                  <TableCell align="left">{player.remaining}</TableCell>
                  <TableCell align="left">{player.gameRound}</TableCell>
                  <TableCell align="left">
                    {player.boardCard.length > 0 ? player.boardCard.map( card => (
                      <img src={`/card/${card}.png`} width="50px" height="70px" alt="" className={classes.imgboard}/>
                    )):''}
                  </TableCell>
                </TableRow>
              ) )}          
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.containersty}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.boldaccordion}
        >
          <Typography className={classes.boldletter}>Distribution</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small">
            <TableHead>
              <TableRow className={classes.tableheade} key={1007}>
                <TableCell align="left" className={classes.tablecelltext}>Type Distribution</TableCell>
                <TableCell align="left" className={classes.tablecelltext}>Action</TableCell>
                <TableCell align="left" className={classes.tablecelltext}>Deposit/Withdraw</TableCell>
                <TableCell align="left" className={classes.tablecelltext}>Chips</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameHistoryDetail.distribution.map( (dist, indice) => (
                <TableRow key={indice}>            
                  <TableCell align="left">{dist.name}</TableCell>
                  <TableCell align="left">{dist.action}</TableCell>
                  <TableCell align="left" className={dist.type === 'Deposit' ? classes.textGreen : dist.type === 'Deduct' ? classes.textRed : ''}>{dist.type}</TableCell>
                  <TableCell align="left" className={dist.type === 'Deposit' ? classes.textGreen : dist.type === 'Deduct' ? classes.textRed : ''}>{dist.chips > 0 ? dist.chips.toFixed(2): 0}</TableCell>                        
                </TableRow>
              ) )}          
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.containersty}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.boldaccordion}
        >
          <Typography className={classes.boldletter}>Rake Distribution</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small">
            <TableHead>
              <TableRow className={classes.tableheade} key={1008}>
                <TableCell align="left" className={classes.tablecelltext}>Player Name</TableCell>
                <TableCell align="left" className={classes.tablecelltext}>Bet Amount</TableCell>
                <TableCell align="left" className={classes.tablecelltext}>
                  Rake {
                    gameHistoryDetail.rakeDistribution.length && gameHistoryDetail.rakeCap[0].totalRackOfGame ? 
                      (
                        gameHistoryDetail.adminExtraRakePercentage > 0 ?
                          ` @ ${gameHistoryDetail.rakeCap[0].totalRackOfGame} + ${gameHistoryDetail.adminExtraRakePercentage}%`
                        :
                          ` @ ${gameHistoryDetail.rakeCap[0].totalRackOfGame}%`
                      )
                    : 
                      (
                        gameHistoryDetail.adminExtraRakePercentage > 0 ?
                          ` @ ${gameHistoryDetail.rakePercenage} + ${gameHistoryDetail.adminExtraRakePercentage}%`
                        :
                          ` @ ${gameHistoryDetail.rakePercenage}%`
                      )
                  }
                </TableCell>
                {gameHistoryDetail.AgentsRole.map(
                  (agents,indc) => {
                    totalColumns = totalColumns + 1;
                    console.log('agents.role',agents.role);
                    console.log('agent.role',agent.role);
                    console.log('indc',indc);
                    if(agent.role==="master"){
                      return(<TableCell align="left" className={classes.tablecelltext}>{agents.role}</TableCell>);
                    }else if(agent.role === "agent"){
                      if(agents.role === agent.role && agents.level === (indc+1)){
                        return(<TableCell align="left" className={classes.tablecelltext}>{agents.role}</TableCell>);
                      }else{
                        return(<TableCell align="left" className={classes.tablecelltext}>{agents.role}</TableCell>);
                      }
                    }else{
                      return(<TableCell align="left" className={classes.tablecelltext}>{agents.role}</TableCell>);
                    }                    
                  }
                )}                      
              </TableRow>
            </TableHead>
            <TableBody>
              {gameHistoryDetail.RackDeductions.map( (rack, indxc) => {

                if(agent.role==="master"){
                  return(
                    <TableRow key={indxc}>            
                      <TableCell align="left" className={classes.rdistributiondetail}>{rack.playerName}</TableCell>
                      <TableCell align="left" className={classes.rdistributiondetail}>{isNaN(rack.bets) ? '' : parseFloat(rack.bets).toFixed(2) }</TableCell>
                      <TableCell align="left" className={classes.rdistributiondetail}>{rack.agentRake.length > 0 && !isNaN(rack.plrRake) ? parseFloat(rack.plrRake).toFixed(2) : '' }</TableCell>                        
                      {                    
                        gameHistoryDetail.AgentsRole.map( agents => {                                           
                          let indice = 0;
                          let existe = false;
                          for (let index = 0; index < rack.agentRake.length; index++) {
                            if(agents.role === rack.agentRake[index].role){
                              indice = index;
                              existe = true;
                            }
                          }
                          if(existe === true && rack.agentRake.length > 0){
                            return (                                  
                              <TableCell align="left" className={classes.rdistributiondetail}>
                                {`${rack.agentRake.length > 0 && !isNaN(rack.agentRake[indice].rackTo) ? parseFloat(rack.agentRake[indice].rackTo).toFixed(2) : '0'} - (${rack.agentRake.length > 0 ? rack.agentRake[indice].rackPercent : '0'}%) - (${rack.agentRake.length > 0 ? rack.agentRake[indice].name : ''})`}
                              </TableCell>
                            );
                          }else{
                            return (                                  
                              <TableCell align="left">
                                &nbsp;
                              </TableCell>
                            );
                          }                            
                        })
                      }                        
                    </TableRow>
                  )
                }else if(agent.role==="agent"){
                  if(rack.agentRake[0].name===agent.email){
                    return(
                      <TableRow key={indxc}>            
                        <TableCell align="left" className={classes.rdistributiondetail}>{rack.playerName}</TableCell>
                        <TableCell align="left" className={classes.rdistributiondetail}>{isNaN(rack.bets) ? '' : parseFloat(rack.bets).toFixed(2) }</TableCell>
                        <TableCell align="left" className={classes.rdistributiondetail}>{rack.agentRake.length > 0 && !isNaN(rack.plrRake) ? parseFloat(rack.plrRake).toFixed(2) : '' }</TableCell>                        
                        {                    
                          gameHistoryDetail.AgentsRole.map( (agents, indce) => { 
                            if(agents.role === agent.role && agents.level === (indce+1)){
                              let indice = 0;
                              let existe = false;
                              for (let index = 0; index < rack.agentRake.length; index++) {
                                if(agents.role === rack.agentRake[index].role){
                                  indice = index;
                                  existe = true;
                                }
                              }
                              if(existe === true && rack.agentRake.length > 0){
                                return (                                  
                                  <TableCell align="left" className={classes.rdistributiondetail}>
                                    {`${rack.agentRake.length > 0 && !isNaN(rack.agentRake[indice].rackTo) ? parseFloat(rack.agentRake[indice].rackTo).toFixed(2) : '0'} - (${rack.agentRake.length > 0 ? rack.agentRake[indice].rackPercent : '0'}%) - (${rack.agentRake.length > 0 ? rack.agentRake[indice].name : ''})`}
                                  </TableCell>
                                );
                              }else{
                                return (                                  
                                  <TableCell align="left">
                                    &nbsp;
                                  </TableCell>
                                );
                              }
                            }                                                                                                
                          })
                        }                        
                      </TableRow>
                    )
                  }                  
                }else{
                  return(
                    <TableRow key={indxc}>            
                      <TableCell align="left" className={classes.rdistributiondetail}>{rack.playerName}</TableCell>
                      <TableCell align="left" className={classes.rdistributiondetail}>{isNaN(rack.bets) ? '' : parseFloat(rack.bets).toFixed(2) }</TableCell>
                      <TableCell align="left" className={classes.rdistributiondetail}>{rack.agentRake.length > 0 && !isNaN(rack.plrRake) ? parseFloat(rack.plrRake).toFixed(2) : '' }</TableCell>                        
                      {                    
                        gameHistoryDetail.AgentsRole.map( agents => {                                           
                          let indice = 0;
                          let existe = false;
                          for (let index = 0; index < rack.agentRake.length; index++) {
                            if(agents.role === rack.agentRake[index].role){
                              indice = index;
                              existe = true;
                            }
                          }
                          if(existe === true && rack.agentRake.length > 0){
                            return (                                  
                              <TableCell align="left" className={classes.rdistributiondetail}>
                                {`${rack.agentRake.length > 0 && !isNaN(rack.agentRake[indice].rackTo) ? parseFloat(rack.agentRake[indice].rackTo).toFixed(2) : '0'} - (${rack.agentRake.length > 0 ? rack.agentRake[indice].rackPercent : '0'}%) - (${rack.agentRake.length > 0 ? rack.agentRake[indice].name : ''})`}
                              </TableCell>
                            );
                          }else{
                            return (                                  
                              <TableCell align="left">
                                &nbsp;
                              </TableCell>
                            );
                          }                            
                        })
                      }                        
                    </TableRow>
                  )
                }
                
              } )}

              {agent.role!=="agent"?
              <TableRow key={1009}>
                <TableCell align="left" className={classes.rdistributiondetailTotal}>&nbsp;</TableCell>
                <TableCell align="left" className={classes.rdistributiondetailTotal}>{gameHistoryDetail.totalBet.toFixed(2)}</TableCell>
                <TableCell align="left" className={classes.rdistributiondetailTotal}>{gameHistoryDetail.totalRakes.toFixed(2)}</TableCell>
                <TableCell align="left" className={classes.rdistributiondetailTotal} colSpan={totalColumns}>&nbsp;</TableCell>
              </TableRow>
              :''}
                        
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    </TableContainer>          
  )
}

export default PlayerGameHistoryDetail
