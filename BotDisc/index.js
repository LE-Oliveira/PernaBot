const {epicGames} = require('./seleniumEpic.js');
const {Client, Intents} = require('discord.js');
const fs = require('fs');
const { waitForDebugger } = require('inspector');
const config = require("./config.json");
const EPIC_FILEPATH = "../gamesEpic.txt";
const STEAM_FILEPATH = "../gamesSteam.txt";

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = "¢";

client.on("messageCreate", async function(message) { 
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return; 

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "sd") { 
        message.channel.send("Shutting down...").then(() => {
            client.destroy();
            console.log("Bot off");
            })
    }
    else if (command === "ping") {
        const timeTaken = message.createdTimestamp - Date.now() ;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }
    else if(command === "help"){
        message.reply(`
            ¢ping  -> pong\n¢epic  -> free games this week\n¢steam -> under maintainence
        `)
    }
    else if(command === "epic"){
        try{
            let a = await epicGames();
            message.channel.send(`I'm sorry to inform u, but this command has returned an error... The Adm is looking after the solution. Stay tuned: `, a);
            // const ret = fs.readFileSync(EPIC_FILEPATH, 'utf-8');    //le o arquivo na minha máquina
            // var tratar = ret.split('§');                            
            // final = "";
            // for(i=0;i<tratar.length;i++) final+=tratar[i]+'\n';
            // message.channel.send(String(final));                    //envia a mensagem
        }
        catch(error){
            message.channel.send(`I'm sorry to inform u, but this command is return an error... The Adm is looking after the solution. Stay tuned`)
        }
    }
    else if(command === "steam"){
        /*const ret = fs.readFileSync(STEAM_FILEPATH, 'utf-8');
        var tratar = ret.split('§');
        final = "";
        for(i=0;i<tratar.length;i++){
            final+=tratar[i]+'\n';
        }
        message.channel.send(String(final))*/
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
