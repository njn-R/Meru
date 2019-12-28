const mongoose = require("mongoose");
const Collection = require("../models/model.js");
var details = require("./details.js")



module.exports =
    {
	    name: 'create',
	    description: 'Create an MPA',
        execute(message, args)
        {  
            if(isNaN(args[0])) return message.channel.send("Please write the MPA number!");
            
            let mpanumber = args[0];
            const mpaName = message.content.slice(10);
            

           
            let mpcount;
            let eqimage;

            if(mpaName.includes('persona') || mpaName.includes('mask'))
            {
                mpcount = 12;
                eqimage = 'https://i.imgur.com/dVk6uF5.jpg';
            }
            else if(mpaName.includes('eva'))
            {
                mpcount = 8;
                eqimage = 'https://i.imgur.com/vQNMF02.png';   
            }
            else if(mpaName.includes('pd') || mpaName.includes('profound'))
            {
                mpcount = 12;  
                eqimage = 'https://i.imgur.com/DUH9rKa.png';
            }
            else if(mpaName.includes('dragon') || mpaName.includes('lizard'))
            {
                mpcount = 12;  
                eqimage = 'https://i.imgur.com/lMqNAdA.png';
            }
            else if(mpaName.includes('armada'))
            {
                mpcount = 8; 
                eqimage = 'https://i.imgur.com/5UQAw5e.png';   
            }      
            else if(mpaName.includes('trigger') || mpaName.includes('tg'))
            {
                mpcount = 4; 
                eqimage = 'https://i.imgur.com/iDGpHuG.jpg';   
            }        
            else
            {
                mpcount = 12;   
                eqimage = 'https://i.imgur.com/aTMCx3T.jpg';
            }


            mongoose.connect(process.env.mongodb,{
            //mongoose.connect('mongodb://localhost/db',{
                useNewUrlParser: true,
                useUnifiedTopology: true              
            });
            mongoose.set('useCreateIndex', true);
           
            const newdocument = new Collection(
            {
                _id: mongoose.Types.ObjectId(),         
                mpaname: mpaName,
                mpanumber:mpanumber,
                players: message.member.displayName,
                playercount: 1,
                maxplayercount: mpcount,
                time: message.createdAt,
                eqimage : eqimage
            });
           
            newdocument.save()
            //.then(result => console.log(result))
            .then( function(result) 
            {
                details.execute(message,args);
            })
            .catch( function(err)
            {   if(err)
                    //return message.channel.send(err);
                    return message.channel.send("An MPA with that number already exists!");
                //else
                    //message.channel.send("MPA created!");
                                    
            });       
        }

      
};
module.exports.help =
{
    name: "create"
}

