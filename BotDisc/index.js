const { epicGames } = require('./seleniumEpic.js');
const { Client, Intents } = require('discord.js');
const config = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = "¢";

client.on("messageCreate", async function(message) { 
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return; 

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const timeTaken = message.createdTimestamp - Date.now() ;
        message.reply(`Pong! Essa mensagem teve latência de ${timeTaken}ms.`);
    }
    else if(command === "help"){
        message.reply(`
            ¢ping  -> pong\n¢epic  -> jogos grátis nessa semana\n¢steam -> nyi
        `)
    }
    else if(command === "epic"){
        const initialMessage = await message.channel.send("Um momento, estou conferindo as últimas informações do servidor...");
        try{ await initialMessage.edit(await epicGames());}
        catch(error){
            await initialMessage.edit(`Sinto-lhe informar, mas esse comando está retornando um erro... O Adm está trabalhando na solução. Fique ligado!`);
            console.log(error);
        }
    }
    else if(command === "time"){
        var date_ob = new Date();
        var hour = date_ob.getHours();
        message.channel.send(hour.toString());
    }
    else if (command === "sd") { 
        message.channel.send("Shutting down...").then(() => {
            client.destroy();
            console.log("Bot off");
            })
    }
}); 

client.login(config.BOT_TOKEN);
console.log("Bot on");

const convert = (from, to) => str => Buffer.from(str, from).toString(to)
const utf8ToHex = convert('utf8', 'hex')
const hexToUtf8 = convert('hex', 'utf8')


// fechar o chrome caso dê erro
// mandar mensagem dizendo que está olhando