#!/usr/bin/env python
import os
import logging
import sys
from flask import Flask, jsonify, request
# blueprint register
from text_analysis_api import text_analysis_api
from data_manager_api import data_manager_api
from website import website

logging.basicConfig(stream=sys.stdout)
app = Flask(__name__)


@app.route('/api/', methods=['GET'])
def hello():
    return jsonify({"result": "hello"})


if __name__ == "__main__":
    print("Welcome to GMB Vocab~~")
    app.run(host='0.0.0.0', port=os.environ.get("FLASK_SERVER_PORT", 8080), debug=True)
