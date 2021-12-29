const FILEPATH = "../games.txt";
var fs = require("fs")

function epicGames(){
    return fs.readFileSync(FILEPATH);
};

function steam(){
    return "teste2";
};

module.exports = {epicGames, steam};


