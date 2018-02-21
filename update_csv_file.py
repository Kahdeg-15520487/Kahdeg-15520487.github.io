import requests

import time

spreadsheets = {
"main" : "https://docs.google.com/spreadsheets/d/15sn7eXO8EApV1Cd6A7wijCD12pzQrBr8Oxf5oToONPE/gviz/tq?tqx=out:csv&sheet=Main",
"startup" : "https://docs.google.com/spreadsheets/d/15sn7eXO8EApV1Cd6A7wijCD12pzQrBr8Oxf5oToONPE/gviz/tq?tqx=out:csv&sheet=Startup",
"idle_dialogue" : "https://docs.google.com/spreadsheets/d/15sn7eXO8EApV1Cd6A7wijCD12pzQrBr8Oxf5oToONPE/gviz/tq?tqx=out:csv&sheet=Idle Dialogue",
"special_dialogue" : "https://docs.google.com/spreadsheets/d/15sn7eXO8EApV1Cd6A7wijCD12pzQrBr8Oxf5oToONPE/gviz/tq?tqx=out:csv&sheet=Special Dialogue",
"applications" : "https://docs.google.com/spreadsheets/d/15sn7eXO8EApV1Cd6A7wijCD12pzQrBr8Oxf5oToONPE/gviz/tq?tqx=out:csv&sheet=Applications",
"websites" : "https://docs.google.com/spreadsheets/d/15sn7eXO8EApV1Cd6A7wijCD12pzQrBr8Oxf5oToONPE/gviz/tq?tqx=out:csv&sheet=Websites",
"google_searches" : "https://docs.google.com/spreadsheets/d/15sn7eXO8EApV1Cd6A7wijCD12pzQrBr8Oxf5oToONPE/gviz/tq?tqx=out:csv&sheet=Google Searches"
}

for key, value in spreadsheets.items():
	try:
		file = open(key+".csv",'w')
		rq = requests.get(value)
		page = rq.text.encode('ascii','ignore').decode('ascii')
		file.write(page)
		rq.close()
		file.close()
		
		time.sleep(1)
	except Exception as inst:
		print(type(inst))
		print(key + " : " + value)