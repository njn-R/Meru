const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");
var details = require("./details.js")

module.exports =
    {
	    name: 'guest',
	    description: 'Add a guest to MPA',
        execute(message, args)
        {         
            //Connect to database
            mongoose.connect(process.env.mongodb,{
            //mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useUnifiedTopology: true               
            }); 
            mongoose.set('useCreateIndex', true);

          
                if(isNaN(args[0])) return message.channel.send("Please write the MPA number!");
                
                let usertoadd = args[1];
               
                if(usertoadd === null||usertoadd === undefined)
                {
                    return message.channel.send("Please enter the name of the guest!");
                }

        

                function getPlayercount(args)
                {
                    var query = Collection.findOne({'mpanumber':args[0]});
                    return query;
                }

                var query =  getPlayercount(args);
                query.select('playercount maxplayercount players');
                query.exec(function(err,Collection)
                {
                    if(err)
                        return console.log(err);
                    
                    
                        try 
                        {   var result = checkPlayer(Collection.players, usertoadd);   
                          
                            if(result === true)
                            {   
                                return message.channel.send("I already added that player!");
                            }
                            else
                            {
                                checkMPAFull(Collection.playercount, Collection.maxplayercount);
                            } 
                        }
                        catch{
                            return message.channel.send("Please write the MPA name too!");
                        }
                });

                function checkPlayer(players, usertoadd)
                {
                            
                        if(players.includes(usertoadd))
                        {
                            return true;
                        }
                        else
                            return false;
                
                }

                function checkMPAFull(playercount, maxplayercount)
                {
                    
                    if(playercount === maxplayercount)
                    {
                        message.channel.send("MPA is full!");   
                    }
                    else{

                        
                        Collection.updateOne( { 'mpanumber': args[0] },{$push: {players: usertoadd}}, (err,docs) =>
                        {
                            if(err) 
                                console.log(err);
                            else 
                            {
                                console.log(docs);                    
                                message.channel.send("Added " + usertoadd + " to MPA!");    
                            }
                        });
                        Collection.updateOne( { 'mpanumber': args[0] }, {$inc: {playercount:1}  }, (err,docs) =>
                        {
                            if(err) 
                                console.log(err);
                            else 
                            {
                                console.log(docs);                      
                            }
                        });    
                        
                    }
                    details1(message, args);
                }
                
                function details1(message,args)
                {
                    details.execute(message,args);
                }
        }   
                         
};

module.exports.help =
{
    name: "guest"
}







           
       
