//const {epicGames, steam} = require('./functions.js');
const {Client, Intents} = require('discord.js');
const fs = require('fs');
const config = require("./config.json");
const FILEPATH = "../games.txt";

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = "¢";

client.on("message", async function(message) { 
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return; 

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command == "shutdown") { 
        message.channel.send("Shutting down...").then(() => {
            client.destroy();
            console.log("Bot off");
            })
    }
    else if (command === "ping") {
        const timeTaken = message.createdTimestamp - Date.now() ;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }
    else if(command === "epic"){   
        const ret = fs.readFileSync(FILEPATH, 'utf-8');
        var tratar = ret.split('§');
        final = "";
        for(i=0;i<tratar.length;i++){
            final+=tratar[i]+'\n'
        }
        message.channel.send(String(final))
    }
    else if(command === "steam"){
        //var ret = await steam();
        message.channel.send('yet to do');
    }
    else if(command === "time"){
        var date_ob = new Date();
        var hour = date_ob.getHours();
        message.channel.send(hour.toString());
    }
}); 

client.login(config.BOT_TOKEN);
console.log("Bot on");

const convert = (from, to) => str => Buffer.from(str, from).toString(to)
const utf8ToHex = convert('utf8', 'hex')
const hexToUtf8 = convert('hex', 'utf8')
