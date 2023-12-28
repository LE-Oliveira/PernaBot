from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

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

def weak(str):
    if(str.find("às") != -1):
        return "essa"
    else:
        return "outra"

PATH = "D:/Users/lsdeo/Documents/Prog/BotPromoDisc/PernaBot/chromedriver.exe"
WEBSITE = "https://www.epicgames.com/store/pt-BR/free-games"
driver = webdriver.Chrome(service=Service(PATH))

driver.get(WEBSITE)

element = driver.find_element(By.CLASS_NAME, "css-1myhtyb")
stringContent = element.text
driver.close()
vec = stringContent.split("\n")
game = []
aux = ""
count = 0

#Listar os jogos disponíveis no site da Epic
for info in vec:
    count+=1
    aux+=info+';'
    if count%3==0:
       game.append(aux) 
       aux=""
messages = ["@everyone§"]
tim = []

#Tratar as informações dos jogos e criar a mensagem a ser enviada
for g in game:
    aux = str(g)
    aux = aux.split(";")
    if aux[2].find("Grátis - ")!=-1:
        tim = aux[2].split("Grátis - ")
    else:
        tim = aux[2].split("Grátis ")
    nome = aux[1].lower()
    nomes = nome.split(' ')
    if weak(tim[1]) == "essa":
        txt = '-' + aux[1] + ' está de graça para resgate permanente na Epic até dia ' + deal(tim[1]) + '§'
    elif weak(tim[1]) == "outra":
        period = str(tim[1])
        tim = period.split("-")
        period = tim[0] + "e" + tim[1]
        txt = '-' + aux[1] + ' estará de graça para resgate permanente na Epic entre os dias ' + period + '§'
    messages.append(txt)
messages.append(WEBSITE)
file = open("../gamesEpic.txt", 'w', encoding='utf-8')
str = ""
for m in messages:
    str += m
file.write(str)
file.close()