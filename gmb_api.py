from flask import request, Blueprint, jsonify, render_template
from models.word_manager import add_word
from models.quiz_manager import QuizGenerator

# register api
gmb_api = Blueprint("gmb_api", __name__)


# Add word
@gmb_api.route('/add_word', method=['POST'])
def add_word_api():
    # Get request
    data = request.get_json()

    try:
        # Insert new word
        resp = add_word(data['word'], data['type'])
        print(resp)
        response = {"result": resp}
    except Exception as e:
        response = {"error": e.__class__.__name__ + " : " + e.args[0]}
    return jsonify(response)


# Get quiz
@gmb_api.route('/get_quiz', method=['GET'])
def get_quiz_api():
    try:
        qm = QuizGenerator()
        resp = qm.generate_quiz()
        print(resp)
        response = {"result": resp}
    except Exception as e:
        response = {"error": e.__class__.__name__ + " : " + e.args[0]}
    return jsonify(response)






