import requests
import json
import time
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import asyncio

# Create a new chat bot named Charlie
chatbot = ChatBot('Charlie')

trainer = ListTrainer(chatbot)

trainer.train([
    "Olá meu cliente, temos branco, preto, vermelho e prata"
])

async def answering():
        data = requests.get('http://57a5b852.ngrok.io/answers')
        time.sleep(2)
        response = data.json()
        parsed = json.loads(json.dumps(response))

        question = parsed[1]["question"]
        answer = chatbot.get_response(question)
        print("Client:", question)
        print("Bot: ", answer)
        time.sleep(2)
        id = parsed[1]["id"]
        toSend = {
        "id": id,
        "answer": str(answer)
        }
        requests.post("http://57a5b852.ngrok.io/answers", json=toSend)
        chatbot.storage.drop()
        time.sleep(5)

asyncio.run(answering())
