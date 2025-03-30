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
        "sentences": sentences
    }

    # store MongoDB
    db.insert_one_word(word_entry)

    return word_entry


def get_list(n):
    if n != '':
        data = db.get_filtered_words(n.lower())
    else:
        data = db.get_all_words()
    return sorted(data, key=lambda x: x['word'])


if __name__ == "__main__":
    print("Word Manager Model")
    # add_word('cat', 'n')
    # add_word('dog', 'n')
    # add_word('mouse', 'n')
    # add_word('hamster', 'n')
    # add_word('run', 'v')
    # add_word('invention', 'n')
    # add_word('hacker', 'n')
    # add_word('artist', 'n')
    # add_word('beautiful', 'a')
    # add_word('water', 'n')
    # add_word('shiny', 'a')
    # add_word('destiny', 'n')