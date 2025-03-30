"""
Connect MongoDB, responsible for insert, query

Function Naming:
get_xx: query/search/request for records
insert_xx: create new record
del_xx: delete records
update_xx: modify exist record
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
DB = client["Vocab"]
WORD_COLLECTION = DB["word"]


def insert_one_word(obj):
    try:
        result = WORD_COLLECTION.insert_one(obj)
    except Exception as e:
        print(e.__context__)
    return str(result)


def get_all_words():
    cursor = WORD_COLLECTION.find({})
    result = [r for r in cursor]
    return result


def get_word_samples(N):
    try:
        random_docs = list(WORD_COLLECTION.aggregate([{"$sample": {"size": N}}]))
    except Exception as e:
        print(e.__context__)
    result = [r for r in random_docs]
    return result


if __name__ == "__main__":
    test = {
        "word": "fish",
        "type": "n",
        "sentences": ['The aquarium was filled with colorful fish, each gliding gracefully through the water.',
                      'For dinner, we decided to grill some fresh fish, seasoned with lemon and herbs.',
                      'The fisherman boasted about the massive fish he caught during his weekend trip to the lake.']
    }

    # print(insert_one_word(test))
    data = get_all_words()
    print(data)

