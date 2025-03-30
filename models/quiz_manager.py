"""
Quiz generator model:
1.
"""
import db_manager as db
class QuizGenerator:
    def __init__(self):
        self.quiz_word = []
        return

    def generate_quiz(self):
        word_list = db.get_all_words()



