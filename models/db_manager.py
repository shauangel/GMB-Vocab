"""
Connect MongoDB, responsible for insert, query
"""
import certifi
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://shauanchi0315:gmbvocab@gmb-vocab.hu1jfgk.mongodb.net/?retryWrites=true&w=majority&appName=gmb-vocab"

# Create a new client and connect to the server
client = MongoClient(
    uri,
    server_api=ServerApi('1'),
    tls=True,
    tlsCAFile=certifi.where()
)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
