"""
Quiz generator model:
1.
"""
from models.sentence_generator import SentenceGenerator
import models.db_manager as db
import random


class QuizGenerator:
    def __init__(self):
        self.quiz_word = []
        self.sg = SentenceGenerator()
        self.quiz = []
        return

    def generate_quiz(self):
        # Get random samples from database
        samples = db.get_word_samples(40)
        self.quiz_word = random.sample(samples, 10)

        # Generate quiz questions
        questions = self.sg.get_multiple([i['word'] for i in self.quiz_word], 3)

        # Format quiz sheet
        for w in self.quiz_word:
            temp = {"options": [w['word']]}

            # Pick question
            for q in questions[w['word']]:
                if q not in w['sentences']:
                    temp['question'] = q
                    break
            temp['question'] = temp['question'].replace(f" {w['word']} ", "  _____ ")

            # Randomized quiz options
            idx = samples.index(w)
            pool = samples[:idx] + samples[idx + 1:]
            opt = random.sample(pool, 3)
            temp['options'] += [i['word'] for i in opt]
            random.shuffle(temp['options'])

            # Record answer
            temp['ans'] = temp['options'].index(w['word'])

            self.quiz.append(temp)
        return self.quiz


if __name__ == "__main__":
    quiz = QuizGenerator()
    q = quiz.generate_quiz()
    print(q)





