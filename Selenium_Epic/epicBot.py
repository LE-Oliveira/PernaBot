from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import os.path
import time

def deal(str):
    pieces = str.split('.')
    hour = pieces[1]
    date = pieces[0].split(' de ')
    day = date[0] + '/'
    month = date[1]
    if month == 'jan':
        day+='01'
    elif month == 'fev':
        day+='02'
    elif month == 'mar':
        day+='03'
    elif month == 'abr':
        day+='04'
    elif month == 'mai':
        day+='05'
    elif month == 'jun':
        day+='06'
    elif month == 'jul':
        day+='07'
    elif month == 'ago':
        day+='08'
    elif month == 'set':
        day+='09'
    elif month == 'out':
        day+='10'
    elif month == 'nov':
        day+='11'
    else:
        day+='12'
    return day + hour

PATH = "C:/Users/lsdeo/Documents/Prog/BotPromoDisc/perna-bot/chromedriver.exe"
WEBSITE = "https://www.epicgames.com/store/pt-BR/"
driver = webdriver.Chrome(PATH)

driver.get(WEBSITE+"free-games")

element = driver.find_element_by_class_name("css-1myhtyb")
stringContent = element.text
driver.close()
vec = stringContent.split("\n")
game = []
aux = ""
for i in range(len(vec)):
    if i%3==0 and i!=0:
       game.append(aux) 
    else:
        aux+=vec[i]+';'
message = []
for i in range(len(game)):
    aux = str(game[0])
    aux = aux.split(";")
    tim = aux[2].split("Grátis - ")
    txt = '@everyone ' + aux[1] + ' está de graça para resgate permanente na Epic Games até dia ' + deal(tim[1])
    message.append(txt)
FILEPATH = "../games.txt"

if not os.path.isfile(FILEPATH):
    file = open(FILEPATH, 'w', encoding='utf-8')
    str = ""
    for m in message:
        str += m
    file.write(str)
else:
    file = open(FILEPATH, 'r')
    fileContent = file.read()
    file.close()
    lines = fileContent.split('\n')
    games = []
    noRepeat = True
    file = open(FILEPATH, 'w', encoding='utf-8')
    file.write("")
    file.close()
    file = open(FILEPATH, 'a', encoding='utf-8')
    if(len(lines)==0):
        for m in message:
            file.write(str(m))
    else:
        for line in lines:
            for m in message:
                if(line == m):
                    noRepeat = False
            if(noRepeat):
                file.write(str(m))
            else:
                noRepeat = True     
    file.close()