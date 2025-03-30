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
        sample = db.get_word_samples(5)
        for i in sample:
            print(i)




if __name__ == "__main__":
    quiz = QuizGenerator()
    quiz.generate_quiz()





