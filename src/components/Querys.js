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

    db.agent.findOne({}).select('accessCode').sort({'accessCode' : -1}).limit(1).exec(function(err, doc){let max_code = doc[0].accessCode + 1;})
    db.agent.findOne().where({accessCode: 1}).sort('-LAST_MOD').exec(function(err, doc){var max = doc.LAST_MOD + 1;})
    db.agent.aggregate([{ "$group": {"_id": null,"max": { "$max": "$accessCode" }}}])


db.allUsersTransactionHistory.aggregate( 
  {
    '$match': { rackToId: '5f3f4ed126893f460b90f04c', createdAt: { $gte: new ISODate("2020-08-17"), $lte: new ISODate("2020-09-06") } }
  },
  {         
    $group : {
      _id : {week:{$week : "$createdAt"}, day : {$dayOfWeek:"$createdAt"}},
      total : {$sum : "$totalRack"}         
    }     
  },     
  {         
    $group : {
      _id : "$_id.week",days : {$push : {day:"$_id.day",total : "$total"}}             
    }            
  },     
  {       
    $sort: {_id:1}     
  }
  ).pretty()


db.agent.aggregate(
  [ 
      { "$graphLookup": { 
          "from": "agent", 
          "startWith": "$parentId", 
          "connectFromField": "parentId", 
          "connectToField": "_id", 
          "as": "ancestors"
      }}, 
      { "$match": { "username": "omegaagent" } }, 
      { "$addFields": { 
          "ancestors": { 
              "$reverseArray": { 
                  "$map": { 
                      "input": "$ancestors", 
                      "as": "t", 
                      "in": { "name": "$$t.username" }
                  } 
              } 
          }
      }}
  ]
).pretty()

db.agent.aggregate([{
  $match: {
      username:'omegaagent'
  }
}, {
  $graphLookup: {
      from: "agent",
      startWith: "$parentId",
      connectFromField: "_id",
      connectToField: "parentId",
      as: "ancestors"
  }
}, { $addFields: { 
  "ancestors": { 
      $reverseArray: { 
          $map: { 
              "input": "$ancestors", 
              "as": "t", 
              "in": { "name": "$$t.username" }
          } 
      } 
  }
}
}]).pretty()

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
    $lookup: {
      from: 'agent',
      localField: 'player.agentId',
      foreignField: '_id',
      as: 'agent'
    }
  },
  {
    $match: {rackToId:'5f3f4ed126893f460b90f04c'}
  }
).pretty()

db.allUsersTransactionHistory.aggregate(
  {
    $lookup: {
      from: 'player',
      let: { "id": "$_id", "agentId":"$agentId" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$player", "$$id"]
            }
          }
        },
        {
          $lookup: {
            from: 'agent',
            pipeline: [
              {
                $match: {
                  $expr:{
                    $eq : ["$_id", "$$agentId"]
                  }
                }
              },
              {
                $project : { username: 1 }
              }
            ],
            as: "agentdata"
          }
        },
        { "$unwind": "$agentdata" },
        {
          $project : { username: 1, agentunsername: "$agentdata.username"}
        }
      ],
      as: "playerdata"
    },
  },
  {
    $match: {rackToId:'5f3f4ed126893f460b90f04c'}
  }
).pretty()

db.allUsersTransactionHistory.aggregate(
  {
    $match: {rackToId:'5f3f4ed126893f460b90f04c'}
  },
  {
    $lookup: {
      from: 'player',
      let: { "id": "$player" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$_id", "$$id"]
            }
          }
        },
        {
          $lookup: {
            from: 'agent',
            let: { "agid": "$agentId" },
            pipeline: [
              {
                $match: { 
                  _id: ObjectId('$$agid')                  
                }
              },
              {
                $project : { username: 1 , temp: '$$agid'}
              }        
            ],
            as: "agentdata"
          }
        },
        { "$unwind": "$agentdata" },        
        {
          $project : { username: 1, agentId: 1, agentusername:"$agentdata.username", temp: "$agentdata.temp"}
        }
      ],
      as: "playerdata"
    },
  },
  {         
    $group : {
      _id : {day : {$dayOfWeek:"$createdAt"}, agent: '$playerdata.agentusername', username : "$playerdata.username"},
      total : {$sum : "$totalRack"}         
    }     
  },     
  {         
    $group : {
      _id : {username: "$_id.username", agent:'$_id.agent'},days : {$push : {day:"$_id.day",total : "$total"}}             
    }            
  },     
  {       
    $sort: {_id:1}     
  }
).pretty()
    

db.allUsersTransactionHistory.aggregate(
  {
    $match: {rackToId:'5f3f4ed126893f460b90f04c',createdAt: { $gte: new ISODate("2020-08-31")}}
  },
  {
    $lookup: {
      from: 'player',
      let: { "id": "$player" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$_id", "$$id"]
            }
          }
        },
        {
          $lookup: {
            from: 'agent',
            let: { "agid": {$toObjectId:"$agentId"} },
            pipeline: [
              {
                $match: { 
                  $expr: {
                    $eq: ["$_id", "$$agid"]
                  }                 
                }
              },
              {
                $project : { username: 1 , temp: '$$agid'}
              }        
            ],
            as: "agentdata"
          }
        },
        { "$unwind": "$agentdata" },        
        {
          $project : { username: 1, agentId: 1, agentusername:"$agentdata.username", temp: "$agentdata.temp"}
        }
      ],
      as: "playerdata"
    },
  }, 
  {         
    $group : {
      _id : {day : {$dayOfWeek:"$createdAt"}, agent: '$playerdata.agentusername', username : "$playerdata.username"},
      total : {$sum : "$totalRack"}         
    }     
  },     
  {         
    $group : {
      _id : {username: "$_id.username", agent:'$_id.agent'},days : {$push : {day:"$_id.day",total : "$total"}}             
    }            
  },      
  {       
    $sort: {_id:1}     
  }
).pretty()

db.allUsersTransactionHistory.aggregate(
  {
    $match: {rackToId:'5f3f4ed126893f460b90f04c',createdAt: { $gte: new ISODate("2020-08-31")}}
  },
  {
    $lookup: {
      from: 'player',
      localField: 'player',
      foreignField: '_id',
      as: 'playerdata'
    }
  },
).pretty()

db.allUsersTransactionHistory.aggregate(
{
  $match: {rackToId:'5f3f4ed126893f460b90f04c',createdAt: { $gte: new ISODate("2020-08-31")}}
},
{
  $lookup: {
    from: 'player',
    localField: 'player',
    foreignField: '_id',
    as: 'player'
  }
},
{
  $lookup: {
    from: 'agent',
    localField: 'agentId',
    foreignField: '_id',
    as: 'agentdata'
  }
},
{
  $unwind: "$agentdata"
},
{         
  $group : {
    _id : {day : {$dayOfWeek:"$createdAt"}, username : "$player.username"},
    total : {$sum : "$totalRack"}         
  }     
},    
{         
  $group : {
    _id : {username:"$_id.username", agentname:"$agentdata.username"} ,days : {$push : {day:"$_id.day",total : "$total"}}             
  }            
}
).pretty()


db.allUsersTransactionHistory.aggregate(
{
  $match: {rackToId:'5f3f4ed126893f460b90f04c',createdAt: { $gte: new ISODate("2020-08-31")}}
},
{
  $lookup: {
      from: 'player',
      localField: 'player',
      foreignField: '_id',
      as: 'player'
  }
},
{
  $unwind: {
      path: "$player",
      preserveNullAndEmptyArrays: true
  }
},
{
  $lookup: {
      from: 'agent',
      localField: 'player.agentId',
      foreignField: '_id',
      as: 'player.agent'
  }
},
{
  $unwind: {
      path: "$player.agent",
      preserveNullAndEmptyArrays: true
  }
},
{
  $project: {
      "player._id": 1,
      "player.username": 1,
      "player.agent._id": 1,
      "player.agent.username": 1
  }
},
).pretty()



db.player.aggregate(    
  {
    $lookup: {
        from: 'agent',
        localField: 'agentId',
        foreignField: '_id',
        as: 'agentplayer'
    }
  },
  {
    $unwind: {
        path: "$agentplayer",
        preserveNullAndEmptyArrays: true
    }
  },
  {
    $project: {
        "agentId": 1,
        "username": 1,
        "agentplayer": 'test'
    }
  },
  ).pretty()    

db.player.aggregate(    
{
  $lookup: {
      from: 'allUsersTransactionHistory',
      localField: '_id',
      foreignField: 'player',
      as: 'transactions'
  }
},
{
  $match: {_id:ObjectId('5f3dc31bd347321e822474d9')}
},
{
  $project: {
      "username": 1,
      "transactions.totalRack": 1
  }
},
).pretty()

db.player.aggregate( 
  [
    {
      $project: {
        'agId': {$toObjectId: '$agentId'},
        'playerusername': '$username'
      }
    },
    {
      $lookup: {
          from: 'agent',
          localField: 'agId',
          foreignField: '_id',
          as: 'agentplayer'
      }
    },
    {
      $project: {
        '_id': 1,
        'playerusername': 1,
        'agentplayer.username': 1
      }
    }
  ]   
)

db.player.aggregate( 
  [
    {
      $match: {
        username: 'omegacr'
      }
    },
    {
      $lookup: {
          from: 'agent',
          let: {agent_id:'$agentId'},
          pipeline:[
            {
              addfields: {agentide:{$toString:''}}
            }
          ],
          as: 'agentplayer'
      }
    }
  ]   
)

db.player.aggregate( 
  [
    {
      $project: {
        'agId': {$toObjectId: '$agentId'},
        'playerusername': '$username'
      }
    },
    {
      $lookup: {
          from: 'agent',
          localField: 'agId',
          foreignField: '_id',
          as: 'agentplayer'
      }
    },
    {
      $lookup: {
          from: 'allUsersTransactionHistory',
          localField: '_id',
          foreignField: 'player',
          as: 'transactions'
      }
    },
    {
      $match: {'transactions.rackToId':'5f3f4ed126893f460b90f04c','transactions.createdAt': { $gte: new ISODate("2020-08-31")}}
    },
    {
      $group : {
        _id : {day : {$dayOfWeek:"transactions.$createdAt"}},
        total : {$sum : "$transactions.totalRack"}         
      }
    }       
  ]   
).pretty()

db.player.aggregate(
{
  $match:{
    agentId:'5f3f4ed126893f460b90f04c'
  }  
},
{
  $project: {
    'agId': {$toObjectId: '$agentId'},
  }
},
{
  $lookup: {
    from: 'agent',
    localField: 'agId',
    foreignField: '_id',
    as: 'agentplayer'
}
}).pretty()

db.agent.aggregate(
  [
    {
      $match: {
        _id: ObjectId('5f3f4ed126893f460b90f04c')
      }
    },
    {
      $graphLookup: {
        from: "agent",
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parentObjectId",
        as: "SubAgent"
      }
    },
    {
      $project: {
        _id: 1,
        username: 1,
        level: 1,
        'SubAgent._id': 1,
        'SubAgent.username': 1,
        'SubAgent.level': 1
      }
    }
  ]
).pretty()

db.agent.aggregate(
[
  { '$match': { _id: ObjectId('5f3f4ed126893f460b90f04c')} },
  {
    '$graphLookup': {
      from: 'agent',
      startWith: '$_id',
      connectFromField: '_id',
      connectToField: 'parentObjectId',
      as: 'SubAgent'
    }
  },
  {
    '$project': {
      _id: 1,
      username: 1,
      level: 1,
      'SubAgent._id': 1,
      'SubAgent.username': 1,
      'SubAgent.level': 1
    }
  }
]).pretty()

db.createUser(
  {
    user: "root",
    pwd: "re#tepk20#$cj",
    roles: [
      {
        role: "userAdminAnyDatabase",
        db: "admin"
      },
      "readWriteAnyDatabase"
    ]
  }
)

db.agent.find({},{accessCode:1}).sort({accessCode:-1}).limit(1)

db.setting.insert(
  {
    "defaultChips" : 10000,
    "rakePercenage" : 3.75,
    "chipsBought" : 0,
    "processId" : 0,
    "android_version" : 1,
    "ios_version" : 1,
    "systemChips" : 0,
    "adminExtraRakePercentage" : 0.25,
    "BackupDetails" : {
            "db_backup_days" : "",
            "db_next_backup_date" : "2020-06-19",
            "db_host" : "",
            "db_username" : "pokerdbuser",
            "db_password" : "repssba21te89p1k",
            "db_name" : "rebatepokerdb"
    },
    "android_store_link" : "1",
    "ios_store_link" : "1",
    "multitable_status" : "active",
    "__v" : 0,
    "maintenance" : {
            "maintenance_start_date" : "2020-06-19 23:31",
            "maintenance_end_date" : "2020-06-19 23:31",
            "time_difference" : 0,
            "message" : "This Application is Under Maintenance.",
            "showBeforeMinutes" : "90",
            "status" : "inactive",
            "quickMaintenance" : "inactive"
    }
}
)

/*
mongo --port 27017 --authenticationDatabase "admin" -u "root" -p "re#tepk20#$cj"

mongo --port 27017 -u "root" -p "re#tepk20#$cj" --authenticationDatabase "admin"

mongo -u "root" -p "re#tepk20#$cj" --authenticationDatabase  "admin"

mongod --port 27017 --dbpath /var/lib/mongo

mongo --port 27017 --authenticationDatabase "admin" -u "root" -p re#tepk20#$cj

*/

db.createUser(
  {
    user: "admin",
    pwd: "repssba21te89p1k",
    roles: [ { role: "userAdminAnyDatabase", db: "rebatepokerdb" } ]
  }
)
db.auth('admin', 'repssba21te89p1k')

mongo --port 27017 -u admin --authenticationDatabase 'admin' -p repssba21te89p1k

//mongo -u "admin" -p "repssba21te89p1k" --authenticationDatabase "admin"

db.grantRolesToUser(
  "admin",
  [ "readWrite" , { role: "read", db: "admin" } ],
  { w: "majority" , wtimeout: 4000 }
)

db.dropUser("admin", {w: "majority", wtimeout: 4000})

db.createUser(
  {
    user: "pokerdbuser",
    pwd: "repssba21te89p1k", 
    roles: [ "readWrite", "dbAdmin" ]
  }
)

db.auth('pokerdbuser', 'repssba21te89p1k')

//mongo -u "pokerdbuser" -p "repssba21te89p1k" --authenticationDatabase "rebatepokerdb"

mongod --dbpath /var/lib/mongo --replSet rebatepkdbrep --port 27017 --fork --logpath=/var/lib/mongo/fork/mongo.log
mongod --dbpath /var/lib/mongo2 --replSet rebatepkdbrep --port 27018 --fork --logpath=/var/lib/mongo2/fork/mongo.log
mongod --dbpath /var/lib/mongo3 --replSet rebatepkdbrep --port 27019 --fork --logpath=/var/lib/mongo3/fork/mongo.log

rs.initiate()

rs.conf()
rs.status()

rs.initiate(
  {
     _id: "rebatepkdbrep",
     version: 1,
     members: [
        { _id: 0, host : "localhost:27017" }
     ]
  }
)

rs.initiate({
  _id : "rebatepkdbrep",
  members: [
     { _id: 0, host: "localhost:27017" },
     { _id: 1, host: "localhost:27018" },
     { _id: 2, host: "localhost:27019" }
  ]
})