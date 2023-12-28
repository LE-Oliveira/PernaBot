import selenium
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

PATH = "D:/Users/lsdeo/Documents/Prog/BotPromoDisc/PernaBot/chromedriver.exe"
WEBSITE = "https://steamdb.info/sales/?min_discount=95"
driver = webdriver.Chrome(service=Service(PATH))

driver.get(WEBSITE)

dropdown = Select(driver.find_element(By.NAME, 'DataTables_Table_0_length'))
all_options = dropdown.find_element(By.TAG_NAME, 'option')
for option in all_options:
    if option == 'All (slow)':
        option.click()
        break

element = driver.find_element(By.CLASS_NAME,"app")
text = element.text
print(text)
driver.close()


