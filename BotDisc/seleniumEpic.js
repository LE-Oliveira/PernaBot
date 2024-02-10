const { Builder, By, until } = require('selenium-webdriver');
const axios = require('axios');
const cheerio = require('cheerio');

function extract_data(text){
    const months = {
        'jan': '01', 'fev': '02', 'mar': '03',
        'abr': '04', 'mai': '05', 'jun': '06',
        'jul': '07', 'ago': '08', 'set': '09',
        'out': '10', 'nov': '11', 'dez': '12'
    };
    const pattern = /(\d+) de (\w+)\./;
    const coincidence = pattern.exec(text);    
    if (coincidence) {
        const day = coincidence[1];
        const shortMonth = coincidence[2].toLowerCase();
        const month = months[shortMonth] || '00';
        const date = `${day}/${month}`;
        return date;
    }
    return null;
}

// FALTA FAZER A LÓGICA PARA QUANDO NÃO TEM JOGOS GRÁTIS
async function epicGames() {
    const WEBSITE = "https://www.epicgames.com/store/pt-BR/free-games";
    var stringContent;
    try{
        const driver = new Builder().forBrowser('chrome').build();    
        await driver.get(WEBSITE);
        const element = await driver.wait(until.elementLocated(By.className('css-1mytyb')), 5000);
        stringContent = await element.getText();
        var splitContent = stringContent.split("\n");
        var message = "@everyone", game, datehour, date, tempString;
        for(var i=0; i<(splitContent.length/3-1);i++){
            game = splitContent[3*i+1];
            datehour = splitContent[3*i+2].split(" às ");
            date = extract_data(datehour[0]);
            tempString = "\n" + game + " está de graça na Epic até " + date + " às " + datehour[1];
            message = message + tempString;
        }
        message = message + "\nAcesse o site para mais informações: " + WEBSITE;
        await driver.quit();
        return message;
    }
    catch(error){
        await driver.quit()
        if(error.name === "TimeoutError") return "Não há jogos grátis no momento...";
        else console.log("CATCH ERROR: ", error);
    }
};
module.exports = {epicGames};