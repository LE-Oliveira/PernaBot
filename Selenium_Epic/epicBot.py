import re
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

def extract_data(text):
    months={
        'jan': '01', 'fev': '02', 'mar': '03',
        'abr': '04', 'mai': '05', 'jun': '06',
        'jul': '07', 'ago': '08', 'set': '09',
        'out': '10', 'nov': '11', 'dez': '12'
    }
    pattern = re.compile(r'(\d+) de (\w+)\.')
    coincidence = pattern.search(text)
    if coincidence:
        day = coincidence.group(1)
        short_month = coincidence.group(2).lower()
        month = months.get(short_month, '00')
        date = f"{day}/{month}"
        return date
    return None

def weak(str):
    if(str.find("às") != -1):
        return "essa"
    else:
        return "outra"

PATH = "D:/Users/lsdeo/Documents/Prog/BotPromoDisc/PernaBot/chromedriver.exe"
WEBSITE = "https://www.epicgames.com/store/pt-BR/free-games"
chrome_service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=chrome_service)
# driver = webdriver.Chrome(service=Service(PATH))

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
        txt = '-' + aux[1] + ' está de graça para resgate permanente na Epic até dia ' + extract_data(tim[1]) + '§'
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