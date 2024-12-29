const { Builder, By } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const config = require("./config.json");

async function epicGames() {
    const service = new edge.ServiceBuilder(config.DRIVER_PATH);
    const driver = await new Builder()
        .forBrowser('MicrosoftEdge')
        .setEdgeService(service)
        .build();
    try{
        const WEBSITE = "https://www.epicgames.com/store/pt-BR/free-games";
        await driver.get(WEBSITE);
        await driver.sleep(5000);
        let xpathOrigem = "//div[./h1[contains(text(),'Jogos grátis')]]//section/div/div"
        const elements = await driver.findElements(By.xpath(xpathOrigem));
        let jogos = [];
        for (let i = 1; i < elements.length; i++) {
            try {
                let elementoNome = await driver.findElement(By.xpath(`${xpathOrigem}[${i}]//h6`));
                let nome = await elementoNome.getText();
                
                let elementoLink = await driver.findElement(By.xpath(`${xpathOrigem}[${i}]//a`));
                let url = await elementoLink.getAttribute("href");
                
                let elementoData = await driver.findElement(By.xpath(`${xpathOrigem}[${i}]//p/span`));
                let data = await elementoData.getText();
                
                jogos.push({ nome, url, data });
            } catch (error) {
                console.error('Erro ao localizar elementos:', error);
            }
        }
        let message = `@everyone, temos jogos grátis na Epic Games! Confira:\n`;
        for(let jogo of jogos){
            message += `[${jogo.nome}](${jogo.url}) está de graça ${jogo.data.replace('Grátis -', 'até')}\n`;
        }
        return message;
    }
    catch(error){
        if(error.name === "TimeoutError") return "Não há jogos grátis no momento...";
        console.error('Erro:', error);
    }
    finally{
        await driver.quit();
    }
};
module.exports = {epicGames};