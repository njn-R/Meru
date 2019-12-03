const mongoose = require('mongoose').set('debug', true);
const Collection = require("../models/model.js");
var details = require("./details.js")

module.exports =
    {
	    name: 'remove',
	    description: 'Remove from MPA',
        execute(message, args)
        {         
            //Connect to database
            mongoose.connect(process.env.mongodb,{
            //mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
               
            }); 
            
                let temp = message.guild.member(message.mentions.users.first());
                let usertoremove = temp.displayName;
            
                if(usertoremove === null||usertoremove === undefined)
                {
                    return message.channel.send("User not found");
                }

                Collection.findOneAndUpdate({'mpanumber': args[0]}, { $pull: {'players': usertoremove }, $inc: {playercount:-1} },(err,docs) =>
                {
                    if(err) 
                        console.log(err);
                    else 
                    {
                        console.log(docs);  
                        if(docs === null)
                        {
                            return message.channel.send("MPA not found!"); 
                        }              
                        message.channel.send("Removed "+ usertoremove + " from MPA!");        
                    }
                });
                details1(message,args);
                function details1(message,args)
                {
                    details.execute(message,args);
                }
        }                    
};


module.exports.help =
{
    name: "remove"
}
