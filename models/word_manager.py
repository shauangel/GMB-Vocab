"""
word_manager.py

1. add word
2. call sentence_generator
3. store to MongoDB
"""

from models import db_manager as db
import models.sentence_generator as sg

def add_word(word: str, word_type: str) -> dict:
    """
    process:
    - insert word and type
    - sentence from sentence_generator
    - store to database
    """
    # call function
    sentence = sg.generate_sentence(word, word_type)

    # set entry
    word_entry = {
        "word": word,
        "type": word_type,
        "sentence": sentence
    }

    # store MongoDB
    db.insert_word(word_entry)

    return word_entry
