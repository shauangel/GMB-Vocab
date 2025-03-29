#!/usr/bin/env python
import os
import time
import logging
import sys
from flask import Flask, jsonify, request
from models import db_manager as db

logging.basicConfig(stream=sys.stdout)
app = Flask(__name__)


@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({"result": "hello"})


if __name__ == "__main__":
    print("Welcome to GMB Vocab~~")
    app.run(host='0.0.0.0', port=os.environ.get("FLASK_SERVER_PORT", 8080), debug=True)
