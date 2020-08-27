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
  $lookup: {
    from: 'player',
    localField: 'player',
    foreignField: '_id',
    as: 'player'
  }
}, 
{
  '$match': { rackToId: '5f3f4ed126893f460b90f04c', createdAt: { $gte: new ISODate("2020-08-24"), $lte: new ISODate("2020-08-30") } }
},
{         
  $group : {
    _id : {day : {$dayOfWeek:"$createdAt"},username : "$player.username"},
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

  db.allUsersTransactionHistory.aggregate( 
    {
      '$match': { createdAt: { $gte: new ISODate("2020-07-13"), $lte: new ISODate("2020-07-19") } }
    },
    {         
      $group : {
        _id : {date : "$createdAt"},
        total : {$sum : "$totalRack"}         
      }     
    },         
    ).pretty()


    Sys.App.use(function(req, res, next){
      var whitelist = ['localhost:3000', 'rebate.poker', 'app.rebate.poker', '185.167.99.225:4025']
      var Host = req.get('Host');
      var Origin = req.get('Origin');
    
      console.log('ENTRO WHITE LIST', Host);
      console.log('ENTRO WHITE LIST ORIGIN', Origin);
    
      console.log('REQUESTTTTTTTTT ', req.headers);
    
      whitelist.forEach(function(val, key){
        if (Host.indexOf(val) > -1){
          console.log('PERMITIO WHITE LIST');
          res.setHeader('Access-Control-Allow-Origin', Origin);
        }
      })
    
      next();
    });