import pyautogui
import numpy as np
import time
print(pyautogui.size())
counter = 0
while counter == 0:
    x = np.random.randint(10, 1900)
    y = np.random.randint(10, 1000)
    pyautogui.moveTo(x, y, duration = 20)
    pyautogui.typewrite("testing desktop")
    lenght = len("testing desktop .... ")
    time.sleep(1)
    for i in range(lenght):
        time.sleep(1)