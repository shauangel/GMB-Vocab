from flask import request, Blueprint, jsonify, render_template
from models.word_manager import add_word, get_list, get_word
from models.quiz_manager import QuizGenerator

# register api
gmb_api = Blueprint("gmb_api", __name__)


# Add word
@gmb_api.route('/add_word', methods=['POST'])
def add_word_api():
    # Get request
    data = request.get_json()

    try:
        # Insert new word
        resp = add_word(data['word'], data['type'])
        del resp['_id']
        print(resp)
        response = {"result": resp}
    except Exception as e:
        response = {"error": e.__class__.__name__ + " : " + e.args[0]}
    return jsonify(response)


@gmb_api.route('/get_words', methods=['GET'])
def get_words_api():
    # Get request
    alphabet = request.values.get('n')
    try:
        # Insert new word
        resp = get_list(alphabet)

        print(resp)
        response = {"result": resp}
    except Exception as e:
        response = {"error": e.__class__.__name__ + " : " + e.args[0]}
    return jsonify(response)


@gmb_api.route('/search', methods=['GET'])
def search():
    word = request.values.get('w')
    try:
        # Insert new word
        resp = get_word(word)
        response = {"result": resp}
    except Exception as e:
        response = {"error": e.__class__.__name__ + " : " + e.args[0]}
    return jsonify(response)


# Get quiz
@gmb_api.route('/get_quiz', methods=['GET'])
def get_quiz_api():
    try:
        qm = QuizGenerator()
        resp = qm.generate_quiz()
        print(resp)
        response = {"result": resp}
    except Exception as e:
        response = {"error": e.__class__.__name__ + " : " + e.args[0]}
    return jsonify(response)






