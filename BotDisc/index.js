const { epicGames } = require('./seleniumEpic.js');
const { Client, Intents } = require('discord.js');
// const fs = require('fs');
// const { waitForDebugger } = require('inspector');
const config = require("./config.json");
// const EPIC_FILEPATH = "../gamesEpic.txt";
// const STEAM_FILEPATH = "../gamesSteam.txt";

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = "¢";

client.on("messageCreate", async function(message) { 
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return; 

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    // if (command === "sd") { 
    //     message.channel.send("Shutting down...").then(() => {
    //         client.destroy();
    //         console.log("Bot off");
    //         })
    // }
    if (command === "ping") {
        const timeTaken = message.createdTimestamp - Date.now() ;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }
    else if(command === "help"){
        message.reply(`
            ¢ping  -> pong\n¢epic  -> free games this week\n¢steam -> nyi
        `)
    }
    else if(command === "epic"){
        try{ message.channel.send(await epicGames());}
        catch(error){
            message.channel.send(`I'm sorry to inform u, but this command is returning an error... The Adm is looking after the solution. Stay tuned`);
            console.log(error);
        }
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
