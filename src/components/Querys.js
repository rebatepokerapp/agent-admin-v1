db.allUsersTransactionHistory.aggregate(
  {
    $match : {
      "createdAt": { $gte: new ISODate("2020-06-22"), $lt: new ISODate("2020-06-28") },       
    }     
  },     
  {         
    $group : {
      _id : {day : {$dayOfWeek:"$createdAt"},username : "$username"},
      total : {$sum : "$totalRack"}         
    }     
  },     
  {         
    $group : {
      _id : "$_id.username",days : {$push : {day:"$_id.day",total : "$total"}}             
    }            
  },     
  {       
    $sort: {_id:1}     
  }
).pretty()

db.allUsersTransactionHistory.aggregate(
{
  '$match': { rackToId: '5f2429f8e07e324adca129d3', createdAt: { $gte: new ISODate("2020-07-20"), $lt: new ISODate("2020-07-27") } }
},
{         
  $group : {
    _id : {day : {$dayOfWeek:"$createdAt"},username : "$username"},
    total : {$sum : "$totalRack"}         
  }     
},     
{         
  $group : {
    _id : "$_id.username",days : {$push : {day:"$_id.day",total : "$total"}}             
  }            
},     
{       
  $sort: {_id:1}     
}
).pretty()

db.allUsersTransactionHistory.aggregate(
  {
    '$match': { rackToId: '5f2429f8e07e324adca129d3', createdAt: { $gte: new ISODate("2020-07-06"), $lt: new ISODate("2020-07-12") } }
  },
  {         
    $group : {
      _id : {day : {$dayOfWeek:"$createdAt"}},
      total : {$sum : "$totalRack"}
    }     
  },        
  {       
    $sort: {_id:1}     
  }
  ).pretty()