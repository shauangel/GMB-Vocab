"""
word_manager.py

1. add word
2. call sentence_generator
3. store to MongoDB
"""
import db_manager as db
from sentence_generator import SentenceGenerator


def add_word(word, word_type):
    """
    process:
    - insert word and type
    - sentence from sentence_generator
    - store to database
    """
    # call function
    sg = SentenceGenerator()
    sentences = sg.get_single(word, 3)

    # set entry
    word_entry = {
        "word": word,
        "type": word_type,
        "sentence": sentences
    }

    # store MongoDB
    db.insert_one_word(word_entry)

    return word_entry
