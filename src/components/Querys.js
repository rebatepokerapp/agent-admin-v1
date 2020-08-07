db.allUsersTransactionHistory.aggregate(
  {
    $match : {
      "createdAt": { $gte: new ISODate("2020-07-13"), $lt: new ISODate("2020-07-19") },       
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
)