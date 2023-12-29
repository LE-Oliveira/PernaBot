const { Builder, By, until } = require('selenium-webdriver');

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

//FALTA FAZER A LÓGICA PARA QUANDO SAO MÚLTIPLOS JOGOS
async function epicGames() {
    const WEBSITE = "https://www.epicgames.com/store/pt-BR/free-games";
    var stringContent;
    try{
        const driver = new Builder().forBrowser('chrome').build();    
        await driver.get(WEBSITE);
        const element = await driver.wait(until.elementLocated(By.className('css-1myhtyb')), 5000);
        stringContent = await element.getText();
        var splitContent = stringContent.split("\n");
        var game = splitContent[1];
        var datehour = splitContent[2].split(" às ");
        var date = extract_data(datehour[0]);     
        message = "@everyone " + game + " está de graça na Epic até " + date + " às " + datehour[1];
        await driver.quit();
        return message;
    }
    catch(error){
        console.log("CATCH ERROR: ", error);
        await driver.quit()
    }
};

module.exports = {epicGames};