const webdriver = require('selenium-webdriver');
const { By, until } = require('selenium-webdriver/lib/by');
const { Builder } = require('selenium-webdriver');

async function epicGames() {
    const PATH = "D:/Users/lsdeo/Documents/Prog/BotPromoDisc/PernaBot/chromedriver.exe";
    const WEBSITE = "https://www.epicgames.com/store/pt-BR/free-games";
    try{
        const driver = new Builder().forBrowser('chrome').build();    
        driver.get(WEBSITE);
        const element = await driver.findElements(By.className('css-1myhtyb'));
        var stringContent = []
        for (const game of element) stringContent.push(game.findElement(By.className('css-5auk98')).getText());
    }
    catch(error){
        console.log(error)
        return error;
    }
    finally{
        await driver.close();
        console.log(stringContent);
        var vec = stringContent.split("\n");
        var game = [];
        var aux = "";
        var count = 0;
        var i;

        vec.map(i=>{
            count+=1;
            aux+=info+';'
            if(count%3==0){
                game.append(aux);
                aux="";
            }
        });
        messages = ["@everyone"]
    }
};

module.exports = {epicGames};


