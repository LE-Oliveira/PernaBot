const {epicGames, steam} = require('./functions.js');
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
        var ret = fs.readFileSync(FILEPATH, 'utf-8')
        console.log(ret)
        message.channel.send(ret);
    }
    else if(command === "steam"){
        var ret = await steam();
        message.channel.send(ret);
    }
}); 

client.login(config.BOT_TOKEN);
console.log("Bot on");

const convert = (from, to) => str => Buffer.from(str, from).toString(to)
const utf8ToHex = convert('utf8', 'hex')
const hexToUtf8 = convert('hex', 'utf8')
